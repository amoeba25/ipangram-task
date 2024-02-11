import { startOfWeek, endOfWeek, addDays, startOfDay } from "date-fns";

export const getWeek = (date) => {
  /*
    returns the starting day of the week (monday) and the last working day of the week (friday)
    */

  // Get the current date
  const currentDate = date ? new Date(date) : new Date();

  // Get the first day of the week (Sunday) and the last day of the week (Saturday)
  const monday = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday is the start of the week
  const tuesday = addDays(monday, 1);
  const wednesday = addDays(monday, 2);
  const thursday = addDays(monday, 3);
  const friday = addDays(monday, 4);

  return { monday, tuesday, wednesday, thursday, friday };
};

export const getDateFormatted = (date) => {
  /*

    */
  return date.toLocaleDateString("en-US", {
    month: "short", // Short month name (e.g., "Feb")
    day: "numeric", // Numeric day (e.g., "11")
    year: "numeric", // Full year (e.g., "2024")
  });
};
