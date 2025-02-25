import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { Broadcast } from "@/schemas/main";
import { queryOptions } from "@tanstack/react-query";

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

// Map day strings to dayjs day numbers (0 = Sunday, 1 = Monday, etc.)
const dayMap: Record<string, number> = {
  Sundays: 0,
  Mondays: 1,
  Tuesdays: 2,
  Wednesdays: 3,
  Thursdays: 4,
  Fridays: 5,
  Saturdays: 6,
};

/**
 * Calculate time until the next episode based on broadcast information
 * @param broadcast The broadcast information from the anime data
 * @returns Object containing next episode date and human-readable time until next episode
 */
export function getTimeUntilNextEpisode(broadcast: Broadcast) {
  if (!broadcast || !broadcast.day || !broadcast.time) {
    return {
      nextEpisode: null,
      timeUntil: "Unknown",
    };
  }

  // Get the day number (0-6) from the broadcast day
  const broadcastDayNumber = dayMap[broadcast.day];
  if (broadcastDayNumber === undefined) {
    return {
      nextEpisode: null,
      timeUntil: "Unknown broadcast day",
    };
  }

  // Parse broadcast time (format: "HH:MM")
  const [hours, minutes] = broadcast.time.split(":").map(Number);

  // Get current date in user's timezone
  const now = dayjs();

  // Get current day number (0-6)
  const currentDayNumber = now.day();

  // Calculate days until next broadcast
  let daysUntil = broadcastDayNumber - currentDayNumber;
  if (daysUntil < 0) {
    daysUntil += 7; // Add a week if the broadcast day has already passed this week
  }

  // If it's the same day, check if the broadcast time has already passed
  if (daysUntil === 0) {
    const currentHour = now.hour();
    const currentMinute = now.minute();

    // If broadcast time has passed today, move to next week
    if (
      currentHour > hours ||
      (currentHour === hours && currentMinute >= minutes)
    ) {
      daysUntil = 7;
    }
  }

  // Create the next episode date in the broadcast timezone
  const nextEpisode = dayjs()
    .tz(broadcast.timezone)
    .day(now.day() + daysUntil)
    .hour(hours)
    .minute(minutes)
    .second(0);

  // Convert to user's local timezone
  const localNextEpisode = nextEpisode.local();

  // Get human-readable time until next episode
  const timeUntil = now.to(localNextEpisode);

  return {
    nextEpisode: localNextEpisode,
    timeUntil,
    formattedNextEpisode: localNextEpisode.format(
      "ddd, MMM D, YYYY [at] h:mm A"
    ),
  };
}

/**
 * Create a query options object for prefetching next episode time
 * @param animeId The unique ID of the anime
 * @param broadcast The broadcast information
 * @returns Query options for React Query
 */
export const createNextEpisodeQueryOptions = (
  animeId: number,
  broadcast: Broadcast
) => {
  return queryOptions({
    queryKey: ["nextEpisode", animeId],
    queryFn: () => getTimeUntilNextEpisode(broadcast),
    // Refetch every hour to keep the countdown updated
    refetchInterval: 60 * 60 * 1000,
    // Keep the data fresh for 1 hour
    staleTime: 60 * 60 * 1000,
  });
};

/**
 * Create batch query options for prefetching multiple anime next episode times
 * @param animeList Array of anime data with ID and broadcast information
 * @returns Query options for React Query
 */
export const createBatchNextEpisodeQueryOptions = (
  animeList: Array<{ mal_id: number; broadcast: Broadcast }>
) => {
  return queryOptions({
    queryKey: ["nextEpisodes", "batch"],
    queryFn: () => {
      const results = animeList.reduce(
        (acc, anime) => {
          if (anime.broadcast && anime.broadcast.day && anime.broadcast.time) {
            acc[anime.mal_id] = getTimeUntilNextEpisode(anime.broadcast);
          }
          return acc;
        },
        {} as Record<number, ReturnType<typeof getTimeUntilNextEpisode>>
      );

      return results;
    },
    // Refetch every hour to keep the countdown updated
    refetchInterval: 60 * 60 * 1000,
    // Keep the data fresh for 1 hour
    staleTime: 60 * 60 * 1000,
  });
};
