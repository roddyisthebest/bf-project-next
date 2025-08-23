import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Book,
  BookOpen,
  Calendar,
  ChevronRight,
} from "lucide-react";
import RectangleButton from "./components/rectangle-button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { subRoutes, timeTable } from "./consts";

export default function WebPage() {
  return (
    <div className="border-brand-100 border-x min-h-[80vh]">
      <div className="bg-primary h-64"></div>
      <div
        className="
    grid max-md:grid-cols-1 grid-cols-4  max-md:divide-y max-md:divide-x-0 divide-x"
      >
        {subRoutes.map((route) => (
          <RectangleButton key={route.id} {...route} />
        ))}
      </div>

      <Separator className="border-brand-100" />
      <div className="grid grid-cols-[3fr_7fr] max-lg:grid-cols-[4fr_6fr]  divide-x divide-brand-100">
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <Label className="text-primary font-bold text-xl">MINISTOR</Label>
            <p className="text-neutral text-lg font-medium max-sm:flex max-sm:flex-col">
              담임목사 <strong className="text-black">이희동</strong>
            </p>
          </div>
          <div className="bg-neutral flex-1"></div>
        </div>
        <div className="p-5 flex flex-col gap-y-5 min-w-0">
          <div className="flex flex-col gap-y-1">
            <Label className="text-primary font-bold text-xl">SERMON</Label>
            <p className="text-neutral text-lg font-medium">주일예배</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-black font-bold text-5xl max-xl:text-4xl max-lg:text-3xl max-sm:text-xl truncate">
                이렇게 저렇게 해라
              </h1>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
                  <Calendar />
                  2025.08.12
                </Badge>
                <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
                  <Book />
                  사도행전 12:21
                </Badge>
              </div>
            </div>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/VIDEO_ID?rel=0`}
                title="YouTube video player"
                className="h-full w-full rounded-lg border border-brand-100"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </AspectRatio>
          </div>
        </div>
      </div>
      <Separator className="border-brand-100" />

      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:divide-y max-lg:divide-x-0 divide-x divide-brand-100">
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <Label className="text-primary font-bold text-xl">TIME TABLE</Label>
            <p className="text-neutral text-lg font-medium">예배시간 안내</p>
          </div>
          <div className="flex flex-col gap-y-2 divide-y divide-brand-100">
            {timeTable.map((time, idx) => (
              <div
                className="flex justify-between items-center text-lg! text-black font-bold pb-2"
                key={idx}
              >
                <Label className="text-lg font-bold max-sm:text-sm">
                  {time.title}
                </Label>
                <div className="text-lg max-sm:text-sm">{time.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <Label className="text-primary font-bold text-xl">
              THE WAY TO CHURCH
            </Label>
            <p className="text-neutral text-lg font-medium">오시는길</p>
          </div>
          <div className="bg-neutral flex-1 max-lg:min-h-96"></div>
        </div>
      </div>
      <Separator className="border-brand-100" />
    </div>
  );
}
