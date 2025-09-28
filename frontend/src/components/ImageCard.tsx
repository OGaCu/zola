import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PinIcon, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Generate a random aspect ratio once when component mounts
  const aspectRatio = useMemo(() => {
    return Math.random() > 0.5 ? 3 / 4 : 4 / 3;
  }, []);

  // Get tags to display (top 10 or all)
  const tagsToShow = useMemo(() => {
    if (!image.tags || image.tags.length === 0) return [];
    return showAllTags ? image.tags : image.tags.slice(0, 10);
  }, [image.tags, showAllTags]);

  const hasMoreTags = image.tags && image.tags.length > 10;

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
    setShowAllTags(false); // Reset to top 10 when opening
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setShowAllTags(false);
  };

  const handleUrlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(image.url, '_blank');
  };

  const toggleShowAllTags = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  return (
    <div 
      className="relative w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleImageClick}
    >
      {/* Pin Button */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant={isPinned ? "default" : "secondary"}
          className={`h-8 w-8 rounded-full backdrop-blur-sm ${
            isPinned
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-white/80 hover:bg-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
        >
          <PinIcon
            className={`h-4 w-4 ${
              isPinned ? "text-primary-foreground" : "text-primary"
            }`}
          />
        </Button>
      </div>

      {/* Image */}
      <div style={{ aspectRatio: aspectRatio }}>
        <img
          src={image.url}
          alt={image.altText}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Tags Popup Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
            {/* Left Side - Large Image */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
              <div className="relative max-w-full max-h-full">
                <img
                  src={image.url}
                  alt={image.altText}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
                {/* Close Button on Image */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
                  onClick={handleCloseDetails}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Right Side - Information Panel */}
            <div className="w-96 flex flex-col border-l border-gray-200">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Image Details</h2>
                <p className="text-sm text-gray-500">ID: {image.id}</p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Description */}
                {image.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                )}

                {/* Tags Section */}
                {image.tags && image.tags.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">
                        Tags {showAllTags ? `(${image.tags.length})` : `(${Math.min(10, image.tags.length)} of ${image.tags.length})`}
                      </h3>
                      {hasMoreTags && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={toggleShowAllTags}
                        >
                          {showAllTags ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              All
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {/* Tags Grid */}
                    <div className="flex flex-wrap gap-2">
                      {tagsToShow.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200 hover:bg-blue-200 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alt Text */}
                {image.altText && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Alt Text</h3>
                    <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
                      {image.altText}
                    </p>
                  </div>
                )}

                {/* URL Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Image URL</h3>
                  <div className="space-y-2">
                    <code className="block text-xs bg-gray-100 p-2 rounded border text-gray-700 break-all">
                      {image.url}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={handleUrlClick}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="outline"
                  onClick={handleCloseDetails}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
