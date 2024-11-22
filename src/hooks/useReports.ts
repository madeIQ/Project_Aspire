import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DailyReport } from '../types';
import toast from 'react-hot-toast';

export function useReports() {
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchReports = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from('daily_reports')
          .select('*')
          .order('date', { ascending: false });

        if (supabaseError) throw supabaseError;
        if (!mounted) return;

        setReports(
          (data ?? []).map((report) => ({
            ...report,
            date: new Date(report.date),
          }))
        );
      } catch (err) {
        if (!mounted) return;
        const error = err as Error;
        setError(error);
        toast.error('Failed to load reports: ' + error.message);
        console.error('Error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchReports();

    const subscription = supabase
      .channel('daily_reports')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_reports' },
        () => fetchReports()
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { reports, loading, error };
}