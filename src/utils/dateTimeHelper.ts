import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDate = (dateString: string) => {
  try {
    const parsedDate = parseISO(dateString);
    return `${formatDistanceToNow(parsedDate, { addSuffix: false, includeSeconds: false  })} ago`;
  } catch {
    return dateString;
  }
};
