import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  VideoOff,
} from "lucide-react";
import { churchInfo } from "../../../consts";

export default function WednesdayPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          주 중에 하나님과 더 가까이 만나는 소중한 시간입니다. 말씀과 기도로
          영적 충전의 시간을 가져보세요.
        </p>
      </div>

      {/* 예배 정보 */}
      <Card className="mb-8 hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            예배 안내
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">예배 시간</div>
                  <div className="text-gray-600">매주 수요일 오후 8:00</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">예배 장소</div>
                  <div className="text-gray-600">
                    {churchInfo.name} {churchInfo.floor}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">참석 대상</div>
                  <div className="text-gray-600">모든 성도 및 방문자</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-brand-50 p-6 rounded-lg border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                말씀 안내
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <a
                    href="https://sum.su.or.kr:8888/bible/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-600 underline font-medium"
                  >
                    매일성경
                  </a>{" "}
                  말씀을 토대로 한 예배 말씀으로 진행됩니다. 일상 속에서 실천할
                  수 있는 살아있는 하나님의 말씀을 나누는 시간입니다.
                </p>
                <div className="bg-white/50 p-3 rounded-lg border border-primary-200">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong className="text-primary">매일성경</strong>은
                    성서유니온에서 발행하는 매일 성경 묵상 교재로, 전 세계
                    수백만 명의 성도들이 동일한 말씀으로 묵상하는 전 세계적인
                    성경 묵상 운동입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 영상 안내 */}
      <Card className="mb-8 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <VideoOff className="h-5 w-5 text-amber-600" />
            영상 안내
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <VideoOff className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                수요예배는 현장 참석 중심의 예배로 진행되며, 별도의 온라인
                영상은 제공하지 않습니다.
              </p>
              <p className="text-sm text-gray-600">
                직접 참석하여 더욱 은혜로운 예배의 시간을 가져보세요.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 참석 안내 */}
      <Card className="bg-gradient-to-r from-primary-50 to-brand-50 border-primary-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            참석 안내
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                처음 참석하시는 분
              </h3>
              <p className="text-sm text-gray-600">
                예배 시작 10분 전까지 오시면 됩니다. 편안한 복장으로 참석해
                주세요.
              </p>
            </div>
          </div>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              문의사항: {churchInfo.phone} | 주소: {churchInfo.address}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
