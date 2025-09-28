import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ItineraryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold">Travel Itinerary</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Your Personalized Itinerary</h2>
            <p className="text-muted-foreground">
              This is your new itinerary page! You can add your travel itinerary content here.
            </p>
            
            {/* Example itinerary content */}
            <div className="mt-6 space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-medium">Day 1 - Arrival</h3>
                <p className="text-sm text-muted-foreground">Check into your hotel and explore the local area</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-medium">Day 2 - Sightseeing</h3>
                <p className="text-sm text-muted-foreground">Visit the main attractions and landmarks</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-medium">Day 3 - Departure</h3>
                <p className="text-sm text-muted-foreground">Final day activities and departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
