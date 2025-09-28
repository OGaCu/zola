import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Settings, Pin, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TravelPanel from "./TravelPanel.tsx";
import ImageGallery from "./ImageGallery.tsx";
import { useTravelActions } from "../store/actions";
import { Image } from "../types";
import { useAppSelector } from "../store/hooks";
import { imageService } from "../services/imageService";

const Home = () => {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyPinned, setShowOnlyPinned] = useState(false);
  const [searchResults, setSearchResults] = useState<Image[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pinnedImages, setPinnedImages] = useState<Image[]>([]);
  const [defaultImages, setDefaultImages] = useState<Image[]>([]);
  const navigate = useNavigate();
  const { addImagesToCurrentPlan, removeImageFromCurrentPlan } =
    useTravelActions();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

  // Load default images on component mount
  useEffect(() => {
    const loadDefaultImages = async () => {
      try {
        const images = await imageService.getRandomImages();
        setDefaultImages(images);
      } catch (error) {
        console.error("Error loading default images:", error);
      }
    };
    
    loadDefaultImages();
  }, []);

  const handleWidthChange = (newWidth: number) => {
    setPanelWidth(newWidth);
  };

  const handlePinImage = (image: Image) => {
    const isImagePinned =
      currentPlan?.images?.some((img) => img.id === image.id) || false;

    if (isImagePinned) {
      console.log("Unpinning image from plan:", image);
      removeImageFromCurrentPlan(image.id);
      // Remove from pinned images state
      setPinnedImages(prev => prev.filter(img => img.id !== image.id));
      console.log("Image removed from current plan!");
    } else {
      console.log("Pinning image to plan:", image);
      addImagesToCurrentPlan([image]);
      // Add to pinned images state
      setPinnedImages(prev => {
        const exists = prev.some(img => img.id === image.id);
        if (!exists) {
          return [...prev, image];
        }
        return prev;
      });
      console.log("Image added to current plan!");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log("Empty search query");
      return;
    }

    console.log("Searching for:", searchQuery);
    setIsSearching(true);
    
    try {
      const images = await imageService.searchImages(searchQuery);
      setSearchResults(images);
    } catch (error) {
      console.error("❌ Error searching images:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setSearchQuery(""); // Clear search input after searching
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTogglePinnedView = () => {
    setShowOnlyPinned(!showOnlyPinned);
  };

  // Test function for image service
  const testImageService = async () => {
    console.log("🧪 Testing image service...");
    
    // Test random images
    const randomImages = await imageService.testGetRandomImages();
    console.log("Random images test result:", randomImages);
    
    // Test search images
    const searchImages = await imageService.testSearchImages();
    console.log("Search images test result:", searchImages);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Panel */}
      <motion.div
        initial={{ width: panelWidth }}
        animate={{
          width: isPanelCollapsed ? 60 : panelWidth,
          transition: { duration: 0.3 },
        }}
        className="h-full border-r border-border bg-card relative flex-shrink-0"
      >
        <TravelPanel
          isCollapsed={isPanelCollapsed}
          onToggleCollapse={() => setIsPanelCollapsed(!isPanelCollapsed)}
          onWidthChange={handleWidthChange}
        />
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 flex h-full overflow-hidden flex-col">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search for inspiration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 h-10 rounded-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className={`px-4 py-2 rounded-full transition-colors ${
              isSearching || !searchQuery.trim()
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button
            onClick={handleTogglePinnedView}
            className={`rounded-full p-2 transition-colors ${
              showOnlyPinned
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted hover:bg-muted/80"
            }`}
            title={
              showOnlyPinned ? "Show all images" : "Show only pinned images"
            }
          >
            <Pin className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate("/itinerary")}
            className="rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors"
            title="View Itinerary"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>
        <ImageGallery
          images={defaultImages}
          onPinImage={handlePinImage}
          showOnlyPinned={showOnlyPinned}
          searchResults={searchResults}
          pinnedImages={pinnedImages}
        />
      </div>
    </div>
  );
};

export default Home;
