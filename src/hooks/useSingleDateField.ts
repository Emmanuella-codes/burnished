import { formatDateToStorage } from "@/utils/formatDate";

type SingleDateConfig = {
  date: string | undefined;
  onUpdate: (value: string) => void;
};

export function useSingleDateField({ date, onUpdate }: SingleDateConfig) {
  const formatDateToMonthYear = (value: string): string => {
    const dateObj = new Date(value + '-01');
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleDateChange = (value: string) => {
    const formattedDate = formatDateToMonthYear(value);
    onUpdate(formattedDate);
  };

  const getInputValue = (): string => {
    return formatDateToStorage(date || '');
  };

  const getDisplayValue = (): string => {
    return date || '';
  };

  return {
    handleDateChange,
    getInputValue,
    getDisplayValue,
  };
}

// get current date in YYYY-MM format
const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const maxDate = getCurrentMonth();
