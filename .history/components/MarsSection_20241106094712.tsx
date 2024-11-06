import { useEffect, useState } from "react";
import { Camera, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY'
        );
        
        if (!response.ok) {
          throw new Error(`NASA API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !data.latest_photos) {
          throw new Error('No photos data received from NASA API');
        }

        setPhotos(data.latest_photos.slice(0, 6));
      } catch (error) {
        console.error("Error fetching Mars photos:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch Mars photos');
      } finally {
        setLoading(false);
      }
    };

    fetchMarsPhotos();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <AspectRatio ratio={4/3}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          // Actual photos
          photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <AspectRatio ratio={4/3}>
                <image
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
          ))
        )}
      </div>
    </ScrollArea>
  );
}