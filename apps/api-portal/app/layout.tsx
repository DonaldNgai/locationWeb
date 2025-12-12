import './globals.css';
import type { Metadata } from 'next';
import { Auth0Provider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: 'Location API Portal',
  description: 'Manage your location tracking API keys and usage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}

