import { Suspense } from 'react';

export const metadata = {
  title: 'Sign In | MemeForge',
  description: 'Sign in to MemeForge to create viral meme posts',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
