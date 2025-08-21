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

interface Route {
  title: string;
  href: string;
  subRoutes?: Route[];
}
const routes: Route[] = [
  {
    title: "교회소개",
    href: "",
    subRoutes: [
      {
        title: "인사말",
        href: "/about",
      },
      {
        title: "예배안내",
        href: "/about/worship",
      },
      {
        title: "오시는길",
        href: "/about/location",
      },
    ],
  },
  {
    title: "예배",
    href: "",
    subRoutes: [
      {
        title: "주일예배",
        href: "/chaple",
      },
      {
        title: "수요예배",
        href: "/chaple/wednesday",
      },
      {
        title: "금요기도회",
        href: "/chaple/friday",
      },
    ],
  },
  {
    title: "교육/양육",
    href: "",
    subRoutes: [
      {
        title: "새가족반",
        href: "/education",
      },
      {
        title: "제자반",
        href: "/education/discipleship",
      },
    ],
  },
  {
    title: "다음세대",
    href: "",
    subRoutes: [
      {
        title: "유아유초등부",
        href: "/generation",
      },
      {
        title: "중고등부",
        href: "/generation/teenagers",
      },
      {
        title: "청년1부",
        href: "/generation/young-adults",
      },
      {
        title: "청년2부",
        href: "/generation/young-adults-2",
      },
      {
        title: "장년부",
        href: "/generation/adults",
      },
    ],
  },
  {
    title: "선교",
    href: "/",
    subRoutes: [
      {
        title: "국내선교",
        href: "/missions",
      },
      {
        title: "해외선교",
        href: "/missions/international",
      },
    ],
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {routes.map((route, idx) => (
          <NavigationMenuItem className="text-neutral" key={idx}>
            <NavigationMenuTrigger className="bg-transparent">
              {route.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
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
