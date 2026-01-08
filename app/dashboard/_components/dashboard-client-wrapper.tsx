'use client';

import { ReactNode } from 'react';
import { AppSidebar } from './sidebar/app-sidebar';
import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@DonaldNgai/chakra-ui';
import { cn } from '@DonaldNgai/chakra-ui';
import { Toaster } from '@DonaldNgai/chakra-ui';
import { PreferencesStoreProvider } from '@DonaldNgai/chakra-ui/stores';
import type { ThemeMode, ThemePreset } from '@DonaldNgai/next-utils';
import type {
  SidebarVariant,
  SidebarCollapsible,
  ContentLayout,
  NavbarStyle,
} from '@DonaldNgai/next-utils';

type DashboardClientWrapperProps = {
  children: ReactNode;
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  defaultOpen: boolean;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  contentLayout: ContentLayout;
  navbarStyle: NavbarStyle;
};

export function DashboardClientWrapper({
  children,
  themeMode,
  themePreset,
  defaultOpen,
  sidebarVariant,
  sidebarCollapsible,
  contentLayout,
  navbarStyle,
}: DashboardClientWrapperProps) {
  return (
    <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Toaster />
        <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
        <SidebarInset
          data-content-layout={contentLayout}
          className={cn(
            'data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl',
            // Adds right margin for inset sidebar in centered layout up to 113rem.
            // On wider screens with collapsed sidebar, removes margin and sets margin auto for alignment.
            'max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto'
          )}
        >
          <header
            data-navbar-style={navbarStyle}
            className={cn(
              'flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
              // Handle sticky navbar style with conditional classes so blur, background, z-index, and rounded corners remain consistent across all SidebarVariant layouts.
              'data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md'
            )}
          >
            <div className="flex w-full items-center justify-between pl-4 pr-2 lg:pl-6 lg:pr-4">
              <div className="flex items-center gap-1 lg:gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
                {/* <SearchDialog /> */}
              </div>
              <div className="flex items-center gap-2">
                {/* <LayoutControls {...layoutPreferences} /> */}
                {/* <ThemeSwitcher /> */}
                
              </div>
            </div>
          </header>
          <div className="h-full p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </PreferencesStoreProvider>
  );
}

