"use client";

import { Label } from "@/components/ui/label";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapSection() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return;
      if (!window.kakao) return;

      const kakao = window.kakao;
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
