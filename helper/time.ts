export function formatDate(timestamp: string): string {
    const dateObj = new Date(timestamp);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase()
      .replace(',', '');
  
    return formattedDate;
}

export function getTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours === 1) {
    return '1 hour ago';
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(hours / 24);
    if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  }
}