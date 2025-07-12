import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster"
import { Sun, Settings, LayoutDashboard, LogOut, ListCollapse } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'SolarisEye',
  description: 'Intelligent Solar Monitoring & Cooling System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border">
                <SidebarHeader className="p-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                      <Sun className="h-6 w-6" />
                    </Button>
                    <span className="font-bold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                      SolarisEye
                    </span>
                  </Link>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton href="/" asChild tooltip="Dashboard">
                        <Link href="/">
                          <LayoutDashboard />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton href="/activity" asChild tooltip="Activity">
                        <Link href="/activity">
                          <ListCollapse />
                          <span>Activity</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton href="/settings" asChild tooltip="Settings">
                        <Link href="/settings">
                          <Settings />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className="p-4 flex flex-row items-center gap-4 justify-between group-data-[collapsible=icon]:flex-col">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                      <span className="font-semibold text-sm text-sidebar-foreground">User</span>
                      <span className="text-xs text-sidebar-foreground/70">user@solaris.com</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </SidebarFooter>
              </Sidebar>

              <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="flex-1 text-xl font-semibold">Dashboard</h1>
                </header>
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
