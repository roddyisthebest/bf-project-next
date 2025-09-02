"use client";

import { usePathname } from "next/navigation";
import { routes } from "../../consts";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PostHeader() {
  const pathname = usePathname();

  const route = routes.find((route) =>
    route.subRoutes?.some((subRoute) => subRoute.href === pathname)
  );

  if (!route) {
    return <div></div>;
  }

  const subRoute = route.subRoutes?.find(
    (subRoute) => subRoute.href === pathname
  );

  return (
    <div className="border-b border-gray-200 py-6 px-8 flex flex-col gap-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={route.href}>{route.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {subRoute && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={subRoute.href}>{subRoute.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold text-black">
        {subRoute?.title || route.title}
      </h1>
    </div>
  );
}
