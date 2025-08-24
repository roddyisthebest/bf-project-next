import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { routes } from "../../../consts";
import Link from "next/link";

export function MobileNavigationMenu() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4"
      //   defaultValue="item-1"
    >
      {routes.map((route, mainRouteIdx) => (
        <AccordionItem value={`${mainRouteIdx}`} key={mainRouteIdx}>
          <AccordionTrigger className="text-neutral">
            {route.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance bg-primary-50/80 p-4 rounded-t-md">
            {route.subRoutes?.map((subRoute, subRouteIdx) => (
              <Link
                key={subRouteIdx}
                href={subRoute.href}
                className="text-emerald-800 hover:underline"
              >
                {subRoute.title}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
