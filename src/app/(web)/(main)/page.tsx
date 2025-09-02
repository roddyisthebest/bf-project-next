import { Separator } from "@/components/ui/separator";

import RectangleButton from "./components/rectangle-button";
import { Label } from "@/components/ui/label";
import { subRoutes, timeTable } from "./consts";
import Image from "next/image";
import SermonSection from "./sections/sermon";
import MapSection from "./sections/map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "큰숲교회 - 세상을 향한 산소같은 교회",
  description:
    "숲속에 드러나는 십자가, 복음의 능력으로 전도·훈련·사역·선교·예배를 통해 아름다운 세상을 향한 산소를 공급하는 큰숲교회입니다.",
  keywords:
    "큰숲교회, 십자가, 복음, 전도, 훈련, 사역, 선교, 예배, 회복, 쉼, 이희동 목사, 기독교회, 평택, 장당동, 평택교회",
  openGraph: {
    title: "큰숲교회 - 세상을 향한 산소같은 교회",
    description:
      "숲속에 드러나는 십자가, 복음의 능력으로 민족과 세대와 열방 가운데 산소같은 교회",
    type: "website",
    locale: "ko_KR",
    siteName: "큰숲교회",
  },
  twitter: {
    card: "summary_large_image",
    title: "큰숲교회 - 세상을 향한 산소같은 교회",
    description:
      "숲속에 드러나는 십자가, 복음의 능력으로 민족과 세대와 열방 가운데 산소같은 교회",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function WebPage() {
  return (
    <div className="border-brand-100 border-x min-h-[80vh]">
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
          <div className="relative flex-1">
            <Image
              src="/pastor.jpeg"
              alt="배경"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <SermonSection />
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
        <MapSection />
      </div>
      <Separator className="border-brand-100" />
    </div>
  );
}
