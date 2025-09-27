import React from "react";
import ImageCard from "./ImageCard";

interface ImageGalleryProps {
  images?: ImageItem[];
}

interface ImageItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  height?: number;
}

const ImageGallery = ({ images = defaultImages }: ImageGalleryProps) => {
  return (
    <div className="flex flex-col flex-1 w-full bg-white overflow-auto">
      {/* Pinterest-style Masonry Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          className="masonry-gallery"
          style={{
            columnGap: "1rem",
            columnFill: "balance",
          }}
        >
          {images.map((image) => (
            <div key={image.id} className="break-inside-avoid mb-4 w-full">
              <ImageCard
                imageUrl={image.url}
                title={image.title}
                description={image.description || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default images for demonstration
const defaultImages: ImageItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&q=80",
    title: "Beach Paradise",
    description: "Tropical beach with crystal clear water",
    height: 320,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=500&q=80",
    title: "Mountain Retreat",
    description: "Serene mountain landscape with snow-capped peaks",
    height: 400,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=500&q=80",
    title: "City Lights",
    description: "Vibrant cityscape at night with illuminated buildings",
    height: 280,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80",
    title: "Autumn Trails",
    description: "Scenic hiking trail surrounded by fall foliage",
    height: 350,
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=500&q=80",
    title: "Island Getaway",
    description: "Remote island paradise with white sandy beaches",
    height: 300,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80",
    title: "Sunset Horizon",
    description: "Breathtaking sunset over calm waters",
    height: 320,
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    title: "Historic Architecture",
    description: "Ancient ruins and historic buildings",
    height: 380,
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=500&q=80",
    title: "Jungle Adventure",
    description: "Lush rainforest with exotic wildlife",
    height: 340,
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Desert Oasis",
    description: "Beautiful desert landscape with sand dunes",
    height: 360,
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80",
    title: "Forest Path",
    description: "Peaceful forest trail through tall trees",
    height: 420,
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Lakeside Cabin",
    description: "Cozy cabin by a serene mountain lake",
    height: 290,
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&q=80",
    title: "Waterfall Wonder",
    description: "Majestic waterfall cascading through rocks",
    height: 450,
  },
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Coastal Cliffs",
    description: "Dramatic cliffs overlooking the ocean",
    height: 310,
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Garden Paradise",
    description: "Colorful flower garden in full bloom",
    height: 270,
  },
  {
    id: "15",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Snowy Peaks",
    description: "Snow-covered mountain peaks at sunrise",
    height: 380,
  },
  {
    id: "16",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    title: "Tropical Forest",
    description: "Dense tropical rainforest with exotic plants",
    height: 330,
  },
];

export default ImageGallery;
