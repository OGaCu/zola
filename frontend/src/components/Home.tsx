import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Settings, Filter } from "lucide-react";
import TravelPanel from "./TravelPanel.tsx";
import ImageGallery from "./ImageGallery.tsx";
import { useTravelActions } from "../store/actions";
import { Image } from "../types";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  const { addImagesToCurrentPlan, removeImageFromCurrentPlan } =
    useTravelActions();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

  const handleWidthChange = (newWidth: number) => {
    setPanelWidth(newWidth);
  };

  const handlePinImage = (image: Image) => {
    const isImagePinned =
      currentPlan?.images?.some((img) => img.id === image.id) || false;

    if (isImagePinned) {
      console.log("Unpinning image from plan:", image);
      removeImageFromCurrentPlan(image.id);
      console.log("Image removed from current plan!");
    } else {
      console.log("Pinning image to plan:", image);
      addImagesToCurrentPlan([image]);
      console.log("Image added to current plan!");
    }
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
              className="w-full pl-10 h-10 rounded-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button className="rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors">
            <Filter className="h-5 w-5 text-foreground" />
          </button>
          <button className="rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors">
            <Settings className="h-5 w-5 text-foreground" />
          </button>
        </div>
        <ImageGallery onPinImage={handlePinImage} />
      </div>
    </div>
  );
};

export default Home;
