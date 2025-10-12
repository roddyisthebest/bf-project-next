"use client";

import { usePathname } from "next/navigation";
import { routes } from "../../consts";
import Link from "next/link";

export function PostMenu() {
  const pathname = usePathname();

  const route = routes.find((route) => pathname.startsWith(route.href));

  if (!route) {
    return <div></div>;
  }

  return (
    <div className="divide-y max-lg:w-full divide-gray-200 w-56 min-w-56 ">
      <div className="py-8 max-lg:hidden flex items-center justify-center bg-primary-100 ">
        <h2 className="text-2xl max-lg:text-lg font-bold text-primary">
          {route.title}
        </h2>
      </div>
      <div className="flex flex-col max-lg:flex-row max-lg:overflow-x-auto max-lg:py-2 max-lg:px-4 max-lg:gap-x-1 max-lg:scrollbar-hide max-lg:scroll-smooth">
        {route.subRoutes?.map((subRoute, subRouteIdx) =>
          subRoute.absolutable ? (
            <a
              className="p-4 transition text-neutral hover:bg-primary-50 hover:text-primary hover:font-semibold max-lg:px-4 max-lg:py-3 max-lg:text-sm max-lg:rounded-lg max-lg:whitespace-nowrap max-lg:min-w-fit"
              href={subRoute.href}
              target="_blank"
              key={subRouteIdx}
            >
              {subRoute.title}
            </a>
          ) : (
            <Link
              key={subRouteIdx}
              href={subRoute.href}
              className={`p-4 transition text-neutral hover:bg-primary-50 hover:text-primary hover:font-semibold max-lg:px-4 max-lg:py-3 max-lg:text-sm max-lg:rounded-lg max-lg:whitespace-nowrap max-lg:min-w-fit ${
                pathname === subRoute.href ||
                (subRoute.href.split("/")[2] &&
                  pathname.split("/")[2] &&
                  subRoute.href.split("/")[2] === pathname.split("/")[2])
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
          )
        )}
      </div>
    </div>
  );
}
