"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminRoutes } from "../consts";

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>관리 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminRoutes.map((route) => {
                const isActive = pathname === route.url;

                return (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "group w-full justify-start gap-2  px-3 py-2 transition",
                        "hover:bg-muted/70",
                        isActive &&
                          "bg-gray-200 text-foreground shadow-sm ring-1 ring-border"
                      )}
                    >
                      <Link
                        href={route.url}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <route.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition",
                            isActive
                              ? "opacity-100"
                              : "opacity-70 group-hover:opacity-100"
                          )}
                        />
                        <span
                          className={cn(
                            "truncate",
                            isActive ? "font-bold" : "font-normal"
                          )}
                        >
                          {route.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
