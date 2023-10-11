import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavigationSidebar from '@/components/navigation/navigation-sidebar';
import ServerSiderbar from '@/components/server/server-sidebar';

export default function MobileToggle({ serverId }: { serverId: string }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex gap-0 p-0">
                <div className="w-[4.5rem]">
                    <NavigationSidebar />
                </div>
                <ServerSiderbar serverId={serverId} />
            </SheetContent>
        </Sheet>
    );
}
