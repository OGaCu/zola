import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Mock data for TripAdvisor locations - Atlanta-based locations
const mockLocations: TripAdvisorLocation[] = [
  {
    location_id: "1",
    name: "Georgia Aquarium",
    category: "attraction",
    description:
      "One of the world's largest aquariums featuring thousands of marine animals",
    address: "225 Baker St NW, Atlanta, GA 30313",
    phone: "+1 (404) 581-4000",
    price_level: "$$",
    rating: 4.3,
    amenities: ["Parking", "Gift Shop", "Restaurants", "Accessibility"],
    styles: ["Educational", "Family-friendly"],
    trip_types: ["Family", "Couples", "Groups"],
    web_url: "https://www.tripadvisor.com/example",
    photo_url:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    location_id: "2",
    name: "World of Coca-Cola",
    category: "attraction",
    description:
      "Interactive museum showcasing the history and culture of the Coca-Cola brand",
    address: "121 Baker St NW, Atlanta, GA 30313",
    phone: "+1 (404) 676-5151",
    price_level: "$$",
    rating: 4.1,
    amenities: ["Gift Shop", "Tasting Room", "Parking"],
    styles: ["Historic", "Interactive"],
    trip_types: ["Family", "Groups", "Solo"],
    web_url: "https://www.tripadvisor.com/example2",
    photo_url:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
  },
  {
    location_id: "3",
    name: "The Varsity",
    category: "restaurant",
    description:
      "Historic fast-food restaurant famous for its chili dogs and onion rings",
    address: "61 North Ave NW, Atlanta, GA 30308",
    phone: "+1 (404) 881-1706",
    price_level: "$",
    rating: 3.8,
    amenities: ["Drive-thru", "Dine-in", "Takeout"],
    styles: ["Casual", "Historic", "Fast Food"],
    trip_types: ["Family", "Groups", "Solo"],
    web_url: "https://www.tripadvisor.com/example3",
    photo_url:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
  {
    location_id: "4",
    name: "Centennial Olympic Park",
    category: "attraction",
    description:
      "Beautiful park built for the 1996 Olympics with fountains and green spaces",
    address: "265 Park Ave W NW, Atlanta, GA 30313",
    phone: "+1 (404) 222-7275",
    price_level: "Free",
    rating: 4.2,
    amenities: ["Free WiFi", "Parking", "Restrooms", "Playground"],
    styles: ["Scenic", "Historic", "Family-friendly"],
    trip_types: ["Family", "Couples", "Solo"],
    web_url: "https://www.tripadvisor.com/example4",
    photo_url:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    location_id: "5",
    name: "The Ritz-Carlton Atlanta",
    category: "hotel",
    description:
      "Luxury hotel in downtown Atlanta with elegant rooms and fine dining",
    address: "181 Peachtree St NE, Atlanta, GA 30303",
    phone: "+1 (404) 659-0400",
    price_level: "$$$$",
    rating: 4.4,
    amenities: [
      "Spa",
      "Fitness Center",
      "Restaurant",
      "Room Service",
      "Concierge",
    ],
    styles: ["Luxury", "Business", "Romantic"],
    trip_types: ["Couples", "Business", "Special Occasion"],
    web_url: "https://www.tripadvisor.com/example5",
    photo_url:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
];

const TripAdvisorCards: React.FC<TripAdvisorCardsProps> = ({
  locations = mockLocations,
  isLoading = false,
  error = null,
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
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400/50 text-yellow-400"
        />
      );
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
          <Card key={location.location_id} className="overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="w-32 h-24 flex-shrink-0">
                <img
                  src={
                    location.photo_url || "https://via.placeholder.com/128x96"
                  }
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <CardHeader className="p-0 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {location.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`text-xs ${getCategoryColor(
                            location.category
                          )}`}
                        >
                          {getCategoryIcon(location.category)}{" "}
                          {location.category}
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
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                      >
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
