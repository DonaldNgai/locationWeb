import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@chakra-ui/react';
import { sanityFetch, settingsQuery } from '@DonaldNgai/next-utils/sanity';
import { resolveOpenGraphImage } from '@DonaldNgai/next-utils/sanity/client-utils';

// Simple utility to convert PortableText to plain text
function toPlainText(blocks: any[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text || '').join('');
    })
    .join('\n\n');
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title;
  const description = settings?.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title ?? 'Default Title'}`,
      default: title ?? 'Default Title',
    },
    description: toPlainText(description ?? []),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen py-8">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        {children}
      </Container>
    </section>
  );
}
