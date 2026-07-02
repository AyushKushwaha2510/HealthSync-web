export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
