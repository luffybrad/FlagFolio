export function getCardClass(continent: string) : string {
  switch (continent) {
    case 'Antarctic':
      return 'bg-blue-grey lighten-4';
    case 'Africa':
      return 'bg-green lighten-4';
    case 'Americas':
      return 'bg-blue lighten-4';
    case 'Asia':
      return 'bg-orange lighten-4';
    case 'Europe':
      return 'bg-purple lighten-4';
    case 'Oceania':
      return 'bg-teal lighten-4';
    default:
      return 'bg-grey lighten-4'; // Default class if continent is unknown
  }
}
