"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Car, Bus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { locationCoordinate, churchInfo } from "../../../consts";

export default function LocationPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.kakao) return;
    const kakao = window.kakao;
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      const position = new kakao.maps.LatLng(locationCoordinate.x, locationCoordinate.y);
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
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(churchInfo.address);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          큰숲교회로 오시는 길을 안내해드립니다. 궁금한 사항이 있으시면 언제든지
          연락해 주세요.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* 지도 */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              교회 위치
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96">
              <div
                id="map"
                style={{ width: "100%", height: "100%" }}
                className="rounded-b-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* 주소 및 연락처 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                교회 주소
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-lg font-semibold text-gray-900">
                  {churchInfo.address}
                </div>
                <div className="text-sm text-gray-600">{churchInfo.name} ({churchInfo.floor})</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAddress}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  주소 복사
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                연락처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-gray-900">
                  {churchInfo.phone}
                </div>
                <div className="text-sm text-gray-600">
                  평일 오전 9시 ~ 오후 6시
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 교통편 안내 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              자가용 이용시
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">주차 안내</h4>
              <p className="text-sm text-gray-600">
                교회 전용 주차장을 이용하실 수 있습니다. 주차 공간이 부족할 경우
                인근 공영주차장을 이용해 주세요.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">네비게이션</h4>
              <p className="text-sm text-gray-600">
                &quot;{churchInfo.name}&quot; 또는 &quot;{churchInfo.address}&quot;로 검색하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              대중교통 이용시
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">버스 이용</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">1번</Badge>
                <Badge variant="outline">5번</Badge>
                <Badge variant="outline">7번</Badge>
              </div>
              <p className="text-sm text-gray-600">
                장당동 정류장 하차 후 도보 5분
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">지하철</h4>
              <p className="text-sm text-gray-600">
                평택역에서 버스 환승 또는 택시 이용 (약 10분 소요)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
