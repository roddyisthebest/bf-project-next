import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bf-church.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // 교회소개
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/history`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/worship`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/location`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // 예배
    {
      url: `${baseUrl}/chaples/wednesday`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chaples/weekly`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 교육/양육
    {
      url: `${baseUrl}/educations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/educations/discipleship`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/educations/ministry-training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/educations/life-group`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // 다음세대
    {
      url: `${baseUrl}/generations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/generations/teenagers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/generations/young-adults`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/generations/adults`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // 선교
    {
      url: `${baseUrl}/missions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/missions/international`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // 게시판
    {
      url: `${baseUrl}/boards/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/boards/testimony`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/boards/music`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
