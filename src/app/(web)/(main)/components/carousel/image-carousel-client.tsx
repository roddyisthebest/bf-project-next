"use client";

import { PostView } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface ImageCarouselClientProps {
  posts: PostView[];
}

export function ImageCarouselClient({ posts }: ImageCarouselClientProps) {
  if (posts.length === 0) {
    return (
      <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 border-y border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            아직 업로드된 이미지가 없습니다.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            공지사항을 확인해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      className="h-48 sm:h-64"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id}>
            <div className="relative h-48 sm:h-64 overflow-hidden">
              {post.thumbnail && (
                <>
                  <Image
                    fill
                    src={post.thumbnail}
                    alt=""
                    className="object-cover blur-sm opacity-50"
                    quality={50}
                    sizes="100vw"
                  />
                  <Image
                    fill
                    src={post.thumbnail}
                    alt={post.title}
                    className="object-contain relative z-10"
                    quality={90}
                    sizes="100vw"
                    priority
                  />
                </>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {posts.length > 1 && (
        <>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </>
      )}
    </Carousel>
  );
}
