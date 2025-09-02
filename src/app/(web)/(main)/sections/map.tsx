"use client";

import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function MapSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.kakao) return;
    const kakao = window.kakao;
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      const position = new kakao.maps.LatLng(37.05175, 127.0639); // 교회 위치 좌표
      const options = {
        center: position,
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);

      // 🟢 마커 생성
      const marker = new kakao.maps.Marker({
        position, // 위에서 만든 LatLng 좌표
      });

      // 지도에 마커 표시
      marker.setMap(map);
    });
  }, []);

  return (
    <div className="p-5 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        <Label className="text-primary font-bold text-xl">
          THE WAY TO CHURCH
        </Label>
        <p className="text-neutral text-lg font-medium">오시는길</p>
      </div>
      <div className=" flex-1 max-lg:min-h-96">
        <div
          id="map"
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg border"
        />
      </div>
    </div>
  );
}
