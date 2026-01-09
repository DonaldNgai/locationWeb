import React, { Suspense } from 'react';
import { Container, Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { CardRoot as Card, CardBody as CardContent, CardHeader } from '@chakra-ui/react';
import { sanityFetch, heroQuery, settingsQuery } from '@DonaldNgai/next-utils/sanity';
import type { HeroQueryResult } from '@DonaldNgai/next-utils/sanity';
import {
  BlogIntro,
  CoverImage,
  Avatar,
  DateComponent,
  PortableText,
} from '@DonaldNgai/chakra-ui/blog';
import { MoreStoriesWrapper } from './_components/more-stories-wrapper';
import Link from 'next/link';

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Pick<
  Exclude<HeroQueryResult, null>,
  'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'
>) {
  return (
    <Card mb="8">
      <Link href={`/blog/posts/${slug}`} style={{ display: 'block' }}>
        <CoverImage image={coverImage} priority={false} />
      </Link>
      <CardHeader>
        <Heading as="h3" size="lg" mb="2">
          <Link href={`/blog/posts/${slug}`} style={{ textDecoration: 'none' }}>
            {title}
          </Link>
        </Heading>
        <DateComponent dateString={date} />
      </CardHeader>
      <CardContent>
        {excerpt && (
          <Box as="p" mb="4" color="fg.muted">
            {excerpt}
          </Box>
        )}
        {author && <Avatar name={author.name} picture={author.picture} />}
      </CardContent>
    </Card>
  );
}

export default async function BlogPage() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
      <BlogIntro title={settings?.title} description={settings?.description} />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
        />
      )}
      {heroPost?._id && (
        <Box mt="8">
          <Heading as="h2" size="2xl" mb="6">
            More Stories
          </Heading>
          <MoreStoriesWrapper skip={heroPost._id} limit={100} />
        </Box>
      )}
    </Container>
  );
}
