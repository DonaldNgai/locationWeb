'use client';

import {
  Dialog,
  Portal,
  Select,
  createListCollection,
  Spinner,
  Box,
  VStack,
  Text,
  Button,
  Input,
  HStack,
  Alert,
  AlertIndicator,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { batchInviteUsersToGroups } from '@/app/actions/groups';
import { UserPlus } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string | null;
}

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  groups: Group[];
  onSuccess?: () => void;
}

export function InviteDialog({ isOpen, onClose, groups, onSuccess }: InviteDialogProps) {
  const [inviteEmailInput, setInviteEmailInput] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [inviting, setInviting] = useState(false);
  const [inviteResult, setInviteResult] = useState<{
    success?: boolean;
    invited?: number;
    failed?: number;
    errors?: Array<{ email: string; error: string }>;
  } | null>(null);


  console.log('groups', groups);
  const groupsCollection = useMemo(() => {
    return createListCollection({
      items: groups,
      itemToString: (group: Group) => group.name,
      itemToValue: (group: Group) => group.id,
    });
  }, [groups]);


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
        if (onSuccess) {
          // Delay slightly to allow dialog to show success message
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 1500);
        } else {
          onClose();
        }
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

  const handleClose = () => {
    if (!inviting) {
      setInviteEmailInput('');
      setSelectedGroupIds([]);
      setInviteResult(null);
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Invite Users to Groups</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <VStack align="stretch" gap={4}>
              <Box>
                <Select.Root
                  multiple
                  collection={groupsCollection}
                  size="sm"
                  width="320px"
                  value={selectedGroupIds}
                  onValueChange={(e: any) => {
                    console.log('onValueChange event:', e);
                    const newValue = Array.isArray(e.value) ? e.value : [e.value];
                    const filtered = newValue.filter((v: any): v is string => typeof v === 'string');
                    console.log('Setting selectedGroupIds to:', filtered);
                    setSelectedGroupIds(filtered);
                    setInviteResult(null);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Select groups</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select groups" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {groupsCollection.items.map((group: Group) => (
                        <Select.Item item={group} key={group.id}>
                          {group.name}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  User Emails (comma-separated)
                </Text>
                <Input
                  type="text"
                  placeholder="user1@example.com, user2@example.com"
                  value={inviteEmailInput}
                  onChange={(e) => {
                    setInviteEmailInput(e.target.value);
                    setInviteResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && !inviting && handleBatchInvite()}
                  disabled={inviting}
                />
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

              <HStack gap={2} justify="end" mt={2}>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  disabled={inviting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBatchInvite}
                  disabled={inviting || !inviteEmailInput.trim() || selectedGroupIds.length === 0}
                  colorScheme="green"
                >
                  {inviting ? (
                    <>
                      <Spinner size="xs" className="mr-2" />
                      Inviting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Users
                    </>
                  )}
                </Button>
              </HStack>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
