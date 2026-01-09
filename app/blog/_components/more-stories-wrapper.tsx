import { Suspense } from 'react';
import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardRoot as Card, CardBody as CardContent, CardHeader } from '@chakra-ui/react';
import { sanityFetch, moreStoriesQuery } from '@DonaldNgai/next-utils/sanity';
import type { MoreStoriesQueryResult } from '@DonaldNgai/next-utils/sanity';
import { MoreStories } from '@DonaldNgai/chakra-ui/blog';

interface MoreStoriesWrapperProps {
  skip: string;
  limit?: number;
}

async function MoreStoriesContent({ skip, limit = 3 }: MoreStoriesWrapperProps) {
  const posts = await sanityFetch({
    query: moreStoriesQuery,
    params: { skip, limit },
  }) as MoreStoriesQueryResult;

  return <MoreStories posts={posts} />;
}

export function MoreStoriesWrapper(props: MoreStoriesWrapperProps) {
  return (
    <Suspense
      fallback={
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {[1, 2, 3].map((i) => (
            <Card key={i} height="full">
              <Skeleton height="48" />
              <CardHeader>
                <Skeleton height="6" mb="2" />
                <Skeleton height="4" width="24" />
              </CardHeader>
              <CardContent>
                <Skeleton height="4" mb="2" />
                <Skeleton height="4" mb="2" />
                <Skeleton height="4" width="3/4" />
              </CardContent>
            </Card>
          ))}
        </SimpleGrid>
      }
    >
      <MoreStoriesContent {...props} />
    </Suspense>
  );
}
