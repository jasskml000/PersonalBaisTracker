import { useState, useEffect, useCallback } from 'react';

const useData = <T,>(fetcher: () => Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const depsReady = deps.every(dep => dep !== null && dep !== undefined);
    if (!depsReady) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData, refetch: fetchData };
};

export default useData;
