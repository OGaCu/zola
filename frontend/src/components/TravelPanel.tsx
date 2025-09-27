import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight, GripVertical, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateCurrentPlan, setCurrentPlan } from "../store/slices/travelSlice";
import { Plan } from "../types";
import { deserializeDateRange, serializeDateRange } from "../utils/dateUtils";
import { itineraryService } from "../services";

interface TravelPanelProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onWidthChange?: (width: number) => void;
}

const TravelPanel = ({
  isCollapsed = false,
  onToggleCollapse = () => {},
  onWidthChange = () => {},
}: TravelPanelProps) => {
  const dispatch = useAppDispatch();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    deserializeDateRange({
      from: currentPlan?.dateFrom,
      to: currentPlan?.dateTo,
    })
  );
  const [location, setLocation] = useState(currentPlan?.location || "");
  const [numPeople, setNumPeople] = useState(currentPlan?.numPeople || 1);
  const [budget, setBudget] = useState(currentPlan?.budget || "");
  const [mood, setMood] = useState(currentPlan?.mood || "relaxing");
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = e.clientX;

    // If panel is collapsed and we're dragging, expand it first
    if (isCollapsed && newWidth > 200) {
      onToggleCollapse();
    }

    // Set the new width if within bounds
    if (newWidth > 200 && newWidth < 500) {
      onWidthChange(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Sync local state with Redux state
  React.useEffect(() => {
    if (currentPlan) {
      setDateRange(
        deserializeDateRange({
          from: currentPlan.dateFrom,
          to: currentPlan.dateTo,
        })
      );
      setLocation(currentPlan.location);
      setNumPeople(currentPlan.numPeople);
      setBudget(currentPlan.budget);
      setMood(currentPlan.mood);
    }
  }, [currentPlan]);

  const handleGenerate = async () => {
    const serializedDates = serializeDateRange(dateRange);
    const planData: Plan = {
      dateFrom: serializedDates.from,
      dateTo: serializedDates.to,
      location,
      numPeople: numPeople,
      budget,
      mood,
      images: currentPlan?.images || [],
    };

    // Update Redux state
    dispatch(setCurrentPlan(planData));
    // Generate itinerary using the service
    try {
      const result = await itineraryService.createItinerary(planData);

      if (result && result.status === "success") {
        console.log("Itinerary generated successfully:", result.data.itinerary);
        // You can add the itinerary to your state or display it here
      } else {
        console.error("Failed to generate itinerary:", result?.data?.error);
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
    }
  };

  const moodOptions = [
    { value: "relaxing", label: "Relaxing" },
    { value: "adventurous", label: "Adventurous" },
    { value: "romantic", label: "Romantic" },
    { value: "cultural", label: "Cultural" },
    { value: "foodie", label: "Foodie" },
  ];

  return (
    <div className="relative h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Handle buttons container */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 flex flex-col gap-1 z-20">
        {/* Expand/Collapse button - always visible */}
        <button
          onClick={onToggleCollapse}
          className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
          title={isCollapsed ? "Expand panel" : "Collapse panel"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          )}
        </button>

        {/* Drag handle - always visible */}
        <div
          className="cursor-col-resize bg-gray-200 p-1.5 rounded-full shadow-md hover:bg-gray-300 transition-colors select-none"
          onMouseDown={handleMouseDown}
          title={isCollapsed ? "Drag to expand panel" : "Drag to resize panel"}
        >
          <GripVertical className="h-3 w-3 text-gray-500" />
        </div>
      </div>

      {/* Collapsed state - shows icon at top */}
      {isCollapsed && (
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-center">
            <div className="min-w-12 h-12 bg-[#0abab5] rounded-full flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="p-6 flex flex-col h-full">
          <h1 className="text-4xl font-bold mb-6">Zola</h1>
          <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>

          <div className="space-y-6 flex-grow">
            {/* Date range picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Travel Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Location input */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Where do you want to go?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Number of people input */}
            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Input
                id="people"
                type="number"
                min="1"
                max="20"
                placeholder="How many people?"
                value={numPeople}
                onChange={(e) => setNumPeople(parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Budget input */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="Your budget (e.g. $1000)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* Mood dropdown */}
            <div className="space-y-2">
              <Label htmlFor="mood">Mood</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood">
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  {moodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate button */}
          <Button
            className="w-full mt-8 py-6 text-lg bg-[#0abab5]"
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelPanel;
