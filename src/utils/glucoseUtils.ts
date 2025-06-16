export const getGlucoseRange = (value: number): 'normal' | 'high' | 'low' | 'critical-low' | 'critical-high' => {
  if (value < 54) return 'critical-low';
  if (value < 70) return 'low';
  if (value <= 180) return 'normal';
  if (value <= 250) return 'high';
  return 'critical-high';
};

export const getGlucoseColor = (value: number): string => {
  const range = getGlucoseRange(value);
  switch (range) {
    case 'critical-low':
    case 'critical-high':
      return 'text-red-600';
    case 'low':
    case 'high':
      return 'text-yellow-600';
    case 'normal':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export const getGlucoseBgColor = (value: number): string => {
  const range = getGlucoseRange(value);
  switch (range) {
    case 'critical-low':
    case 'critical-high':
      return 'bg-red-50 border-red-200';
    case 'low':
    case 'high':
      return 'bg-yellow-50 border-yellow-200';
    case 'normal':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};