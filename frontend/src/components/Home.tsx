import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Settings, Filter } from "lucide-react";
import TravelPanel from "./TravelPanel.tsx";
import ImageGallery from "./ImageGallery.tsx";

const Home = () => {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < 500) {
      setPanelWidth(newWidth);
    }
  };

  return (
    <div
      className="flex h-screen w-full bg-background overflow-hidden"
      onMouseMove={handleDrag}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
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
        />

        {/* Drag Handle */}
        <div
          className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-primary/20 z-10"
          onMouseDown={() => setIsDragging(true)}
        />
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 h-full overflow-hidden">
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

        <ImageGallery />
      </div>
    </div>
  );
};

export default Home;
