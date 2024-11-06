"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
}

export function MarsSection() {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY');
        const data = await response.json();
        if (data.latest_photos && Array.isArray(data.latest_photos)) {
          setPhotos(data.latest_photos.slice(0, 6));
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching Mars photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsPhotos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <AspectRatio ratio={4/3}>
              <img
                src={photo.img_src}
                alt={`Mars photo from ${photo.camera.full_name}`}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span className="text-sm font-medium">{photo.camera.full_name}</span>
                </div>
                <Badge variant="secondary">{photo.earth_date}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}