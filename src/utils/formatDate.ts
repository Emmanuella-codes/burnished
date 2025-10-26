export const formatDateToDisplay = (dateStr: string): string => {
  if (!dateStr || dateStr === 'Present') return dateStr;
  
  // if already in "MMM YYYY" format, return as is
  if (/^[A-Z][a-z]{2} \d{4}$/.test(dateStr)) return dateStr;
  
  // if in "YYYY-MM" format, convert to "MMM YYYY"
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  return dateStr;
};

export const formatDateToStorage = (dateStr: string): string => {
  if (!dateStr || dateStr === 'Present') return dateStr;
  
  // if already in "YYYY-MM" format, return as is
  if (/^\d{4}-\d{2}$/.test(dateStr)) return dateStr;
  
  // if in "MMM YYYY" format, convert to "YYYY-MM"
  const months: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  const match = dateStr.match(/^([A-Z][a-z]{2}) (\d{4})$/);
  if (match) {
    const [, month, year] = match;
    return `${year}-${months[month]}`;
  }
  
  return dateStr;
};
