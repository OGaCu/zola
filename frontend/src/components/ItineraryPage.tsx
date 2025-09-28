import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../store/hooks";
import ReactMarkdown from "react-markdown";
import TripAdvisorCards from "./TripAdvisorCards";

const ItineraryPage = () => {
  const navigate = useNavigate();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Your Personalized Itinerary
            </h2>
            {currentPlan?.location && (
              <div className="text-sm text-muted-foreground">
                {currentPlan.location} • {currentPlan.numPeople}{" "}
                {currentPlan.numPeople === 1 ? "person" : "people"} •{" "}
                {currentPlan.mood}
              </div>
            )}
          </div>

          {currentPlan?.itinerary ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left - Markdown Itinerary (7/12) */}
              <div className="lg:col-span-7 bg-card rounded-lg border border-border p-6 overflow-hidden">
                <h3 className="text-lg font-semibold mb-4">
                  Itinerary Details
                </h3>
                <div className="prose prose-sm max-w-none overflow-hidden">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mt-8 mb-4 text-primary">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold mt-6 mb-3 text-primary">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-1">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="ml-2">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                    }}
                  >
                    {currentPlan.itinerary}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Right - TripAdvisor Cards (5/12) */}
              <div className="lg:col-span-5 bg-card rounded-lg border border-border p-6 overflow-hidden">
                <h3 className="text-lg font-semibold mb-4">
                  Recommended Locations
                </h3>
                <div className="overflow-y-auto max-h-[600px]">
                  <TripAdvisorCards locations={currentPlan.locations} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  No Itinerary Generated Yet
                </h3>
                <p className="text-sm">
                  Go back to the home page and click "Generate" to create your
                  personalized travel itinerary.
                </p>
              </div>
              <Button onClick={() => navigate("/")} className="mt-4">
                Go to Home Page
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
