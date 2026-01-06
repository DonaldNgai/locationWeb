'use client';

import {
  Portal,
  Select,
  Spinner,
  createListCollection,
  Accordion,
  Box,
  VStack,
  Text,
  Button,
  Input,
  CardRoot as Card,
  CardBody as CardContent,
  CardHeader,
  Heading as CardTitle,
  HStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useAsyncRetry } from 'react-use';
import { getGroupsWithDetails } from '@/app/actions/groups';
import { createGroup } from '@/app/actions/keys';
import { Plus } from 'lucide-react';

interface Group {
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
}

export default function GroupsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [createGroupError, setCreateGroupError] = useState<string | null>(null);

  const state = useAsyncRetry(async (): Promise<Group[]> => {
    const result = await getGroupsWithDetails();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.groups || [];
  }, []);

  const collection = useMemo(() => {
    return createListCollection({
      items: state.value ?? [],
      itemToString: (group: Group) => group.name,
      itemToValue: (group: Group) => group.id,
    });
  }, [state.value]);

  const hasGroups = state.value && state.value.length > 0;
  const showGroupsContent = hasGroups && !showCreateForm;
  const showCreateCard = !hasGroups || showCreateForm;

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
        // Reload groups
        state.retry();
      }
    } catch (err) {
      setCreateGroupError('Failed to create group');
    } finally {
      setCreatingGroup(false);
    }
  };

  if (state.loading) {
    return (
      <Box p={6}>
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={6} p={6}>
      {showGroupsContent && (
        <>
          <HStack justify="space-between" align="center">
            <Select.Root collection={collection} size="sm" width="320px">
              <Select.HiddenSelect />
              <Select.Label>Select group</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select group" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {collection.items.map((group: Group) => (
                      <Select.Item item={group} key={group.id}>
                        {group.name}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Button
              onClick={() => setShowCreateForm(true)}
              colorScheme="orange"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </HStack>

          <Accordion.Root multiple>
            {state.value!.map((group) => (
              <Accordion.Item key={group.id} value={group.id}>
                <Accordion.ItemTrigger>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold">{group.name}</Text>
                    {group.description && (
                      <Text fontSize="sm" color="fg.muted">
                        {group.description}
                      </Text>
                    )}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <VStack align="stretch" gap={4} py={2}>
                      {group.apiKeys.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
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
                                  Created {new Date(apiKey.createdAt).toLocaleDateString()}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      )}

                      {group.pendingRequests.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
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
                                  Requested {new Date(request.createdAt).toLocaleDateString()}
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
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </>
      )}

      {showCreateCard && (
        <Card maxW="md" mx="auto" w="full">
          <CardHeader>
            <CardTitle>Create New Group</CardTitle>
          </CardHeader>
          <CardContent>
            <VStack align="stretch" gap={4}>
              {createGroupError && (
                <Box p={2} borderRadius="md" bg="red.50" borderWidth="1px" borderColor="red.200">
                  <Text fontSize="sm" color="red.600">
                    {createGroupError}
                  </Text>
                </Box>
              )}
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
                {hasGroups && (
                  <Button
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewGroupName('');
                      setNewGroupDescription('');
                      setCreateGroupError(null);
                    }}
                    variant="outline"
                    disabled={creatingGroup}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={handleCreateGroup}
                  disabled={creatingGroup || !newGroupName.trim()}
                  colorScheme="orange"
                >
                  {creatingGroup ? 'Creating...' : 'Create Group'}
                </Button>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
      )}
    </VStack>
  );
}
