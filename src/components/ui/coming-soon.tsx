import { Construction, Clock, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: "construction" | "clock" | "sparkles";
}

export function ComingSoon({ 
  title = "준비 중입니다", 
  description = "더 나은 서비스를 위해 열심히 준비하고 있어요. 조금만 기다려 주세요!",
  icon = "construction"
}: ComingSoonProps) {
  const IconComponent = {
    construction: Construction,
    clock: Clock,
    sparkles: Sparkles
  }[icon];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}