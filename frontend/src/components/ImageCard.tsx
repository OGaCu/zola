import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PinIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageCardProps {
  imageUrl: string;
  title?: string;
  description?: string;
  onPin?: () => void;
}

const ImageCard = ({
  imageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
  title = "Beautiful Destination",
  description = "Explore this amazing travel destination",
  onPin = () => console.log("Image pinned"),
}: ImageCardProps) => {
  return (
    <div className="relative w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={onPin}
        >
          <PinIcon className="h-4 w-4 text-primary" />
        </Button>
      </div>

      <AspectRatio ratio={Math.random() > 0.5 ? 3 / 4 : 4 / 3}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </AspectRatio>

      {(title || description) && (
        <div className="p-3">
          {title && <h3 className="font-medium text-sm truncate">{title}</h3>}
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
