"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Route, routes } from "@/app/(web)/(main)/consts";

export function NavigationMenuDemo() {
  const pathname = usePathname();

  const isActive = (route: Route) => {
    return pathname.startsWith(route.href);
  };

  return (
    <NavigationMenu viewport={false} className="z-[9999] max-md:hidden">
      <NavigationMenuList>
        {routes.map((route, idx) => (
          <NavigationMenuItem className="text-neutral" key={idx}>
            <NavigationMenuTrigger
              className={`bg-transparent transition-all duration-200 ${
                isActive(route)
                  ? "text-brand-600 bg-primary-50/50 font-medium  from-brand-50 to-brand-100/50 rounded-lg shadow-sm"
                  : ""
              }`}
            >
              {route.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  {route.subRoutes?.map((subRoute, subIdx) => (
                    <NavigationMenuLink key={subIdx} asChild>
                      {subRoute.absolutable ? (
                        <a
                          href={subRoute.href}
                          className={
                            pathname === subRoute.href
                              ? "text-brand-600 font-semibold"
                              : ""
                          }
                          target="_blank"
                        >
                          {subRoute.title}
                        </a>
                      ) : (
                        <Link
                          href={subRoute.href}
                          className={
                            pathname === subRoute.href
                              ? "text-brand-600 font-semibold"
                              : ""
                          }
                        >
                          {subRoute.title}
                        </Link>
                      )}
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
