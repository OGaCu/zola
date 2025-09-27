/**
 * Utility functions for handling date serialization/deserialization
 * in Redux state management
 */

/**
 * Converts a Date object to ISO string for Redux storage
 */
export const serializeDate = (date: Date | undefined): string | undefined => {
  return date?.toISOString();
};

/**
 * Converts an ISO string to Date object for component usage
 */
export const deserializeDate = (
  dateString: string | undefined
): Date | undefined => {
  return dateString ? new Date(dateString) : undefined;
};

/**
 * Converts a DateRange object to serialized format for Redux storage
 */
export const serializeDateRange = (
  dateRange: { from?: Date; to?: Date } | undefined
) => {
  return {
    from: dateRange?.from?.toISOString(),
    to: dateRange?.to?.toISOString(),
  };
};

/**
 * Converts serialized date range to DateRange object for component usage
 */
export const deserializeDateRange = (
  dateRange: { from?: string; to?: string } | undefined
) => {
  return {
    from: dateRange?.from ? new Date(dateRange.from) : undefined,
    to: dateRange?.to ? new Date(dateRange.to) : undefined,
  };
};

/**
 * Formats a date string for display
 */
export const formatDateString = (dateString: string | undefined): string => {
  return dateString ? new Date(dateString).toLocaleDateString() : "Not set";
};

/**
 * Formats a date range for display
 */
export const formatDateRange = (
  dateFrom: string | undefined,
  dateTo: string | undefined
): string => {
  if (dateFrom && dateTo) {
    return `${formatDateString(dateFrom)} - ${formatDateString(dateTo)}`;
  } else if (dateFrom) {
    return formatDateString(dateFrom);
  }
  return "Not set";
};
