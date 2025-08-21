"use client";

import {
  Calendar,
  Database,
  Home,
  Inbox,
  NotebookPen,
  PodcastIcon,
  Search,
  Settings,
  Type,
  User,
} from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Stereos",
    url: "/admin/stereos",
    icon: Database,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: NotebookPen,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
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
                        href={item.url}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon
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
                          {item.title}
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
