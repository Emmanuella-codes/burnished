import { useRef } from 'react';

export function useCursorPreservingChange<T extends HTMLInputElement | HTMLTextAreaElement>() {
  const refs = useRef<{ [key: string]: T | null }>({});

  const handleChange = (key: string, callback: () => void) => {
    const input = refs.current[key];
    const cursorPos = input?.selectionStart ?? 0;

    callback(); // execute the store update

    requestAnimationFrame(() => {
      if (input) {
        input.setSelectionRange(cursorPos, cursorPos);
      }
    });
  };

  const setRef = (key: string) => (el: T | null) => {
    refs.current[key] = el;
  };

  return { handleChange, setRef, refs };
};
