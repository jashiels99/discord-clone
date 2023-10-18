import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ThemeProvider from '@/components/providers/theme-provider';
import ModalProvider from '@/components/providers/modal-provider';
import SocketProvider from '@/components/providers/socket-provider';
import QueryProvider from '@/components/providers/query-provider';

const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Discord Clone',
    description: 'Discord clone by Joe Shiels',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={poppins.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={true}
                        storageKey={'discord-clone-theme'}
                    >
                        <SocketProvider>
                            <ModalProvider />
                            <QueryProvider>{children}</QueryProvider>
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
