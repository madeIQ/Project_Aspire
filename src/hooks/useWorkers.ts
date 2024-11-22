import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Worker } from '../types';
import toast from 'react-hot-toast';

export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchWorkers = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from('workers')
          .select('*')
          .order('name');

        if (supabaseError) throw supabaseError;
        if (!mounted) return;

        setWorkers(
          (data ?? []).map((worker) => ({
            ...worker,
            lastCheckIn: new Date(worker.last_check_in),
            nextCheckIn: new Date(worker.next_check_in),
          }))
        );
      } catch (err) {
        if (!mounted) return;
        const error = err as Error;
        setError(error);
        toast.error('Failed to load workers: ' + error.message);
        console.error('Error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkers();

    const subscription = supabase
      .channel('workers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workers' }, 
        () => fetchWorkers()
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const updateWorkerStatus = async (id: string, status: Worker['status']) => {
    try {
      const { error: updateError } = await supabase
        .from('workers')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;
      toast.success(`Worker status updated to ${status}`);
    } catch (err) {
      const error = err as Error;
      toast.error('Failed to update status: ' + error.message);
      console.error('Error:', error);
    }
  };

  return { workers, loading, error, updateWorkerStatus };
}