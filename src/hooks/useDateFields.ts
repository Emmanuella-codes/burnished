import { formatDateToStorage } from '@/utils/formatDate';
import { useState } from 'react';

type DateFieldsConfig = {
  startDate: string;
  endDate: string;
  onUpdate: (field: 'startDate' | 'endDate', value: string) => void;
};

export function useDateFields({ startDate, endDate, onUpdate }: DateFieldsConfig) {
  const [isPresent, setIsPresent] = useState(endDate === 'Present');

  const formatDateToMonthYear = (value: string): string => {
    const date = new Date(value + '-01');
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const formattedDate = formatDateToMonthYear(value);
    onUpdate(field, formattedDate);
  };

  const handlePresentToggle = () => {
    const newIsPresent = !isPresent;
    setIsPresent(newIsPresent);
    
    if (newIsPresent) {
      onUpdate('endDate', 'Present');
    } else {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      onUpdate('endDate', formatted);
    }
  };

  const getInputValue = (dateStr: string): string => {
    return formatDateToStorage(dateStr);
  };

  const getDisplayValue = (dateStr: string): string => {
    if (!dateStr || dateStr === 'Present') return dateStr;
    return dateStr; // already in display format
  };

  return {
    isPresent,
    handleDateChange,
    handlePresentToggle,
    getInputValue,
    getDisplayValue,
  };
}
