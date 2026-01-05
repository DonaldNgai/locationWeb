'use client';

import { useState, useEffect } from 'react';
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
  Plus,
  Check,
  ChevronDown,
  Users,
  UserPlus,
  Clock,
  Key,
} from 'lucide-react';
import { createGroup } from '@/app/actions/keys';
import {
  getGroupsWithDetails,
  inviteUserToGroup,
  batchInviteUsersToGroups,
  approvePendingRequest,
} from '@/app/actions/groups';

type PendingRequest = {
  id: string;
  userEmail: string;
  userName: string | null;
  createdAt: Date;
};

type ApiKey = {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  groupId?: string;
};

type Group = {
  id: string;
  name: string;
  description: string | null;
  pendingRequests: PendingRequest[];
  apiKeys: ApiKey[];
  open?: boolean;
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create group form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);

  // Invite form state (per group)
  const [inviteStates, setInviteStates] = useState<Record<string, {
    email: string;
    inviting: boolean;
    error: string | null;
  }>>({});

  // Batch invite
  const [batchSelectedGroupIds, setBatchSelectedGroupIds] = useState<string[]>([]);
  const [batchEmailInput, setBatchEmailInput] = useState('');
  const [batchInviting, setBatchInviting] = useState(false);
  const [batchInviteResult, setBatchInviteResult] = useState<{
    success?: boolean;
    invited?: number;
    failed?: number;
    errors?: Array<{ email: string; error: string }>;
  } | null>(null);

  // Approving requests
  const [approvingRequestId, setApprovingRequestId] = useState<string | null>(null);

  const loadGroups = async () => {
    setLoading(true);
    setError(null);
    const result = await getGroupsWithDetails();
    if (result.error) {
      setError(result.error);
      setGroups([]);
    } else {
      setGroups((result.groups || []).map(g => ({ ...g, open: false })));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    setCreatingGroup(true);
    setError(null);
    const result = await createGroup(newGroupName.trim(), newGroupDescription.trim() || undefined);
    setCreatingGroup(false);

    if (result.error) {
      setError(result.error);
    } else {
      setNewGroupName('');
      setNewGroupDescription('');
      setShowCreateForm(false);
      await loadGroups();
    }
  };

  const handleInviteUser = async (groupId: string) => {
    const state = inviteStates[groupId];
    if (!state || !state.email.trim()) return;

    setInviteStates(prev => ({
      ...prev,
      [groupId]: { ...prev[groupId], inviting: true, error: null },
    }));

    const result = await inviteUserToGroup(groupId, state.email.trim());

    if (result.error) {
      setInviteStates(prev => ({
        ...prev,
        [groupId]: { ...prev[groupId], inviting: false, error: result.error || null },
      }));
    } else {
      setInviteStates(prev => ({
        ...prev,
        [groupId]: { email: '', inviting: false, error: null },
      }));
      await loadGroups();
    }
  };

  const handleBatchInvite = async () => {
    if (batchSelectedGroupIds.length === 0 || !batchEmailInput.trim()) return;

    const emails = batchEmailInput
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (emails.length === 0) return;

    setBatchInviting(true);
    setBatchInviteResult(null);
    const result = await batchInviteUsersToGroups(emails, batchSelectedGroupIds);
    setBatchInviting(false);

    setBatchInviteResult(result);
    if (result.success) {
      setBatchEmailInput('');
      setBatchSelectedGroupIds([]);
      await loadGroups();
    }
  };

  const handleApproveRequest = async (groupId: string, requestId: string) => {
    setApprovingRequestId(requestId);
    const result = await approvePendingRequest(requestId, groupId);
    setApprovingRequestId(null);

    if (result.error) {
      setError(result.error);
    } else {
      await loadGroups();
    }
  };

  const toggleGroup = (groupId: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, open: !g.open } : g));
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const batchSelectedGroupsText = batchSelectedGroupIds.length === 0
    ? 'Select groups...'
    : batchSelectedGroupIds.length === 1
    ? groups.find(g => g.id === batchSelectedGroupIds[0])?.name || '1 group selected'
    : `${batchSelectedGroupIds.length} groups selected`;

  return (
    <Box flex="1" maxW="6xl" w="full">
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
          Groups
        </Heading>
        {!showCreateForm && (
          <Button onClick={() => setShowCreateForm(true)} colorScheme="orange" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        )}
      </HStack>

      {error && (
        <Alert.Root status="error" borderRadius="md" mb={4}>
          <AlertIndicator />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert.Root>
      )}

      {showCreateForm && (
        <Card mb={4}>
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
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateGroup()}
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
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateGroup()}
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

      {loading ? (
        <Card>
          <CardContent>
            <VStack align="center" gap={4} py={8}>
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <Text color="fg.muted">Loading groups...</Text>
            </VStack>
          </CardContent>
        </Card>
      ) : groups.length === 0 ? (
        <Card>
          <CardContent>
            <VStack align="center" gap={4} py={8}>
              <Users className="h-12 w-12 text-muted-foreground" />
              <Text fontSize="lg" fontWeight="medium" color="fg.muted">
                No Groups
              </Text>
              <Text fontSize="sm" color="fg.muted" textAlign="center">
                You are not a member of any groups yet. Create your first group to get started.
              </Text>
            </VStack>
          </CardContent>
        </Card>
      ) : (
        <VStack align="stretch" gap={4}>
          {/* Batch Invite Section */}
          <Card>
            <CardHeader>
              <CardTitle>Invite Users to Multiple Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Select Groups
                  </Text>
                  {/* @ts-ignore - Select.Root multiple selection type issue */}
                  <Select.Root
                    multiple
                    value={batchSelectedGroupIds}
                    onValueChange={(e: any) => {
                      const newValue = Array.isArray(e.value) ? e.value : [e.value];
                      setBatchSelectedGroupIds(newValue.filter((v: any): v is string => typeof v === 'string'));
                    }}
                  >
                    <SelectControl>
                      <SelectTrigger className="w-full">
                        <SelectValueText placeholder="Select groups...">
                          {batchSelectedGroupsText}
                        </SelectValueText>
                      </SelectTrigger>
                    </SelectControl>
                    <SelectPositioner>
                      <SelectContent>
                        {groups.map((group) => (
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
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    User Emails (comma-separated)
                  </Text>
                  <HStack gap={2}>
                    <Input
                      type="text"
                      placeholder="user1@example.com, user2@example.com"
                      value={batchEmailInput}
                      onChange={(e) => {
                        setBatchEmailInput(e.target.value);
                        setBatchInviteResult(null);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && !batchInviting && handleBatchInvite()}
                      disabled={batchInviting}
                    />
                    <Button
                      onClick={handleBatchInvite}
                      disabled={batchInviting || !batchEmailInput.trim() || batchSelectedGroupIds.length === 0}
                      colorScheme="green"
                      size="sm"
                    >
                      {batchInviting ? (
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

                {batchInviteResult && (
                  <Alert.Root
                    status={batchInviteResult.success ? "success" : "error"}
                    borderRadius="md"
                  >
                    <AlertIndicator />
                    <VStack align="start" gap={1} flex={1}>
                      <AlertTitle>
                        {batchInviteResult.success ? 'Success' : 'Error'}
                      </AlertTitle>
                      <AlertDescription>
                        {batchInviteResult.success ? (
                          <Text>
                            Successfully invited {batchInviteResult.invited} user{batchInviteResult.invited !== 1 ? 's' : ''} to {batchSelectedGroupIds.length} group{batchSelectedGroupIds.length !== 1 ? 's' : ''}.
                          </Text>
                        ) : (
                          <Text>An error occurred while sending invitations</Text>
                        )}
                        {batchInviteResult.errors && batchInviteResult.errors.length > 0 && (
                          <Box mt={2}>
                            <Text fontSize="xs" fontWeight="medium">Errors:</Text>
                            {batchInviteResult.errors.map((error, idx) => (
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

          {/* Groups List */}
          {groups.map((group) => (
            <Card key={group.id}>
              <Collapsible open={group.open} onOpenChange={(open) => toggleGroup(group.id)}>
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
                                  {group.apiKeys.length} API key{group.apiKeys.length !== 1 ? 's' : ''}
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
                          className={`flex-shrink-0 transition-transform ${group.open ? 'rotate-180' : ''}`}
                        />
                      </HStack>
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent pt={0}>
                    <VStack align="stretch" gap={6}>
                      {/* Invite User Section */}
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={3}>
                          Invite User to Group
                        </Text>
                        {(() => {
                          const inviteState = inviteStates[group.id] || { email: '', inviting: false, error: null };
                          return (
                            <>
                              <HStack gap={2}>
                                <Input
                                  type="email"
                                  placeholder="user@example.com"
                                  value={inviteState.email}
                                  onChange={(e) => {
                                    setInviteStates(prev => ({
                                      ...prev,
                                      [group.id]: {
                                        ...prev[group.id] || { email: '', inviting: false, error: null },
                                        email: e.target.value,
                                        error: null,
                                      },
                                    }));
                                  }}
                                  onKeyDown={(e) => e.key === 'Enter' && !inviteState.inviting && handleInviteUser(group.id)}
                                  disabled={inviteState.inviting}
                                />
                                <Button
                                  onClick={() => handleInviteUser(group.id)}
                                  disabled={inviteState.inviting || !inviteState.email.trim()}
                                  colorScheme="green"
                                  size="sm"
                                >
                                  {inviteState.inviting ? (
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
                              {inviteState.error && (
                                <Alert.Root status="error" borderRadius="md" size="sm" mt={2}>
                                  <AlertIndicator />
                                  <AlertDescription fontSize="xs">{inviteState.error}</AlertDescription>
                                </Alert.Root>
                              )}
                            </>
                          );
                        })()}
                      </Box>

                      {/* API Keys Section */}
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={3}>
                          API Keys
                        </Text>
                        {group.apiKeys.length === 0 ? (
                          <Text fontSize="sm" color="fg.muted">
                            No API keys for this group
                          </Text>
                        ) : (
                          <VStack align="stretch" gap={1.5}>
                            {group.apiKeys.map((apiKey) => (
                              <Box key={apiKey.id} p={2} borderRadius="md" borderWidth="1px" bg="bg.muted">
                                <HStack gap={2}>
                                  <Key className="h-4 w-4 text-muted-foreground" />
                                  <VStack align="start" gap={0.5} flex={1}>
                                    <Text fontSize="sm" fontWeight="medium">
                                      {apiKey.label}
                                    </Text>
                                    <Text fontSize="xs" color="fg.muted">
                                      Created {formatDate(apiKey.createdAt)}
                                    </Text>
                                    {apiKey.lastUsedAt ? (
                                      <Text fontSize="xs" color="fg.muted">
                                        Last used {formatDate(apiKey.lastUsedAt)}
                                      </Text>
                                    ) : (
                                      <Text fontSize="xs" color="fg.muted">
                                        Never used
                                      </Text>
                                    )}
                                  </VStack>
                                </HStack>
                              </Box>
                            ))}
                          </VStack>
                        )}
                      </Box>

                      {/* Pending Requests Section */}
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={3}>
                          Pending Requests
                        </Text>
                        {group.pendingRequests.length === 0 ? (
                          <Text fontSize="sm" color="fg.muted">
                            No pending requests
                          </Text>
                        ) : (
                          <VStack align="stretch" gap={1.5}>
                            {group.pendingRequests.map((request) => (
                              <Box
                                key={request.id}
                                p={2}
                                borderRadius="md"
                                borderWidth="1px"
                                bg="bg.muted"
                              >
                                <HStack justify="space-between" align="start" gap={3}>
                                  <VStack align="start" gap={0.5} flex={1}>
                                    <HStack gap={2}>
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <Text fontSize="sm" fontWeight="medium">
                                        {request.userName || request.userEmail}
                                      </Text>
                                      <Badge colorScheme="orange" variant="outline" size="sm">
                                        Pending
                                      </Badge>
                                    </HStack>
                                    <Text fontSize="xs" color="fg.muted" pl={6}>
                                      {request.userEmail}
                                    </Text>
                                    <Text fontSize="xs" color="fg.muted" pl={6}>
                                      Requested {formatDate(request.createdAt)}
                                    </Text>
                                  </VStack>
                                  <Button
                                    onClick={() => handleApproveRequest(group.id, request.id)}
                                    disabled={approvingRequestId === request.id}
                                    colorScheme="green"
                                    size="sm"
                                  >
                                    {approvingRequestId === request.id ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Approving...
                                      </>
                                    ) : (
                                      <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Approve
                                      </>
                                    )}
                                  </Button>
                                </HStack>
                              </Box>
                            ))}
                          </VStack>
                        )}
                      </Box>
                    </VStack>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
}
