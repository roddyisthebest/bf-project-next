"use client";

import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function MapSection() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).kakao) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kakao = (window as any).kakao;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const position = new kakao.maps.LatLng(37.05175, 127.0639);
        const options = {
          center: position,
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const marker = new kakao.maps.Marker({
          position,
        });

        marker.setMap(map);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-5 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        <Label className="text-primary font-bold text-xl">
          THE WAY TO CHURCH
        </Label>
        <p className="text-neutral text-lg font-medium">오시는길</p>
      </div>
      <div className="flex-1 max-lg:min-h-96  ">
        <div
          id="map"
          className="rounded-lg border bg-gray-100 flex flex-1 min-h-[300px]"
        />
      </div>
    </div>
  );
}
