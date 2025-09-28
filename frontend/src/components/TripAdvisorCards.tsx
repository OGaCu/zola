import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Globe, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripAdvisorLocation } from "@/types";

// Props interface for the component
interface TripAdvisorCardsProps {
  locations?: TripAdvisorLocation[];
  isLoading?: boolean;
  error?: string | null;
}

// Mock data for TripAdvisor locations - this will be replaced with real data from your backend
const mockLocations: TripAdvisorLocation[] = [
  {
    id: "1",
    name: "Golden Gate Bridge",
    category: "attraction",
    description: "Iconic suspension bridge spanning the Golden Gate strait",
    address: "Golden Gate Bridge, San Francisco, CA",
    phone: null,
    price_level: "Free",
    rating: 4.5,
    amenities: ["Free WiFi", "Parking", "Restrooms"],
    styles: ["Historic", "Scenic"],
    trip_types: ["Family", "Couples", "Solo"],
    web_url: "https://www.tripadvisor.com/example",
    photo_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Fisherman's Wharf",
    category: "attraction",
    description: "Historic waterfront district with shops, restaurants, and sea lions",
    address: "Pier 39, San Francisco, CA",
    phone: "+1 (415) 705-5500",
    price_level: "$$",
    rating: 4.2,
    amenities: ["Shopping", "Dining", "Entertainment"],
    styles: ["Tourist", "Family-friendly"],
    trip_types: ["Family", "Groups"],
    web_url: "https://www.tripadvisor.com/example2",
    photo_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    name: "The French Laundry",
    category: "restaurant",
    description: "Michelin-starred fine dining restaurant in Napa Valley",
    address: "6640 Washington St, Yountville, CA",
    phone: "+1 (707) 944-2380",
    price_level: "$$$$",
    rating: 4.8,
    amenities: ["Fine Dining", "Wine Selection", "Private Dining"],
    styles: ["Upscale", "Romantic"],
    trip_types: ["Couples", "Special Occasion"],
    web_url: "https://www.tripadvisor.com/example3",
    photo_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
  }
];

const TripAdvisorCards: React.FC<TripAdvisorCardsProps> = ({ 
  locations = mockLocations, 
  isLoading = false, 
  error = null 
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hotel":
        return "🏨";
      case "restaurant":
        return "🍽️";
      case "attraction":
        return "🎯";
      default:
        return "📍";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hotel":
        return "bg-blue-100 text-blue-800";
      case "restaurant":
        return "bg-green-100 text-green-800";
      case "attraction":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="flex">
              <div className="w-32 h-24 bg-gray-200 flex-shrink-0"></div>
              <div className="flex-1 p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Error Loading Locations</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {locations.length > 0 ? (
        locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="w-32 h-24 flex-shrink-0">
                <img
                  src={location.photo_url || "https://via.placeholder.com/128x96"}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4">
                <CardHeader className="p-0 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{location.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getCategoryColor(location.category)}`}>
                          {getCategoryIcon(location.category)} {location.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {renderStars(location.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            {location.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    {location.price_level && (
                      <Badge variant="outline" className="text-xs">
                        {location.price_level}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <CardDescription className="text-sm mb-2 line-clamp-2">
                    {location.description}
                  </CardDescription>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {location.address && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{location.address}</span>
                      </div>
                    )}
                    {location.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{location.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Amenities */}
                  {location.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {location.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {location.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{location.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    {location.web_url && (
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Globe className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <Camera className="h-3 w-3 mr-1" />
                      Photos
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
          <p className="text-sm">
            We're working on finding the best locations for your trip.
          </p>
        </div>
      )}
    </div>
  );
};

export default TripAdvisorCards;