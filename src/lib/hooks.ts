import { useState, useEffect } from "react";
import { TJobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (searchText.length === 0) return;
    setIsLoading(true);
    const fetctData = async () => {
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await response.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    };

    fetctData();
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
}
