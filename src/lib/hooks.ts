import { useState, useEffect } from "react";
import { TJobItem, TJobItemExpand } from "./types";
import { BASE_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };
    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  return activeId;
}

export function useJobItemContent(id: number | null) {
  const [jobItemContent, setJobItemContent] = useState<TJobItemExpand | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItemContent(data.jobItem);
    };

    fetchData();
  }, [id]);

  return [jobItemContent, isLoading] as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfJobs = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (searchText.length === 0) return;
    setIsLoading(true);
    const fetctData = async () => {
      const response = await fetch(`${BASE_URL}?search=${searchText}`);
      const data = await response.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    };

    fetctData();
  }, [searchText]);

  return { jobItems: jobItemsSliced, isLoading, totalNumberOfJobs } as const;
}

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  });

  return debounceValue;
}
