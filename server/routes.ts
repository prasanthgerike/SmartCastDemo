import type { Express } from "express";
import { createServer, type Server } from "node:http";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  resolution: string;
  uploadDate: string;
}

const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Big Buck Bunny",
    description:
      "A large and lovable rabbit deals with three bullying rodents. This animated short film was produced by the Blender Foundation.",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 596,
    resolution: "1080p",
    uploadDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Sintel",
    description:
      "A lonely young woman searches for her lost pet dragon in a world of warriors and medieval fantasy.",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Sintel_poster.jpg/800px-Sintel_poster.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: 888,
    resolution: "1080p",
    uploadDate: "2024-02-20",
  },
  {
    id: "3",
    title: "Tears of Steel",
    description:
      "In a futuristic world, scientists use robots to fight against an evil dictator who seeks world domination.",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tears_of_Steel_Promo.jpg/800px-Tears_of_Steel_Promo.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: 734,
    resolution: "1080p",
    uploadDate: "2024-03-10",
  },
  {
    id: "4",
    title: "Elephant Dream",
    description:
      "Two people lost in a surreal digital world must find their way out together through collaboration and trust.",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/800px-Elephants_Dream_s5_both.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: 653,
    resolution: "1080p",
    uploadDate: "2024-04-05",
  },
  {
    id: "5",
    title: "For Bigger Blazes",
    description:
      "An action-packed demonstration showcasing the latest in visual effects technology for film and entertainment.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: 15,
    resolution: "720p",
    uploadDate: "2024-05-12",
  },
  {
    id: "6",
    title: "For Bigger Escapes",
    description:
      "Experience the thrill of adventure with stunning cinematography that captures breathtaking moments.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: 15,
    resolution: "720p",
    uploadDate: "2024-06-18",
  },
];

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/videos", (_req, res) => {
    res.json(sampleVideos);
  });

  app.get("/api/videos/:id", (req, res) => {
    const video = sampleVideos.find((v) => v.id === req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  });

  const httpServer = createServer(app);

  return httpServer;
}
