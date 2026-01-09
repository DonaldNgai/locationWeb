import React, { Suspense } from 'react';
import { defineQuery } from 'next-sanity';
import type { Metadata, ResolvingMetadata } from 'next';
// PortableTextBlock type - using any to avoid dependency issues
type PortableTextBlock = any;
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Heading, Text, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Separator } from '@DonaldNgai/chakra-ui';
import { CardRoot as Card, CardBody as CardContent, CardHeader } from '@chakra-ui/react';
import { sanityFetch, postQuery, settingsQuery } from '@DonaldNgai/next-utils/sanity';
import { resolveOpenGraphImage } from '@DonaldNgai/next-utils/sanity/client-utils';
import type { PostQueryResult } from '@DonaldNgai/next-utils/sanity';
import {
  Avatar,
  CoverImage,
  DateComponent,
  PortableText,
} from '@DonaldNgai/chakra-ui/blog';
import { MoreStoriesWrapper } from '../../_components/more-stories-wrapper';

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: 'published',
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch({
    query: postQuery,
    params: { slug },
    stega: false,
  }) as PostQueryResult;
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params: { slug } }) as Promise<PostQueryResult>,
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Heading as="h2" size="2xl" mb="8">
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Text
            as="span"
            _hover={{ textDecoration: 'underline' }}
            color="blue.600"
            className="dark:text-blue-400"
          >
            {settings?.title}
          </Text>
        </Link>
      </Heading>
      <Box as="article">
        <Heading as="h1" size="4xl" mb="6" fontWeight="bold">
          {post.title}
        </Heading>

        <Box mb="6">
          <CoverImage image={post.coverImage} priority />
        </Box>

        <Box maxW="3xl" mx="auto">
          <Box
            display={{ base: 'none', md: 'flex' }}
            justifyContent="space-between"
            alignItems="center"
            mb="6"
          >
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
            <Box ml="4" flexGrow="1" textAlign="right">
              <DateComponent dateString={post.date} />
            </Box>
          </Box>
          <Box display={{ base: 'block', md: 'none' }} mb="6">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </Box>
        </Box>

        {post.content?.length && (
          <PortableText
            className="mx-auto max-w-3xl"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </Box>
      <Box as="aside" mt="12">
        <Separator mb="8" />
        <Heading as="h2" size="2xl" mb="6">
          Recent Stories
        </Heading>
        <MoreStoriesWrapper skip={post._id} limit={2} />
      </Box>
    </div>
  );
}
