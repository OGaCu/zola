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
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

interface TravelPanelProps {
  onGenerate?: (params: {
    date: Date | undefined;
    location: string;
    budget: string;
    mood: string;
  }) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const TravelPanel = ({
  onGenerate = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {},
}: TravelPanelProps) => {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [mood, setMood] = useState("relaxing");

  const handleGenerate = () => {
    onGenerate({
      date,
      location,
      budget,
      mood,
    });
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
      {/* Drag handle */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 cursor-move bg-gray-200 p-1 rounded-full">
        <GripVertical className="h-4 w-4 text-gray-500" />
      </div>

      {/* Collapse/Expand button */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {!isCollapsed && (
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>

          <div className="space-y-6 flex-grow">
            {/* Date picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Travel Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
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
          <Button className="w-full mt-8 py-6 text-lg" onClick={handleGenerate}>
            Generate
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelPanel;
