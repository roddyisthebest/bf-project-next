import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  MapPin,
  Users,
  Music,
  MessageCircle,
  Heart,
  Smartphone,
} from "lucide-react";
import { churchInfo } from "../../../consts";

export default function YoungAdultsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          20-30대 청년들이 함께 신앙 안에서 성장하고 서로를 위로하며 사랑을
          나누는 공동체입니다.
        </p>
      </div>

      {/* 부서 소개 */}
      <Card className="mb-8 hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            부서 소개
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-primary-50 to-brand-50 p-6 rounded-lg border border-primary-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">대상 연령</div>
                  <div className="text-gray-600">20-30대 청년 성도</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">부서 비전</div>
                  <div className="text-gray-600">
                    말씀 안에서 성장하고 사랑으로 섬기는 청년 공동체
                  </div>
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-primary-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  인생의 가장 중요한 시기인 20-30대 청년들이 하나님의 말씀
                  안에서 올바른 가치관을 세우고, 서로를 격려하며 사랑으로 섬기는
                  공동체입니다.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 모임 정보 */}
      <Card className="mb-8 hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            모임 안내
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">모임 시간</div>
                  <div className="text-gray-600">
                    매주 일요일 오후 1:00 ~ 2:20
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">모임 장소</div>
                  <div className="text-gray-600">
                    {churchInfo.name} {churchInfo.floor}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">참석 대상</div>
                  <div className="text-gray-600">청년 성도 및 방문자</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-brand-50 p-6 rounded-lg border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                모임 소개
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                주일 2부 예배 후 함께 모여 말씀을 나누고 기도하는 청년들의
                모임입니다. 예배에서 들은 말씀을 삶에 적용하고 서로를 위해
                기도하는 소중한 시간입니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 모임 순서 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            모임 순서
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "13:00", item: "찬양 및 경배" },
              { time: "13:15", item: "주일 2부 예배 말씀 나눔" },
              { time: "14:00", item: "기도 제목 나눔 및 기도" },
              { time: "14:20", item: "모임 마침" },
            ].map((order, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <Badge variant="outline" className="min-w-fit">
                  {order.time}
                </Badge>
                <span className="font-medium text-gray-900">{order.item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 매일성경 나눔 활동 */}
      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-blue-600" />
            매일성경 나눔 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-blue-600" />
                슬기로운 성경모임 앱
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                청년 1부에서는 매일 매일성경 묵상을 하고 앱을 통해 서로의 묵상을
                나누는 활동을 하고 있습니다.
              </p>
              <a
                href="https://apps.apple.com/in/app/%EC%8A%AC%EA%B8%B0%EB%A1%9C%EC%9A%B4-%EC%84%B1%EA%B2%BD%EB%AA%A8%EC%9E%84/id6448745276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium text-sm"
              >
                <Smartphone className="h-4 w-4" />앱 다운로드 하기
              </a>
            </div>
            <div className="bg-white/50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                매일 매일성경 묵상 후 앱에 자신의 묵상을 올리고, 다른 청년들의
                묵상도 함께 나누며 서로를 격려하는 소중한 시간입니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
