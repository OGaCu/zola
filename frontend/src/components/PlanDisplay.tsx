import React from "react";
import { useAppSelector } from "../store/hooks";
import { useTravelActions } from "../store/actions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Users, DollarSign, Heart } from "lucide-react";
import { formatDateRange } from "../utils/dateUtils";

const PlanDisplay: React.FC = () => {
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);
  const { clearCurrentPlan } = useTravelActions();

  if (!currentPlan) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No plan selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">Current Travel Plan</CardTitle>
          <Button variant="outline" size="sm" onClick={clearCurrentPlan}>
            Clear Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Dates:</span>
            <span className="font-medium">
              {formatDateRange(currentPlan.dateFrom, currentPlan.dateTo)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Location:</span>
            <span className="font-medium">
              {currentPlan.location || "Not set"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">People:</span>
            <span className="font-medium">{currentPlan.numberOfPeople}</span>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Budget:</span>
            <span className="font-medium">
              {currentPlan.budget || "Not set"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Heart className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Mood:</span>
          <Badge variant="secondary" className="capitalize">
            {currentPlan.mood}
          </Badge>
        </div>

        {currentPlan.images && currentPlan.images.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Images ({currentPlan.images.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {currentPlan.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-20 object-cover rounded"
                  />
                  {image.tags.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1">
                      <Badge variant="secondary" className="text-xs">
                        {image.tags[0]}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanDisplay;
