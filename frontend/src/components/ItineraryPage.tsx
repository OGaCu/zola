import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../store/hooks";

const ItineraryPage = () => {
  const navigate = useNavigate();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

  // Simple markdown renderer for basic formatting
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return null;
    
    return markdown
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-primary">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-8 mb-4 text-primary">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-primary">{line.replace('# ', '')}</h1>;
        }
        
        // Bold text
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
              )}
            </p>
          );
        }
        
        // Bullet points
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Regular paragraphs
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Personalized Itinerary</h2>
              {currentPlan?.location && (
                <div className="text-sm text-muted-foreground">
                  {currentPlan.location} • {currentPlan.numPeople} {currentPlan.numPeople === 1 ? 'person' : 'people'} • {currentPlan.mood}
                </div>
              )}
            </div>
            
            {currentPlan?.itinerary ? (
              <div className="prose prose-sm max-w-none">
                {renderMarkdown(currentPlan.itinerary)}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Itinerary Generated Yet</h3>
                  <p className="text-sm">
                    Go back to the home page and click "Generate" to create your personalized travel itinerary.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/")}
                  className="mt-4"
                >
                  Go to Home Page
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
