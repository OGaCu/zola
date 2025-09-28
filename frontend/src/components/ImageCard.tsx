import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PinIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image } from "../types";

interface ImageCardProps {
  image: Image;
  onPin?: () => void;
  isPinned?: boolean;
}

const ImageCard = ({
  image,
  onPin = () => console.log("Image pinned"),
  isPinned = false,
}: ImageCardProps) => {
  // Generate a random aspect ratio once when component mounts
  const aspectRatio = useMemo(() => {
    return Math.random() > 0.5 ? 3 / 4 : 4 / 3;
  }, []);

  return (
    <div className="relative w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant={isPinned ? "default" : "secondary"}
          className={`h-8 w-8 rounded-full backdrop-blur-sm ${
            isPinned
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-white/80 hover:bg-white"
          }`}
          onClick={onPin}
        >
          <PinIcon
            className={`h-4 w-4 ${
              isPinned ? "text-primary-foreground" : "text-primary"
            }`}
          />
        </Button>
      </div>

      <div style={{ aspectRatio: aspectRatio }}>
        <img
          src={image.url}
          alt={image.altText}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ImageCard;
