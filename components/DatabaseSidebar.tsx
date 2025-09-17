"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Databases as DatabaseComponent } from "@/components/Databases";

export function DatabaseSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Databases</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <DatabaseComponent />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full h-screen p-2">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
