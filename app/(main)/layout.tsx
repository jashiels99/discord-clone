import NavigationSidebar from '@/components/navigation/navigation-sidebar';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <div className="hidden md:!flex flex-col h-full w-[72px] z-30 fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[4.5rem] h-full">{children}</main>
        </div>
    );
}
