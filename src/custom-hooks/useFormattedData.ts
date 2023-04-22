import { useCallback, useState } from "react";

type useFormattedDataType<T> = {
  formatted: T[];
  search: (term: string) => void;
  filter: (arr: ((value: T) => boolean)) => void;
  sortBy: (arr: string | ((a: T, b: T) => number)) => void;
  reset: () => void;
};

export const useFormattedData = <T>(initialState: Array<T> = []): useFormattedDataType<T> => {
  const [formatted, setFormatted] = useState(initialState);

  const search = useCallback((term: string = '') => {
    const termNorm = term.toLowerCase();
    setFormatted((oldValue) => oldValue.filter((value) => {
      let retVal = false;
      if (value !== null) {
        if (typeof value === 'object') {
          Object.keys(value).forEach((field) => {
            const fieldValue = `${(value as any)[field]}`.toLowerCase();
            if (fieldValue.search(termNorm) > -1) {
              retVal = true;
            }
          });
        } else {
          const fieldValue = `${value}`.toLowerCase();
          if (fieldValue.search(termNorm) > -1) {
            retVal = true;
          }
        }
      }

      return retVal;
    }));
  }, [setFormatted]);

  const filter = useCallback((arr: ((value: T) => boolean)) => {
    setFormatted((oldValue) => oldValue.filter(arr));
  }, [setFormatted]);

  const sortBy = useCallback((arr: string | ((a: T, b: T) => number)) => {
    if (typeof arr === 'string') {
      setFormatted((oldValue) => [...oldValue].sort((a: T, b: T) => {
        let retVal = 0;
        if ((a as any)[arr] < (b as any)[arr]) {
          retVal = -1;
        }
        if ((a as any)[arr] > (b as any)[arr]) {
          retVal = 1;
        }

        return retVal;
      }));
    } else {
      setFormatted((oldValue) => [...oldValue].sort(arr));
    }
  }, [setFormatted]);

  const reset = useCallback(() => {
    setFormatted(initialState);
  }, [setFormatted, initialState]);

  return { formatted, search, filter, sortBy, reset };
};
