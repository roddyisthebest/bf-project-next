"use client";

import { usePathname } from "next/navigation";
import { routes } from "../../consts";
import Link from "next/link";

export function PostMenu() {
  const pathname = usePathname();

  const route = routes.find((route) =>
    route.subRoutes?.some((subRoute) => subRoute.href === pathname)
  );

  if (!route) {
    return <div></div>;
  }

  return (
    <div className="divide-y max-md:w-full divide-brand-100 w-56">
      <div className="py-8 max-md:py-4 flex items-center justify-center bg-primary-100 ">
        <h2 className="text-2xl max-md:text-lg font-semibold text-primary">
          {route.title}
        </h2>
      </div>
      <div className="flex flex-col max-md:flex-row max-md:gap-x-2 max-md:h-14 max-md:items-center max-md:px-4">
        {route.subRoutes?.map((subRoute, subRouteIdx) => (
          <Link
            key={subRouteIdx}
            href={subRoute.href}
            className={`p-4 transition text-neutral hover:bg-primary-50 hover:text-primary hover:font-semibold max-md:p-2 max-md:text-sm max-md:rounded-sm ${
              pathname === subRoute.href
                ? "bg-primary-50 font-semibold text-primary"
                : ""
            }`}
          >
            {subRoute.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
