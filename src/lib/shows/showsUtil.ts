import rawShows from '$lib/assets/shows.json';

export interface Show {
  venue: string;
  location: string;
  title?: string;
  rawDate: string;
  date: Date;
  displayDate: string;
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // LOCAL midnight
}

export function getSortedShows() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare only dates

  
  const allShows: Show[] = rawShows.map((show) => {
    const date = parseLocalDate(show.date)
    
    return {
    ...show,
    rawDate: show.date,
    date,
    // Format: "March 15, 2025"
    displayDate: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }});

  const upcoming = allShows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const past = allShows
    .filter((show) => show.date < today)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return { upcoming, past };
}
