'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAsyncRetry } from 'react-use';
import {
  Button,
  Input,
  CardRoot as Card,
  CardBody as CardContent,
  CardHeader,
  Heading as CardTitle,
  Heading,
  Box,
  VStack,
  Text,
  Alert,
  AlertIndicator,
  AlertTitle,
  AlertDescription,
  HStack,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  SelectControl,
  SelectPositioner,
} from '@chakra-ui/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@DonaldNgai/chakra-ui';
import {
  Loader2,
  Users,
  UserPlus,
  ChevronDown,
  Plus,
} from 'lucide-react';
import {
  getGroupsWithDetails,
  batchInviteUsersToGroups,
} from '@/app/actions/groups';
import { createGroup } from '@/app/actions/keys';
import { format } from 'date-fns';

type Group = {
  id: string;
  name: string;
  description: string | null;
  pendingRequests: Array<{
    id: string;
    userEmail: string;
    userName: string | null;
    createdAt: Date;
  }>;
  apiKeys: Array<{
    id: string;
    label: string;
    createdAt: string;
    lastUsedAt: string | null;
    groupId?: string;
  }>;
};

export default function GroupsPage() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Invite form state
  const [inviteEmailInput, setInviteEmailInput] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [inviting, setInviting] = useState(false);
  const [inviteResult, setInviteResult] = useState<{
    success?: boolean;
    invited?: number;
    failed?: number;
    errors?: Array<{ email: string; error: string }>;
  } | null>(null);

  // Create group form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [createGroupError, setCreateGroupError] = useState<string | null>(null);

  const groupsState = useAsyncRetry(async (): Promise<Group[]> => {
    const result = await getGroupsWithDetails();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.groups || [];
  }, []);

  // Initialize open state when groups load
  useEffect(() => {
    if (groupsState.value) {
      const initialOpenState: Record<string, boolean> = {};
      groupsState.value.forEach((group: Group) => {
        initialOpenState[group.id] = false;
      });
      setOpenGroups(initialOpenState);
    }
  }, [groupsState.value]);

  const handleToggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    setCreatingGroup(true);
    setCreateGroupError(null);

    try {
      const result = await createGroup(newGroupName.trim(), newGroupDescription.trim() || undefined);

      if (result.error) {
        setCreateGroupError(result.error);
      } else {
        setNewGroupName('');
        setNewGroupDescription('');
        setShowCreateForm(false);
        // Reload groups to show the new group
        groupsState.retry();
      }
    } catch (err) {
      setCreateGroupError('Failed to create group');
    } finally {
      setCreatingGroup(false);
    }
  };

  const handleBatchInvite = async () => {
    if (selectedGroupIds.length === 0 || !inviteEmailInput.trim()) {
      return;
    }

    // Parse comma-delimited emails
    const emails = inviteEmailInput
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    if (emails.length === 0) {
      return;
    }

    setInviting(true);
    setInviteResult(null);

    try {
      const result = await batchInviteUsersToGroups(emails, selectedGroupIds);
      setInviteResult(result);

      if (result.success) {
        setInviteEmailInput('');
        setSelectedGroupIds([]);
        // Delay reload slightly to allow Select dropdown to close
        setTimeout(() => {
          groupsState.retry();
        }, 100);
      }
    } catch (err) {
      setInviteResult({
        success: false,
        failed: emails.length,
        errors: [{ email: '', error: 'An error occurred while sending invitations' }],
      });
    } finally {
      setInviting(false);
    }
  };

  const selectedGroupsText = useMemo(() => {
    if (selectedGroupIds.length === 0) {
      return 'Select groups...';
    }
    if (selectedGroupIds.length === 1) {
      return groupsState.value?.find((g: Group) => g.id === selectedGroupIds[0])?.name || '1 group selected';
    }
    return `${selectedGroupIds.length} groups selected`;
  }, [selectedGroupIds, groupsState.value]);


  return (
    <Box flex="1" maxW="6xl" w="full">
      <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium" mb={6}>
        Groups
      </Heading>

      {(groupsState.error || createGroupError) && (
        <Alert.Root status="error" borderRadius="md" mb={4}>
          <AlertIndicator />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {groupsState.error?.message || createGroupError}
          </AlertDescription>
        </Alert.Root>
      )}

      {/* Invite Users Section */}
      {!groupsState.loading && groupsState.value && groupsState.value.length > 0 && (
        <Card mb={6}>
          <CardHeader>
            <CardTitle>Invite Users to Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Select Groups
                </Text>
                {groupsState.value && groupsState.value.length > 0 ? (
                  /* @ts-ignore - Select.Root multiple selection type issue */
                  <Select.Root
                    key={`select-${groupsState.value.length}-${groupsState.value.map((g: Group) => g.id).join(',')}`}
                    multiple
                    value={selectedGroupIds}
                    disabled={groupsState.loading}
                    onValueChange={(e: any) => {
                      if (groupsState.loading) return;
                      const newValue = Array.isArray(e.value) ? e.value : [e.value];
                      setSelectedGroupIds(
                        newValue.filter((v: any): v is string => typeof v === 'string')
                      );
                      setInviteResult(null);
                    }}
                  >
                    <SelectControl>
                      <SelectTrigger className="w-full">
                        <SelectValueText placeholder="Select groups...">
                          {selectedGroupsText}
                        </SelectValueText>
                      </SelectTrigger>
                    </SelectControl>
                    <SelectPositioner>
                      <SelectContent>
                        {groupsState.value.map((group: Group) => (
                          // @ts-ignore - SelectItem value prop type issue
                          <SelectItem key={group.id} value={group.id}>
                            <VStack align="start" gap={0}>
                              <Text fontSize="sm" fontWeight="medium">
                                {group.name}
                              </Text>
                              {group.description && (
                                <Text fontSize="xs" color="fg.muted">
                                  {group.description}
                                </Text>
                              )}
                            </VStack>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPositioner>
                  </Select.Root>
                ) : (
                  <Text fontSize="sm" color="fg.muted">
                    No groups available
                  </Text>
                )}
              </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                User Emails (comma-separated)
              </Text>
              <HStack gap={2}>
                <Input
                  type="text"
                  placeholder="user1@example.com, user2@example.com"
                  value={inviteEmailInput}
                  onChange={(e) => {
                    setInviteEmailInput(e.target.value);
                    setInviteResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && !inviting && !groupsState.loading && handleBatchInvite()}
                  disabled={inviting || groupsState.loading}
                />
                <Button
                  onClick={handleBatchInvite}
                  disabled={inviting || groupsState.loading || !inviteEmailInput.trim() || selectedGroupIds.length === 0}
                  colorScheme="green"
                  size="sm"
                >
                  {inviting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inviting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite
                    </>
                  )}
                </Button>
              </HStack>
            </Box>

            {inviteResult && (
              <Alert.Root
                status={inviteResult.success ? 'success' : 'error'}
                borderRadius="md"
              >
                <AlertIndicator />
                <VStack align="start" gap={1} flex={1}>
                  <AlertTitle>
                    {inviteResult.success ? 'Success' : 'Error'}
                  </AlertTitle>
                  <AlertDescription>
                    {inviteResult.success ? (
                      <Text>
                        Successfully invited {inviteResult.invited} user
                        {inviteResult.invited !== 1 ? 's' : ''} to{' '}
                        {selectedGroupIds.length} group
                        {selectedGroupIds.length !== 1 ? 's' : ''}.
                      </Text>
                    ) : (
                      <Text>An error occurred while sending invitations</Text>
                    )}
                    {inviteResult.errors && inviteResult.errors.length > 0 && (
                      <Box mt={2}>
                        <Text fontSize="xs" fontWeight="medium">
                          Errors:
                        </Text>
                        {inviteResult.errors.map((error, idx) => (
                          <Text key={idx} fontSize="xs" color="fg.muted">
                            {error.email}: {error.error}
                          </Text>
                        ))}
                      </Box>
                    )}
                  </AlertDescription>
                </VStack>
              </Alert.Root>
            )}
          </VStack>
        </CardContent>
      </Card>
      )}

      {/* Groups Accordion */}
      {groupsState.loading ? (
        <Card>
          <CardContent>
            <VStack align="center" gap={4} py={8}>
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <Text color="fg.muted">Loading groups...</Text>
            </VStack>
          </CardContent>
        </Card>
      ) : groupsState.value && groupsState.value.length === 0 ? (
        <Card>
          <CardContent>
            <VStack align="center" gap={4} py={8}>
              <Users className="h-12 w-12 text-muted-foreground" />
              <Text fontSize="lg" fontWeight="medium" color="fg.muted">
                No Groups
              </Text>
              <Text fontSize="sm" color="fg.muted" textAlign="center" mb={2}>
                You are not a member of any groups yet. Create your first group to get started.
              </Text>
              {!showCreateForm ? (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  colorScheme="orange"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              ) : (
                <Card w="full" maxW="md">
                  <CardHeader>
                    <CardTitle>Create New Group</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VStack align="stretch" gap={4}>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>
                          Group Name
                        </Text>
                        <Input
                          placeholder="Enter group name"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !creatingGroup && handleCreateGroup()}
                          disabled={creatingGroup}
                        />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>
                          Description (Optional)
                        </Text>
                        <Input
                          placeholder="Enter group description"
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !creatingGroup && handleCreateGroup()}
                          disabled={creatingGroup}
                        />
                      </Box>
                      <HStack gap={2} justify="end">
                        <Button
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewGroupName('');
                            setNewGroupDescription('');
                          }}
                          variant="outline"
                          disabled={creatingGroup}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateGroup}
                          disabled={creatingGroup || !newGroupName.trim()}
                          colorScheme="orange"
                        >
                          {creatingGroup ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Create
                            </>
                          )}
                        </Button>
                      </HStack>
                    </VStack>
                  </CardContent>
                </Card>
              )}
            </VStack>
          </CardContent>
        </Card>
      ) : groupsState.value ? (
        <VStack align="stretch" gap={4}>
          {groupsState.value.map((group: Group) => (
            <Card key={group.id}>
              <Collapsible
                open={openGroups[group.id] || false}
                onOpenChange={(open) => handleToggleGroup(group.id)}
              >
                <CardHeader>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full p-0 h-auto" type="button">
                      <HStack gap={3} flex={1} align="start" justify="space-between" width="100%">
                        <HStack gap={3} flex={1} align="start" minW={0}>
                          <Users className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <VStack align="start" gap={1} flex={1} minW={0}>
                            <HStack gap={2} align="center" flexWrap="wrap">
                              <Text fontSize="lg" fontWeight="semibold">
                                {group.name}
                              </Text>
                              {group.apiKeys.length > 0 && (
                                <Badge colorScheme="blue" variant="outline">
                                  {group.apiKeys.length} API key
                                  {group.apiKeys.length !== 1 ? 's' : ''}
                                </Badge>
                              )}
                              {group.pendingRequests.length > 0 && (
                                <Badge colorScheme="orange" variant="outline">
                                  {group.pendingRequests.length} pending
                                </Badge>
                              )}
                            </HStack>
                            {group.description && (
                              <Text fontSize="sm" color="fg.muted">
                                {group.description}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 transition-transform ${
                            openGroups[group.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </HStack>
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent pt={0}>
                    <VStack align="stretch" gap={4}>
                      {/* API Keys Section */}
                      {group.apiKeys.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={3}>
                            API Keys ({group.apiKeys.length})
                          </Text>
                          <VStack align="stretch" gap={2}>
                            {group.apiKeys.map((apiKey: Group['apiKeys'][0]) => (
                              <Box
                                key={apiKey.id}
                                p={2}
                                borderRadius="md"
                                borderWidth="1px"
                                bg="bg.muted"
                              >
                                <Text fontSize="sm" fontWeight="medium">
                                  {apiKey.label}
                                </Text>
                                <Text fontSize="xs" color="fg.muted">
                                  Created {format(new Date(apiKey.createdAt), 'MMM d, yyyy')}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      )}

                      {/* Pending Requests Section */}
                      {group.pendingRequests.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={3}>
                            Pending Requests ({group.pendingRequests.length})
                          </Text>
                          <VStack align="stretch" gap={2}>
                            {group.pendingRequests.map((request: Group['pendingRequests'][0]) => (
                              <Box
                                key={request.id}
                                p={2}
                                borderRadius="md"
                                borderWidth="1px"
                                bg="bg.muted"
                              >
                                <Text fontSize="sm" fontWeight="medium">
                                  {request.userName || request.userEmail}
                                </Text>
                                <Text fontSize="xs" color="fg.muted">
                                  {request.userEmail}
                                </Text>
                                <Text fontSize="xs" color="fg.muted">
                                  Requested {format(new Date(request.createdAt), 'MMM d, yyyy')}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      )}

                      {group.apiKeys.length === 0 && group.pendingRequests.length === 0 && (
                        <Text fontSize="sm" color="fg.muted" textAlign="center" py={4}>
                          No additional information for this group.
                        </Text>
                      )}
                    </VStack>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </VStack>
      ) : null}
    </Box>
  );
}
