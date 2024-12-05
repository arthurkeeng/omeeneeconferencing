import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


interface DateFormatter {
  formattedHours : number , mins : number , amOrPm : string,  formattedDate : string}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function dateFormatter() : DateFormatter{
  const time = new Date()

  
  const hours = time.getHours()
  const formattedHours = hours > 12 ? hours -12 : hours
  const mins = time.getMinutes()
  const amOrPm = hours < 12  ?"AM"  : "PM"
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Extract day, date, month, and year
  const day = daysOfWeek[time.getDay()];
  const month = monthsOfYear[time.getMonth()];
  const dayOfMonth = time.getDate();
  const year = time.getFullYear();
  
  // Add ordinal suffix to the day of the month (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const getOrdinalSuffix = (day : number) => {
    if (day > 3 && day < 21) return 'th'; // For 11th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const formattedDate = `${day} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}, ${month}, ${year}`;
  return {formattedHours , mins , amOrPm ,  formattedDate}
}
