"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { routes } from "@/app/(web)/(main)/consts";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false} className="z-[9999] max-md:hidden">
      <NavigationMenuList>
        {routes.map((route, idx) => (
          <NavigationMenuItem className="text-neutral" key={idx}>
            <NavigationMenuTrigger className="bg-transparent">
              {route.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  {route.subRoutes?.map((subRoute, subIdx) => (
                    <NavigationMenuLink key={subIdx} asChild>
                      <Link href={subRoute.href}>{subRoute.title}</Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
