'use client';

import Script from 'next/script';
import { Box } from '@chakra-ui/react';

interface JotFormProps {
  formId: string;
  title?: string;
  urlParams?: Record<string, string>;
  height?: string;
}

export function JotForm({ formId, title = 'Form', urlParams, height = '85vh' }: JotFormProps) {
  // Build the URL with query parameters if provided
  const baseUrl = `https://form.jotform.com/${formId}`;
  const queryString = urlParams ? '?' + new URLSearchParams(urlParams).toString() : '';
  const formUrl = baseUrl + queryString;

  // Generate unique IDs for this form instance
  const iframeId = `JotFormIFrame-${formId}`;
  const scriptId = `jotform-handler-${formId}`;

  return (
    <>
      <Box className="@container/main" h="full" minH="80vh">
        <Box w="full" h="full">
          <Box
            as="iframe"
            id={iframeId}
            title={title}
            onLoad={() => window.parent.scrollTo(0, 0)}
            w="100%"
            h={height}
            border="none"
            {...({
              allow: 'geolocation; microphone; camera; fullscreen; payment',
              frameBorder: 0,
              scrolling: 'auto',
              src: formUrl,
            } as any)}
          />
        </Box>
      </Box>

      <Script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js" />
      <Script id={scriptId}>
        {`window.jotformEmbedHandler("iframe[id='${iframeId}']", "https://form.jotform.com/")`}
      </Script>
    </>
  );
}
