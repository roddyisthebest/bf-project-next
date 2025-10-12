import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DialogClose } from "@/components/ui/dialog";
import { Route, routes } from "../../../consts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavigationMenu() {
  const pathname = usePathname();

  const isActive = (route: Route) => {
    return (
      route.subRoutes?.some((sub: Route) => pathname === sub.href) ||
      pathname.startsWith(route.href)
    );
  };

  const getDefaultValue = () => {
    const activeRouteIndex = routes.findIndex((route) => isActive(route));
    return activeRouteIndex !== -1 ? `${activeRouteIndex}` : undefined;
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4"
      defaultValue={getDefaultValue()}
    >
      {routes.map((route, mainRouteIdx) =>
        route.absolutable ? (
          <AccordionItem
            key={mainRouteIdx}
            value={`${mainRouteIdx}`}
            className="py-4"
          >
            <a
              key={mainRouteIdx}
              target="_blank"
              href={route.href}
              className="text-sm hover:underline flex items-center gap-1"
            >
              {route.title.includes("네이버") && (
                <span className="w-4 h-4 bg-green-500 text-white text-xs font-bold rounded flex items-center justify-center">
                  N
                </span>
              )}
              {route.title}
            </a>
          </AccordionItem>
        ) : (
          <AccordionItem value={`${mainRouteIdx}`} key={mainRouteIdx}>
            <AccordionTrigger
              className={`text-neutral ${
                isActive(route) ? "text-brand-600 font-semibold" : ""
              }`}
            >
              {route.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-primary-50/80 p-4 rounded-t-md">
              {route.subRoutes?.map((subRoute, subRouteIdx) => (
                <DialogClose key={subRouteIdx} asChild>
                  {subRoute.absolutable ? (
                    <a
                      href={subRoute.href}
                      className={`text-emerald-800 hover:underline ${
                        pathname === subRoute.href
                          ? "font-semibold text-brand-600"
                          : ""
                      }`}
                      target="_blank"
                    >
                      {subRoute.title}
                    </a>
                  ) : (
                    <Link
                      href={subRoute.href}
                      className={`text-emerald-800 hover:underline ${
                        pathname === subRoute.href
                          ? "font-semibold text-brand-600"
                          : ""
                      }`}
                    >
                      {subRoute.title}
                    </Link>
                  )}
                </DialogClose>
              ))}
            </AccordionContent>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}
