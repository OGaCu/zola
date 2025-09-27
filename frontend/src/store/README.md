# Redux Store Setup

This directory contains the Redux store configuration and state management for the Zola travel planning application.

## Structure

```
store/
├── index.ts          # Store configuration and root state types
├── hooks.ts          # Typed Redux hooks
├── actions.ts        # Action creators and custom hooks
├── slices/
│   ├── travelSlice.ts    # Travel plan state management
│   └── imageSlice.ts     # Image state management
└── README.md         # This file
```

## Types

**Note**: Dates are stored as ISO strings in Redux state for serialization compatibility. Components should convert to/from Date objects as needed.

### Plan Interface

```typescript
interface Plan {
  dateFrom: string | undefined;
  dateTo: string | undefined;
  location: string;
  numberOfPeople: number;
  budget: string;
  mood: string;
  images: Image[];
}
```

### Image Interface

```typescript
interface Image {
  id: string;
  url: string;
  description: string;
  altText: string;
  tags: string[];
}
```

## Usage

### Using Redux Hooks

```typescript
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setCurrentPlan } from "../store/slices/travelSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const currentPlan = useAppSelector((state) => state.travel.currentPlan);

  const handleSetPlan = (plan: Plan) => {
    dispatch(setCurrentPlan(plan));
  };

  return (
    <div>{currentPlan && <p>Current location: {currentPlan.location}</p>}</div>
  );
};
```

### Using Action Creators

```typescript
import { useTravelActions, useImageActions } from "../store/actions";

const MyComponent = () => {
  const { setCurrentPlan, addPlan } = useTravelActions();
  const { setImages, selectImage } = useImageActions();

  const handleCreatePlan = (plan: Plan) => {
    setCurrentPlan(plan);
    addPlan(plan);
  };

  return <div>...</div>;
};
```

## Available Actions

### Travel Actions

- `setCurrentPlan(plan: Plan)` - Set the current travel plan
- `updateCurrentPlan(updates: Partial<Plan>)` - Update current plan with partial data
- `addPlan(plan: Plan)` - Add a new plan to the plans array
- `removePlan(location: string)` - Remove a plan by location
- `clearCurrentPlan()` - Clear the current plan
- `addImagesToCurrentPlan(images: Image[])` - Add images to current plan
- `removeImageFromCurrentPlan(imageId: string)` - Remove image from current plan by ID
- `setLoading(loading: boolean)` - Set loading state
- `setError(error: string | null)` - Set error state

### Image Actions

- `setImages(images: Image[])` - Set the images array
- `addImages(images: Image[])` - Add images to existing array
- `removeImage(url: string)` - Remove image by URL
- `selectImage(url: string)` - Select an image
- `deselectImage(url: string)` - Deselect an image
- `clearSelectedImages()` - Clear all selected images
- `clearImages()` - Clear all images
- `setLoading(loading: boolean)` - Set loading state
- `setError(error: string | null)` - Set error state

## State Structure

```typescript
interface RootState {
  travel: {
    currentPlan: Plan | null;
    plans: Plan[];
    isLoading: boolean;
    error: string | null;
  };
  image: {
    images: Image[];
    selectedImages: string[];
    isLoading: boolean;
    error: string | null;
  };
}
```

## Date Utilities

For handling date serialization/deserialization, use the utility functions in `/src/utils/dateUtils.ts`:

```typescript
import {
  serializeDateRange,
  deserializeDateRange,
  formatDateRange,
} from "../utils/dateUtils";

// Convert DateRange to serialized format for Redux
const serialized = serializeDateRange({ from: new Date(), to: new Date() });

// Convert serialized dates back to DateRange for components
const dateRange = deserializeDateRange({
  from: "2024-01-01",
  to: "2024-01-07",
});

// Format dates for display
const displayText = formatDateRange("2024-01-01", "2024-01-07");
```

## Examples

See `PlanDisplay.tsx` for a complete example of how to use the Redux state in a component.
