import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ImageCard from "./ImageCard";

interface ImageGalleryProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  images?: ImageItem[];
}

interface ImageItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  height?: number;
}

const ImageGallery = ({
  searchQuery = "",
  onSearchChange = () => {},
  images = defaultImages,
}: ImageGalleryProps) => {
  const [query, setQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange(newQuery);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white p-6">
      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="pl-10 pr-4 h-10 rounded-full"
            placeholder="Search destinations, activities..."
            value={query}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
        >
          <Filter size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
        >
          <SlidersHorizontal size={18} />
        </Button>
      </div>

      {/* Masonry Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            imageUrl={image.url}
            title={image.title}
            description={image.description || ""}
          />
        ))}
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
];

export default ImageGallery;
