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
    <div className="divide-y divide-brand-100 ">
      <div className="h-24 flex items-center justify-center bg-primary-100">
        <h2 className="text-2xl font-semibold text-primary">{route.title}</h2>
      </div>
      <div className="flex flex-col">
        {route.subRoutes?.map((subRoute, subRouteIdx) => (
          <Link
            key={subRouteIdx}
            href={subRoute.href}
            className={`p-4 transition text-neutral hover:bg-primary-50 hover:text-primary hover:font-semibold ${
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
