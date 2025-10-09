import { Separator } from "@/components/ui/separator";

import RectangleButton from "./components/rectangle-button";
import { Label } from "@/components/ui/label";
import { subRoutes, timeTable } from "./consts";
import Image from "next/image";
import SermonSection from "./sections/sermon";
import MapSection from "./sections/map";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
      {/* Hero Section with Logo */}
      <ScrollReveal>
        <div className="relative bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 py-4 px-6 overflow-hidden">
          {/* Flying Leaves */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-2 -left-8 w-2 h-2 bg-green-400 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-2s" }}
            ></div>
            <div
              className="absolute top-8 -left-12 w-2 h-2 bg-emerald-500 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-1.5s" }}
            ></div>
            <div
              className="absolute top-4 -left-16 w-2 h-2 bg-teal-400 opacity-70 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-1s" }}
            ></div>
            <div
              className="absolute top-12 -left-4 w-2 h-2 bg-green-300 opacity-40 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-0.5s" }}
            ></div>
            <div
              className="absolute top-6 -left-20 w-2 h-2 bg-emerald-400 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-10 -left-24 w-2 h-2 bg-green-500 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-3s" }}
            ></div>
            <div
              className="absolute top-3 -left-28 w-2 h-2 bg-teal-500 opacity-45 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-2.5s" }}
            ></div>
            <div
              className="absolute top-14 -left-6 w-2 h-2 bg-green-600 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-4s" }}
            ></div>
            <div
              className="absolute top-7 -left-32 w-2 h-2 bg-emerald-300 opacity-65 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-3.5s" }}
            ></div>
            <div
              className="absolute top-11 -left-10 w-2 h-2 bg-green-400 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-4.5s" }}
            ></div>
            <div
              className="absolute top-5 -left-14 w-2 h-2 bg-teal-300 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-5s" }}
            ></div>
            <div
              className="absolute top-9 -left-18 w-2 h-2 bg-green-200 opacity-45 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-5.5s" }}
            ></div>
            <div
              className="absolute top-13 -left-22 w-2 h-2 bg-emerald-600 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-6s" }}
            ></div>
            <div
              className="absolute top-1 -left-26 w-2 h-2 bg-green-700 opacity-40 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-6.5s" }}
            ></div>
            <div
              className="absolute top-15 -left-30 w-2 h-2 bg-teal-600 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-7s" }}
            ></div>
            <div
              className="absolute bottom-2 -left-8 w-2 h-2 bg-green-500 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-1.2s" }}
            ></div>
            <div
              className="absolute bottom-6 -left-16 w-2 h-2 bg-emerald-400 opacity-45 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-2.8s" }}
            ></div>
            <div
              className="absolute bottom-10 -left-12 w-2 h-2 bg-teal-500 opacity-65 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-4.2s" }}
            ></div>
            <div
              className="absolute bottom-4 -left-20 w-2 h-2 bg-green-300 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-3.2s" }}
            ></div>
            <div
              className="absolute bottom-8 -left-24 w-2 h-2 bg-emerald-600 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-5.8s" }}
            ></div>
            <div
              className="absolute bottom-12 -left-28 w-2 h-2 bg-teal-400 opacity-40 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-7.2s" }}
            ></div>
            <div
              className="absolute bottom-3 -left-32 w-2 h-2 bg-green-600 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-0.8s" }}
            ></div>
            <div
              className="absolute bottom-7 -left-36 w-2 h-2 bg-emerald-300 opacity-45 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-6.5s" }}
            ></div>
            <div
              className="absolute bottom-11 -left-40 w-2 h-2 bg-teal-600 opacity-65 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-3.8s" }}
            ></div>
            <div
              className="absolute bottom-5 -left-44 w-2 h-2 bg-green-400 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-2.2s" }}
            ></div>
            <div
              className="absolute bottom-9 -left-48 w-2 h-2 bg-emerald-500 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-4.8s" }}
            ></div>
            <div
              className="absolute bottom-1 -left-52 w-2 h-2 bg-teal-300 opacity-40 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-6.8s" }}
            ></div>
            <div
              className="absolute top-1/2 -left-10 w-2 h-2 bg-green-400 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-1.8s" }}
            ></div>
            <div
              className="absolute top-[45%] -left-14 w-2 h-2 bg-emerald-400 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-3.4s" }}
            ></div>
            <div
              className="absolute top-[55%] -left-18 w-2 h-2 bg-teal-500 opacity-60 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-5.1s" }}
            ></div>
            <div
              className="absolute top-[40%] -left-22 w-2 h-2 bg-green-300 opacity-45 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-2.7s" }}
            ></div>
            <div
              className="absolute top-[60%] -left-26 w-2 h-2 bg-emerald-600 opacity-65 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-4.3s" }}
            ></div>
            <div
              className="absolute top-[35%] -left-30 w-2 h-2 bg-teal-400 opacity-40 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-6.1s" }}
            ></div>
            <div
              className="absolute top-[65%] -left-34 w-2 h-2 bg-green-500 opacity-55 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-0.9s" }}
            ></div>
            <div
              className="absolute top-[50%] -left-38 w-2 h-2 bg-emerald-300 opacity-50 animate-fly-leaves leaf-shape"
              style={{ animationDelay: "-7.5s" }}
            ></div>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal delay={200}>
              <div className="flex justify-center">
                <div className="w-48 h-48 md:w-56 md:h-56 relative">
                  <Image
                    src="/logo_transparent.png"
                    alt="큰숲교회 로고"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      <Separator className="border-brand-100" />

      {/* Quick Navigation */}
      <ScrollReveal>
        <div className="grid max-md:grid-cols-1 grid-cols-4 max-md:divide-y max-md:divide-x-0 divide-x">
          {subRoutes.map((route, index) => (
            <ScrollReveal key={route.id} delay={index * 100}>
              <RectangleButton {...route} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <Separator className="border-brand-100" />

      {/* Pastor & Sermon Section */}
      <ScrollReveal>
        <div className="grid grid-cols-[3fr_7fr] max-lg:grid-cols-[4fr_6fr] divide-x divide-brand-100 min-h-[500px]">
          <ScrollReveal direction="left">
            <div className="p-5 flex flex-col gap-y-5 h-full">
              <div className="flex flex-col gap-y-1">
                <Label className="text-primary font-bold text-xl">
                  MINISTOR
                </Label>
                <p className="text-neutral text-lg font-medium max-sm:flex max-sm:flex-col">
                  담임목사 <strong className="text-black">이희동</strong>
                </p>
              </div>
              <div className="relative flex-1 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/pastor.jpeg"
                  alt="이희동 목사"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SermonSection />
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <Separator className="border-brand-100" />

      {/* Time Table & Map Section */}
      <ScrollReveal>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:divide-y max-lg:divide-x-0 divide-x divide-brand-100">
          <ScrollReveal direction="left">
            <div className="p-5 flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-1">
                <Label className="text-primary font-bold text-xl">
                  TIME TABLE
                </Label>
                <p className="text-neutral text-lg font-medium">
                  예배시간 안내
                </p>
              </div>
              <div className="flex flex-col gap-y-2 divide-y divide-brand-100">
                {timeTable.map((time, idx) => (
                  <ScrollReveal key={idx} delay={idx * 100}>
                    <div className="flex justify-between items-center text-lg! text-black font-bold pb-2 hover:bg-emerald-50 transition-colors duration-200 rounded px-2">
                      <Label className="text-lg font-bold max-sm:text-sm">
                        {time.title}
                      </Label>
                      <div className="text-lg max-sm:text-sm">
                        {time.content}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <MapSection />
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <Separator className="border-brand-100" />
    </div>
  );
}
