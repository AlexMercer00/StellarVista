"use client";

import { useEffect, useState } from "react";
import { Info, Share2, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface APOD {
  title: string;
  url: string;
  explanation: string;
  date: string;
  media_type: string;
  hdurl?: string;
}

export function APODSection() {
  const [apod, setApod] = useState<APOD | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error("Error fetching APOD:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  const handleShare = async () => {
    if (apod) {
      try {
        await navigator.share({
          title: apod.title,
          text: apod.explanation,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <Card className="p-6 glass-effect">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : apod ? (
        <div className="space-y-4">
          <AspectRatio ratio={16 / 9}>
            {apod.media_type === "image" ? (
              <img
                src={apod.url}
                alt={apod.title}
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <iframe
                src={apod.url}
                title={apod.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            )}
          </AspectRatio>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gradient">{apod.title}</h2>
              <Badge variant="outline" className="glass-effect">{apod.date}</Badge>
            </div>
            <p className="text-muted-foreground line-clamp-3">{apod.explanation}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="glass-effect">
                  <Info className="mr-2 h-4 w-4" />
                  More Info
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect">
                <DialogHeader>
                  <DialogTitle className="text-gradient">{apod.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>{apod.explanation}</p>
                  <p className="text-sm text-muted-foreground">
                    Image Credit: NASA
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            {apod.hdurl && (
              <Button variant="outline" size="sm" asChild className="glass-effect">
                <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  HD Image
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleShare} className="glass-effect">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      ) : (
        <p>Failed to load APOD</p>
      )}
    </Card>
  );
}