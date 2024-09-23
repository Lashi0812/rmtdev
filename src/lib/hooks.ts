import { useState, useEffect } from "react";
import { TJobItem, TJobItemExpand } from "./types";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

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

type JobContentApiResponse = {
  public: boolean;
  jobItem: TJobItemExpand;
};
const fetchJobContent = async (id: number): Promise<JobContentApiResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItemContent(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobContent(id) : null),
    {
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
      staleTime: 1000 * 60 * 60,
    }
  );

  return {
    jobItemContent: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

const fectchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fectchJobItems(searchText),
    {
      enabled: Boolean(searchText),
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
      staleTime: 1000 * 60 * 60,
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
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
