"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { routes } from "../../consts";
import Link from "next/link";

export function PostMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const route = routes.find(
    (route) => pathname.startsWith(route.href)
    // route.subRoutes?.some((subRoute) => subRoute.href === pathname)
  );

  if (!route) {
    return <div></div>;
  }

  return (
    <div className="divide-y max-lg:w-full divide-brand-100 w-56 min-w-56">
      <div className="py-8 max-lg:py-4 flex items-center justify-center bg-primary-100 ">
        <h2 className="text-2xl max-lg:text-lg font-semibold text-primary">
          {route.title}
        </h2>
      </div>
      <div className="flex flex-col max-lg:flex-row max-lg:gap-x-2 max-lg:h-14 max-lg:items-center max-lg:px-4">
        {route.subRoutes?.map((subRoute, subRouteIdx) => (
          <Link
            key={subRouteIdx}
            href={subRoute.href}
            className={`p-4 transition text-neutral hover:bg-primary-50 hover:text-primary hover:font-semibold max-lg:p-2 max-lg:text-sm max-lg:rounded-sm ${
              pathname === subRoute.href
                ? "bg-primary-50 font-semibold text-primary"
                : ""
            }`}

            // /chaples
            // /chaples/7/detail

            // /chaples/wednesday
            // /chaples/friday
          >
            {subRoute.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
