export function toEmbedUrl(link: string | undefined): string {
  if (!link) return "";

  // YouTube 비디오 ID 추출 함수
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtube\.com\/live\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = extractVideoId(link);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 이미 올바른 embed URL인 경우
  if (link.includes("youtube.com/embed/")) {
    return link;
  }

  return "";
}

export function formatDate(date: string | null | undefined) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replace(/-/g, "."); // 혹시 브라우저 환경별 "-" 나올 경우 대비
}
