import React from "react";
import ImageCard from "./ImageCard";
import { Image } from "../types";
import { useAppSelector } from "../store/hooks";

interface ImageGalleryProps {
  images?: Image[];
  onPinImage?: (image: Image) => void;
  showOnlyPinned?: boolean;
}

const ImageGallery = ({
  images = defaultImages,
  onPinImage,
  showOnlyPinned = false,
}: ImageGalleryProps) => {
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);
  const pinnedImageIds = currentPlan?.images?.map((img) => img.id) || [];

  // Filter images based on showOnlyPinned prop
  const filteredImages = showOnlyPinned
    ? images.filter((image) => pinnedImageIds.includes(image.id))
    : images;

  return (
    <div className="flex flex-col flex-1 w-full bg-white overflow-auto">
      {/* Pinterest-style Masonry Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {showOnlyPinned && filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-muted-foreground text-lg mb-2">
              No pinned images
            </div>
            <div className="text-sm text-muted-foreground">
              Pin some images to see them here
            </div>
          </div>
        ) : (
          <div
            className="masonry-gallery"
            style={{
              columnGap: "1rem",
              columnFill: "balance",
            }}
          >
            {filteredImages.map((image) => (
              <div key={image.id} className="break-inside-avoid mb-4 w-full">
                <ImageCard
                  image={image}
                  onPin={() => onPinImage?.(image)}
                  isPinned={pinnedImageIds.includes(image.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Default images for demonstration - transformed to fit Image schema
const defaultImages: Image[] = [
  {
    id: "img-beach-paradise-001",
    url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&q=80",
    description: "Tropical beach with crystal clear water",
    tags: ["beach", "tropical", "paradise", "vacation"],
  },
  {
    id: "img-mountain-retreat-002",
    url: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=500&q=80",
    description: "Serene mountain landscape with snow-capped peaks",
    tags: ["mountain", "landscape", "nature", "peaceful"],
  },
  {
    id: "img-city-lights-003",
    url: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=500&q=80",
    description: "Vibrant cityscape at night with illuminated buildings",
    tags: ["city", "night", "urban", "lights"],
  },
  {
    id: "img-autumn-trails-004",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80",
    description: "Scenic hiking trail surrounded by fall foliage",
    tags: ["hiking", "autumn", "trail", "nature"],
  },
  {
    id: "img-island-getaway-005",
    url: "https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=500&q=80",
    description: "Remote island paradise with white sandy beaches",
    tags: ["island", "beach", "paradise", "tropical"],
  },
  {
    id: "img-sunset-horizon-006",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80",
    description: "Breathtaking sunset over calm waters",
    tags: ["sunset", "water", "serene", "beautiful"],
  },
  {
    id: "img-historic-architecture-007",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    description: "Ancient ruins and historic buildings",
    tags: ["historic", "architecture", "ancient", "culture"],
  },
  {
    id: "img-jungle-adventure-008",
    url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=500&q=80",
    description: "Lush rainforest with exotic wildlife",
    tags: ["jungle", "rainforest", "wildlife", "adventure"],
  },
  {
    id: "img-desert-oasis-009",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Beautiful desert landscape with sand dunes",
    tags: ["desert", "sand", "landscape", "adventure"],
  },
  {
    id: "img-forest-path-010",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80",
    description: "Peaceful forest trail through tall trees",
    tags: ["forest", "trail", "trees", "peaceful"],
  },
  {
    id: "img-lakeside-cabin-011",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Cozy cabin by a serene mountain lake",
    tags: ["cabin", "lake", "mountain", "cozy"],
  },
  {
    id: "img-waterfall-wonder-012",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&q=80",
    description: "Majestic waterfall cascading through rocks",
    tags: ["waterfall", "nature", "majestic", "water"],
  },
  {
    id: "img-coastal-cliffs-013",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Dramatic cliffs overlooking the ocean",
    tags: ["cliffs", "ocean", "dramatic", "coastal"],
  },
  {
    id: "img-garden-paradise-014",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Colorful flower garden in full bloom",
    tags: ["garden", "flowers", "colorful", "bloom"],
  },
  {
    id: "img-snowy-peaks-015",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Snow-covered mountain peaks at sunrise",
    tags: ["snow", "mountain", "sunrise", "peaks"],
  },
  {
    id: "img-tropical-forest-016",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "Dense tropical rainforest with exotic plants",
    tags: ["rainforest", "tropical", "plants", "dense"],
  },
];

export default ImageGallery;
