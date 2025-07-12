import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster"
import { Settings, LayoutDashboard, LogOut, ListCollapse } from 'lucide-react';
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
                    <Image 
                      src="https://i.ibb.co/rRttXwph/Solar-Shield-official-logo-for-app.png" 
                      alt="SolarisEye Logo" 
                      width={150} 
                      height={40} 
                      className="w-auto h-12 group-data-[collapsible=icon]:h-14 animate-pulse-slow"
                    />
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
                <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="md:hidden" />
                        <Link href="/" className="md:hidden">
                            <Image
                                src="https://i.ibb.co/rRttXwph/Solar-Shield-official-logo-for-app.png"
                                alt="SolarisEye Logo"
                                width={120}
                                height={32}
                                className="h-10 w-auto animate-pulse-slow"
                            />
                        </Link>
                    </div>
                    <h1 className="hidden flex-1 text-base font-semibold sm:text-xl md:block">Dashboard</h1>
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
