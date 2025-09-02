export function toEmbedUrl(link: string | undefined): string {
  if (!link) return "";

  // 1) watch?v= 형태
  if (link.includes("watch?v=")) {
    return link.replace("watch?v=", "embed/");
  }

  // 2) youtu.be 단축링크
  if (link.includes("youtu.be/")) {
    const videoId = link.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 3) 이미 embed 링크인 경우 그대로
  if (link.includes("embed/")) {
    return link;
  }

  return link;
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
