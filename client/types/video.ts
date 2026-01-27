export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  resolution: string;
  uploadDate: string;
}

export interface Settings {
  autoPlayNext: boolean;
  qualityPreference: "auto" | "high" | "medium" | "low";
}
