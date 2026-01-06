'use client';

import { Portal, Select, Spinner, createListCollection } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useAsync } from 'react-use';
import { getGroupsWithDetails } from '@/app/actions/groups';

interface Group {
  id: string;
  name: string;
  description: string | null;
}

export default function GroupsPage() {
  const state = useAsync(async (): Promise<Group[]> => {
    const result = await getGroupsWithDetails();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.groups || [];
  }, []);

  const collection = useMemo(() => {
    return createListCollection({
      items: state.value ?? [],
      itemToString: (group) => group.name,
      itemToValue: (group) => group.id,
    });
  }, [state.value]);

  return (
    <Select.Root collection={collection} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select group</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select group" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {state.loading && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((group) => (
              <Select.Item item={group} key={group.id}>
                {group.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
