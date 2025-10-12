import Image from "next/image";
import { Globe, Users } from "lucide-react";
import { internationalMissions } from "../../../consts";

export default function InternationalMissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">해외선교</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            큰숲교회에서 후원하고 있는 해외 선교팀을 소개합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {internationalMissions.map((child) => (
            <div
              key={child.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {child.images && child.images.length > 0 ? (
                  child.images.length === 1 ? (
                    <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src={child.images[0]}
                        alt={child.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1 h-full">
                      {child.images.slice(0, 4).map((image, idx) => (
                        <div key={idx} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <Image
                            src={image}
                            alt={`${child.name} ${idx + 1}`}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-emerald-100">
                    <Globe className="w-16 h-16 text-blue-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{child.countryFlag}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {child.country}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {child.name}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  {child.description}
                </p>
                {child.activities && child.activities.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      주요 사역
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {child.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
