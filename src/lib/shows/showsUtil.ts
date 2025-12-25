import rawShows from '$lib/assets/shows.json';

export interface Show {
  date: string;
  venue: string;
  location: string;
  rawDate: Date;
}

export function getSortedShows() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare only dates

  const allShows: Show[] = rawShows.map((show) => ({
    ...show,
    rawDate: new Date(show.date),
    // Format: "March 15, 2025"
    date: new Date(show.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  const upcoming = allShows
    .filter((show) => show.rawDate >= today)
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

  const past = allShows
    .filter((show) => show.rawDate < today)
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  return { upcoming, past };
}
