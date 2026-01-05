'use client';

import { useState, useEffect, useMemo } from 'react';
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
  Mail,
  Check,
  X,
  ChevronDown,
  Users,
  UserPlus,
  Clock,
  Key,
} from 'lucide-react';
import { getUserGroups, createGroup, type Group } from '@/app/actions/keys';
import { inviteUserToGroup, getPendingRequestsForGroup, verifyUserExists, getApiKeysForGroup, batchInviteUsersToGroups, approvePendingRequest } from '@/app/actions/groups';
import { supabase } from '@/lib/supabase/client';

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

type GroupWithRequests = Group & {
  pendingRequests?: PendingRequest[];
  apiKeys?: ApiKey[];
  open?: boolean;
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupWithRequests[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [inviteStates, setInviteStates] = useState<Record<string, {
    email: string;
    verifying: boolean;
    verified: boolean;
    verifiedUser: { id: string; email: string; name: string | null } | null;
    inviting: boolean;
    error: string | null;
  }>>({});
  const [loadingRequests, setLoadingRequests] = useState<Set<string>>(new Set());
  const [loadingApiKeys, setLoadingApiKeys] = useState<Set<string>>(new Set());
  const [approvingRequests, setApprovingRequests] = useState<Set<string>>(new Set());
  
  // Batch invite state
  const [batchSelectedGroupIds, setBatchSelectedGroupIds] = useState<string[]>([]);
  const [batchEmailInput, setBatchEmailInput] = useState('');
  const [batchVerifying, setBatchVerifying] = useState(false);
  const [batchVerifiedUsers, setBatchVerifiedUsers] = useState<Array<{ email: string; name: string | null }>>([]);
  const [batchVerificationErrors, setBatchVerificationErrors] = useState<Array<{ email: string; error: string }>>([]);
  const [batchInviting, setBatchInviting] = useState(false);
  const [batchInviteResult, setBatchInviteResult] = useState<{ success?: boolean; invited?: number; failed?: number; errors?: Array<{ email: string; error: string }> } | null>(null);

  const loadGroups = async () => {
    setLoading(true);
    setError(null);
    const result = await getUserGroups();
    if (result.error) {
      setError(result.error);
      setGroups([]);
    } else {
      const groupsWithOpen = (result.groups || []).map((group) => ({
        ...group,
        open: false, // All groups collapsed by default
      }));
      setGroups(groupsWithOpen);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // Load pending requests and API keys for each group (only once when groups are first loaded)
  useEffect(() => {
    let mounted = true;
    
    const loadGroupData = async () => {
      for (const group of groups) {
        if (!mounted) break;
        
        // Load pending requests (only if not already loaded)
        if (!group.pendingRequests && !loadingRequests.has(group.id)) {
          setLoadingRequests(prev => new Set(prev).add(group.id));
          const requestsResult = await getPendingRequestsForGroup(group.id);
          if (mounted && requestsResult.requests) {
            setGroups(prev => prev.map(g =>
              g.id === group.id ? { ...g, pendingRequests: requestsResult.requests } : g
            ));
          }
          if (mounted) {
            setLoadingRequests(prev => {
              const next = new Set(prev);
              next.delete(group.id);
              return next;
            });
          }
        }

        // Load API keys (only if not already loaded)
        if (!group.apiKeys && !loadingApiKeys.has(group.id)) {
          setLoadingApiKeys(prev => new Set(prev).add(group.id));
          const apiKeysResult = await getApiKeysForGroup(group.id);
          if (mounted && apiKeysResult.apiKeys) {
            setGroups(prev => prev.map(g =>
              g.id === group.id ? { ...g, apiKeys: apiKeysResult.apiKeys } : g
            ));
          }
          if (mounted) {
            setLoadingApiKeys(prev => {
              const next = new Set(prev);
              next.delete(group.id);
              return next;
            });
          }
        }
      }
    };

    if (groups.length > 0) {
      loadGroupData();
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length]); // Only run when number of groups changes (new groups added/removed)

  // Set up real-time subscriptions for each group's pending requests
  useEffect(() => {
    if (!supabase || !groups.length) {
      return;
    }

    const channels = groups.map((group) => {
      if (!supabase) return null;
      const channel = supabase
        .channel(`group_members:${group.id}:pending`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'group_members',
            filter: `group_id=eq.${group.id}`,
          },
          async (payload) => {
            // Only handle changes for pending requests
            if (payload.eventType === 'INSERT' && payload.new.status === 'pending') {
              // Reload pending requests for this group
              const requestsResult = await getPendingRequestsForGroup(group.id);
              if (requestsResult.requests) {
                setGroups(prev => prev.map(g =>
                  g.id === group.id ? { ...g, pendingRequests: requestsResult.requests } : g
                ));
              }
            } else if (payload.eventType === 'UPDATE') {
              // If status changed from pending to active, remove from list
              if (payload.old.status === 'pending' && payload.new.status !== 'pending') {
                setGroups(prev => prev.map(g => {
                  if (g.id === group.id && g.pendingRequests) {
                    return {
                      ...g,
                      pendingRequests: g.pendingRequests.filter((req: PendingRequest) => req.id !== payload.old.id)
                    };
                  }
                  return g;
                }));
              } else if (payload.new.status === 'pending') {
                // Reload pending requests for this group
                const requestsResult = await getPendingRequestsForGroup(group.id);
                if (requestsResult.requests) {
                  setGroups(prev => prev.map(g =>
                    g.id === group.id ? { ...g, pendingRequests: requestsResult.requests } : g
                  ));
                }
              }
            } else if (payload.eventType === 'DELETE' && payload.old.status === 'pending') {
              // Remove the deleted request from the list
              setGroups(prev => prev.map(g => {
                if (g.id === group.id && g.pendingRequests) {
                    return {
                      ...g,
                      pendingRequests: g.pendingRequests.filter((req: PendingRequest) => req.id !== payload.old.id)
                    };
                }
                return g;
              }));
            }
          }
        )
        .subscribe();

      return channel;
    });

    return () => {
      if (!supabase) return;
      channels.forEach(channel => {
        if (channel && supabase) {
          supabase.removeChannel(channel);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.map(g => g.id).join(',')]); // Re-subscribe when group IDs change

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      return;
    }

    setCreatingGroup(true);
    const result = await createGroup(newGroupName.trim(), newGroupDescription.trim() || undefined);
    setCreatingGroup(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else if (result.group) {
      setNewGroupName('');
      setNewGroupDescription('');
      setShowCreateForm(false);
      await loadGroups();
    }
  };

  const handleVerifyEmail = async (groupId: string) => {
    const state = inviteStates[groupId];
    if (!state || !state.email.trim()) {
      return;
    }

    setInviteStates(prev => ({
      ...prev,
      [groupId]: { ...prev[groupId], verifying: true, error: null },
    }));

    const result = await verifyUserExists(state.email.trim());

    setInviteStates(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        verifying: false,
        verified: result.exists === true,
        verifiedUser: result.user || null,
        error: result.error || (result.exists === false ? 'User not found' : null),
      },
    }));
  };

  const handleInvite = async (groupId: string) => {
    const state = inviteStates[groupId];
    if (!state || !state.verified || !state.verifiedUser) {
      return;
    }

    setInviteStates(prev => ({
      ...prev,
      [groupId]: { ...prev[groupId], inviting: true, error: null },
    }));

    const result = await inviteUserToGroup(groupId, state.verifiedUser.email);

    if (result.error) {
      setInviteStates(prev => ({
        ...prev,
        [groupId]: { ...prev[groupId], inviting: false, error: result.error || null },
      }));
    } else if (result.success) {
      // Reset invite state
      setInviteStates(prev => ({
        ...prev,
        [groupId]: {
          email: '',
          verifying: false,
          verified: false,
          verifiedUser: null,
          inviting: false,
          error: null,
        },
      }));

      // Reload requests for this group
      const requestsResult = await getPendingRequestsForGroup(groupId);
      if (requestsResult.requests) {
        setGroups(prev => prev.map(g =>
          g.id === groupId ? { ...g, pendingRequests: requestsResult.requests } : g
        ));
      }
    }
  };

  const toggleGroup = (groupId: string) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId ? { ...g, open: !g.open } : g
    ));
  };

  const handleApproveRequest = async (groupId: string, requestId: string) => {
    setApprovingRequests(prev => new Set(prev).add(requestId));

    const result = await approvePendingRequest(requestId, groupId);

    setApprovingRequests(prev => {
      const next = new Set(prev);
      next.delete(requestId);
      return next;
    });

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else if (result.success) {
      // Reload requests for this group
      const requestsResult = await getPendingRequestsForGroup(groupId);
      if (requestsResult.requests) {
        setGroups(prev => prev.map(g =>
          g.id === groupId ? { ...g, pendingRequests: requestsResult.requests } : g
        ));
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBatchVerifyEmails = async () => {
    if (!batchEmailInput.trim()) {
      return;
    }

    const emails = batchEmailInput
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (emails.length === 0) {
      return;
    }

    setBatchVerifying(true);
    setBatchVerifiedUsers([]);
    setBatchVerificationErrors([]);

    const verified: Array<{ email: string; name: string | null }> = [];
    const errors: Array<{ email: string; error: string }> = [];

    for (const email of emails) {
      const result = await verifyUserExists(email);
      if (result.exists && result.user) {
        verified.push({
          email: result.user.email,
          name: result.user.name,
        });
      } else {
        errors.push({
          email,
          error: result.error || 'User not found',
        });
      }
    }

    setBatchVerifiedUsers(verified);
    setBatchVerificationErrors(errors);
    setBatchVerifying(false);
  };

  const handleBatchInvite = async () => {
    if (batchSelectedGroupIds.length === 0) {
      alert('Please select at least one group');
      return;
    }

    if (batchVerifiedUsers.length === 0) {
      alert('Please verify at least one user email');
      return;
    }

    setBatchInviting(true);
    setBatchInviteResult(null);

    const emails = batchVerifiedUsers.map(u => u.email);
    const result = await batchInviteUsersToGroups(emails, batchSelectedGroupIds);

    setBatchInviteResult(result);
    setBatchInviting(false);

    if (result.success) {
      // Clear form
      setBatchEmailInput('');
      setBatchVerifiedUsers([]);
      setBatchVerificationErrors([]);
      // Reload groups to update pending requests
      await loadGroups();
    }
  };

  const batchSelectedGroupsText = batchSelectedGroupIds.length === 0
    ? 'Select groups...'
    : batchSelectedGroupIds.length === 1
    ? groups.find(g => g.id === batchSelectedGroupIds[0])?.name || '1 group selected'
    : `${batchSelectedGroupIds.length} groups selected`;

  // Create a stable key for the Select component to force re-render when groups change
  const selectKey = useMemo(() => groups.map(g => g.id).join(','), [groups]);

  return (
    <Box flex="1" maxW="6xl" w="full">
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
          Groups
        </Heading>
        {!showCreateForm && (
          <Button
            onClick={() => setShowCreateForm(true)}
            colorScheme="orange"
            size="sm"
          >
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

      {/* Create Group Form */}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateGroup();
                    }
                  }}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateGroup();
                    }
                  }}
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
                {/* Group Selection */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Select Groups
                  </Text>
                  {/* @ts-ignore - Select.Root multiple selection type issue */}
                  <Select.Root
                    key={selectKey}
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

                {/* Email Input */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    User Emails (comma-separated)
                  </Text>
                  <HStack gap={2}>
                    <Input
                      type="text"
                      placeholder="user1@example.com, user2@example.com, user3@example.com"
                      value={batchEmailInput}
                      onChange={(e) => {
                        setBatchEmailInput(e.target.value);
                        setBatchVerifiedUsers([]);
                        setBatchVerificationErrors([]);
                        setBatchInviteResult(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !batchVerifying) {
                          handleBatchVerifyEmails();
                        }
                      }}
                      disabled={batchVerifying || batchInviting}
                    />
                    <Button
                      onClick={handleBatchVerifyEmails}
                      disabled={batchVerifying || !batchEmailInput.trim() || batchInviting}
                      variant="outline"
                      size="sm"
                    >
                      {batchVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Verify
                        </>
                      )}
                    </Button>
                  </HStack>
                  <Text fontSize="xs" color="fg.muted" mt={1}>
                    Enter multiple email addresses separated by commas
                  </Text>
                </Box>

                {/* Verification Results */}
                {batchVerifiedUsers.length > 0 && (
                  <Alert.Root status="success" borderRadius="md" size="sm">
                    <AlertIndicator />
                    <VStack align="start" gap={1} flex={1}>
                      <AlertTitle fontSize="xs">Verified Users ({batchVerifiedUsers.length})</AlertTitle>
                      <AlertDescription fontSize="xs">
                        {batchVerifiedUsers.map((user, idx) => (
                          <Text key={idx}>
                            {user.name || user.email} ({user.email})
                          </Text>
                        ))}
                      </AlertDescription>
                    </VStack>
                  </Alert.Root>
                )}

                {batchVerificationErrors.length > 0 && (
                  <Alert.Root status="error" borderRadius="md" size="sm">
                    <AlertIndicator />
                    <VStack align="start" gap={1} flex={1}>
                      <AlertTitle fontSize="xs">Verification Errors ({batchVerificationErrors.length})</AlertTitle>
                      <AlertDescription fontSize="xs">
                        {batchVerificationErrors.map((error, idx) => (
                          <Text key={idx}>
                            {error.email}: {error.error}
                          </Text>
                        ))}
                      </AlertDescription>
                    </VStack>
                  </Alert.Root>
                )}

                {/* Invite Button */}
                {batchVerifiedUsers.length > 0 && batchSelectedGroupIds.length > 0 && (
                  <Box>
                    <Button
                      onClick={handleBatchInvite}
                      disabled={batchInviting}
                      colorScheme="green"
                      width={{ base: 'full', sm: 'auto' }}
                    >
                      {batchInviting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inviting...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Send Invitations
                        </>
                      )}
                    </Button>
                  </Box>
                )}

                {/* Invite Result */}
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
                          <>
                            <Text>
                              Successfully invited {batchInviteResult.invited} user{batchInviteResult.invited !== 1 ? 's' : ''} to {batchSelectedGroupIds.length} group{batchSelectedGroupIds.length !== 1 ? 's' : ''}.
                            </Text>
                            {batchInviteResult.failed && batchInviteResult.failed > 0 && (
                              <Text fontSize="xs" color="fg.muted" mt={1}>
                                {batchInviteResult.failed} invitation{batchInviteResult.failed !== 1 ? 's' : ''} failed.
                              </Text>
                            )}
                          </>
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

          {groups.map((group) => {
            const inviteState = inviteStates[group.id] || {
              email: '',
              verifying: false,
              verified: false,
              verifiedUser: null,
              inviting: false,
              error: null,
            };

            return (
              <Card key={group.id}>
                <Collapsible
                  open={group.open}
                  onOpenChange={(open) => toggleGroup(group.id)}
                >
                  <CardHeader>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full p-0 h-auto"
                        type="button"
                      >
                        <HStack gap={3} flex={1} align="start" justify="space-between" width="100%">
                          <HStack gap={3} flex={1} align="start" minW={0}>
                            <Users className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <VStack align="start" gap={1} flex={1} minW={0}>
                              <HStack gap={2} align="center" flexWrap="wrap">
                                <Text fontSize="lg" fontWeight="semibold">
                                  {group.name}
                                </Text>
                                {group.apiKeys && group.apiKeys.length > 0 && (
                                  <Badge colorScheme="blue" variant="outline">
                                    {group.apiKeys.length} API key{group.apiKeys.length !== 1 ? 's' : ''}
                                  </Badge>
                                )}
                                {group.pendingRequests && group.pendingRequests.length > 0 && (
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
                          <VStack align="stretch" gap={3}>
                            <HStack gap={2}>
                              <Input
                                type="email"
                                placeholder="user@example.com"
                                value={inviteState.email}
                                onChange={(e) => {
                                  setInviteStates(prev => ({
                                    ...prev,
                                    [group.id]: {
                                      ...prev[group.id] || {
                                        email: '',
                                        verifying: false,
                                        verified: false,
                                        verifiedUser: null,
                                        inviting: false,
                                        error: null,
                                      },
                                      email: e.target.value,
                                      verified: false,
                                      verifiedUser: null,
                                      error: null,
                                    },
                                  }));
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !inviteState.verifying) {
                                    handleVerifyEmail(group.id);
                                  }
                                }}
                                disabled={inviteState.verifying || inviteState.inviting}
                              />
                              <Button
                                onClick={() => handleVerifyEmail(group.id)}
                                disabled={inviteState.verifying || !inviteState.email.trim() || inviteState.inviting}
                                variant="outline"
                                size="sm"
                              >
                                {inviteState.verifying ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  <>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Invitation
                                  </>
                                )}
                              </Button>
                            </HStack>

                            {inviteState.error && (
                              <Alert.Root status="error" borderRadius="md" size="sm">
                                <AlertIndicator />
                                <AlertDescription fontSize="xs">
                                  {inviteState.error}
                                </AlertDescription>
                              </Alert.Root>
                            )}

                            {inviteState.verified && inviteState.verifiedUser && (
                              <Alert.Root status="success" borderRadius="md" size="sm">
                                <AlertIndicator />
                                <VStack align="start" gap={1} flex={1}>
                                  <AlertTitle fontSize="xs">User Verified</AlertTitle>
                                  <AlertDescription fontSize="xs">
                                    <Text>
                                      <strong>Name:</strong> {inviteState.verifiedUser.name || 'N/A'}
                                    </Text>
                                    <Text>
                                      <strong>Email:</strong> {inviteState.verifiedUser.email}
                                    </Text>
                                  </AlertDescription>
                                  <Button
                                    onClick={() => handleInvite(group.id)}
                                    disabled={inviteState.inviting}
                                    colorScheme="green"
                                    size="sm"
                                    mt={2}
                                  >
                                    {inviteState.inviting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Inviting...
                                      </>
                                    ) : (
                                      <>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Send Invitation
                                      </>
                                    )}
                                  </Button>
                                </VStack>
                              </Alert.Root>
                            )}
                          </VStack>
                        </Box>

                        {/* API Keys Section */}
                        <Box>
                          <HStack justify="space-between" mb={3}>
                            <Text fontSize="sm" fontWeight="medium">
                              API Keys
                            </Text>
                            {loadingApiKeys.has(group.id) && (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            )}
                          </HStack>
                          {!group.apiKeys || group.apiKeys.length === 0 ? (
                            <Text fontSize="sm" color="fg.muted">
                              No API keys for this group
                            </Text>
                          ) : (
                            <VStack align="stretch" gap={1.5}>
                              {group.apiKeys.map((apiKey: ApiKey) => (
                                <Box
                                  key={apiKey.id}
                                  p={2}
                                  borderRadius="md"
                                  borderWidth="1px"
                                  bg="bg.muted"
                                >
                                  <HStack justify="space-between" align="start">
                                    <VStack align="start" gap={0.5} flex={1}>
                                      <HStack gap={2}>
                                        <Key className="h-4 w-4 text-muted-foreground" />
                                        <Text fontSize="sm" fontWeight="medium">
                                          {apiKey.label}
                                        </Text>
                                      </HStack>
                                      <Text fontSize="xs" color="fg.muted" pl={6}>
                                        Created {formatDate(new Date(apiKey.createdAt))}
                                      </Text>
                                      {apiKey.lastUsedAt && (
                                        <Text fontSize="xs" color="fg.muted" pl={6}>
                                          Last used {formatDate(new Date(apiKey.lastUsedAt))}
                                        </Text>
                                      )}
                                      {!apiKey.lastUsedAt && (
                                        <Text fontSize="xs" color="fg.muted" pl={6}>
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
                          <HStack justify="space-between" mb={3}>
                            <Text fontSize="sm" fontWeight="medium">
                              Pending Requests
                            </Text>
                            {loadingRequests.has(group.id) && (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            )}
                          </HStack>
                          {!group.pendingRequests || group.pendingRequests.length === 0 ? (
                            <Text fontSize="sm" color="fg.muted">
                              No pending requests
                            </Text>
                          ) : (
                            <VStack align="stretch" gap={1.5}>
                              {group.pendingRequests.map((request: PendingRequest) => (
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
                                      disabled={approvingRequests.has(request.id)}
                                      colorScheme="green"
                                      size="sm"
                                      variant="solid"
                                    >
                                      {approvingRequests.has(request.id) ? (
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
            );
          })}
        </VStack>
      )}
    </Box>
  );
}
