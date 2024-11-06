"use client";

import { Telescope, Calendar, Globe, Star, Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { APODSection } from "@/components/APODSection";
import { MarsSection } from "@/components/MarsSection";

const EVENTS = [
  {
    title: "Perseid Meteor Shower Peak",
    description: "One of the best meteor showers, with up to 100 meteors per hour",
    date: "August 12-13, 2024",
    type: "meteor"
  },
  {
    title: "Total Solar Eclipse",
    description: "Visible across North America",
    date: "April 8, 2024",
    type: "eclipse"
  },
  {
    title: "Saturn Opposition",
    description: "Best time to view Saturn as it will be at its closest to Earth",
    date: "September 8, 2024",
    type: "planet"
  },
  {
    title: "Orionid Meteor Shower Peak",
    description: "Annual meteor shower producing up to 20 meteors per hour",
    date: "October 21-22, 2024",
    type: "meteor"
  },
  {
    title: "Lunar Eclipse",
    description: "Partial lunar eclipse visible from Europe, Africa, Asia, and Australia",
    date: "September 18, 2024",
    type: "eclipse"
  },
  {
    title: "Jupiter Opposition",
    description: "Jupiter at its closest approach to Earth, fully illuminated by the Sun",
    date: "December 7, 2024",
    type: "planet"
  },
  {
    title: "Geminid Meteor Shower Peak",
    description: "One of the best meteor showers, with up to 120 multicolored meteors per hour",
    date: "December 13-14, 2024",
    type: "meteor"
  },
  {
    title: "Mars Close Approach",
    description: "Mars makes its closest approach to Earth, appearing larger and brighter",
    date: "January 12, 2025",
    type: "planet"
  },
  {
    title: "Lyrids Meteor Shower Peak",
    description: "Medium-strength meteor shower, producing about 20 meteors per hour",
    date: "April 22-23, 2025",
    type: "meteor"
  },
  {
    title: "Mercury Transit",
    description: "Mercury passes directly between Earth and the Sun, visible as a small black dot",
    date: "November 7, 2025",
    type: "transit"
  }
];

const VISIBLE_PLANETS = [
  { 
    name: "Mars", 
    visibility: "Morning", 
    magnitude: "-0.1", 
    distance: "225 million km", 
    constellation: "Gemini"
  },
  { 
    name: "Venus", 
    visibility: "Evening", 
    magnitude: "-4.3", 
    distance: "134 million km", 
    constellation: "Leo"
  },
  { 
    name: "Jupiter", 
    visibility: "Evening", 
    magnitude: "-2.4", 
    distance: "746 million km", 
    constellation: "Pisces"
  },
  { 
    name: "Saturn", 
    visibility: "Morning", 
    magnitude: "0.7", 
    distance: "1.4 billion km", 
    constellation: "Aquarius"
  },
  { 
    name: "Mercury", 
    visibility: "Evening", 
    magnitude: "-0.6", 
    distance: "168 million km", 
    constellation: "Virgo"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background overflow-auto">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            StellarVista
          </h1>
          <p className="text-muted-foreground text-lg">
            Your Daily Window to the Cosmos
          </p>
        </header>

        <Tabs defaultValue="apod" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-[800px] mx-auto glass-effect sticky top-4 z-10">
            <TabsTrigger value="apod" className="data-[state=active]:text-primary">
              <Telescope className="mr-2 h-4 w-4" />
              APOD
            </TabsTrigger>
            <TabsTrigger value="mars" className="data-[state=active]:text-primary">
              <Camera className="mr-2 h-4 w-4" />
              Mars
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:text-primary">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="planets" className="data-[state=active]:text-primary">
              <Globe className="mr-2 h-4 w-4" />
              Planets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apod" className="space-y-4 animate-fade-in">
            <APODSection />
          </TabsContent>

          <TabsContent value="mars" className="space-y-4 animate-fade-in">
            <MarsSection />
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <ScrollArea className="h-[calc(100vh-200px)] rounded-md border p-4 glass-effect">
              <div className="space-y-4">
                {EVENTS.map((event, index) => (
                  <Card key={index} className="p-4 glass-effect card-hover event-card">
                    <div className="event-card-content">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gradient">{event.title}</h3>
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="glass-effect">
                          {event.date}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="planets" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VISIBLE_PLANETS.map((planet, index) => (
                <Card key={index} className="p-4 glass-effect card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-accent rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gradient">{planet.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Visible: {planet.visibility}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Magnitude: {planet.magnitude}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Distance: {planet.distance}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Constellation: {planet.constellation}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-12 pb-8 text-sm text-muted-foreground">
          <p className="animate-fade-in">
            Created by{" "}
            <a>
              Ashutosh Singh
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}