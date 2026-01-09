'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@DonaldNgai/chakra-ui';
import { APP_CONFIG } from '@/config/app-config';
import { User } from '@DonaldNgai/next-utils/auth/users';
import useSWR from 'swr';
import { NavUser } from './nav-user';
import { getCurrentUser } from '@/app/actions/auth';
import {
  LayoutDashboard,
  Key,
  BarChart3,
  FileText,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

const navigation: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { title: 'Usage & Analytics', url: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'API Documentation', url: '/dashboard/docs', icon: FileText },
      { title: 'Groups', url: '/dashboard/groups', icon: Users },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: user } = useSWR<User | null>(
    'current-user',
    getCurrentUser
  );

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(url);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-[slot=sidebar-menu-button]:!p-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                <img
                  src="/logo.svg"
                  alt={APP_CONFIG.name}
                  className="h-6 w-auto group-data-[collapsible=icon]:hidden"
                />
                <img
                  src="/logo-icon.png"
                  alt={APP_CONFIG.name}
                  className="h-7 w-auto hidden group-data-[collapsible=icon]:block"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        {navigation.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex} className="mb-6 last:mb-0">
            {section.label && (
              <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
                        className="w-full justify-start gap-3 px-3 py-2.5"
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <NavUser users={user ? [user] : []} />
      </SidebarFooter>
    </Sidebar>
  );
}
