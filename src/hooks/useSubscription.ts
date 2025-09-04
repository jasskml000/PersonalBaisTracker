import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

type Payload<T> = {
  new: T;
  old: T;
};

interface UseSubscriptionOptions<T> {
  channelName: string;
  table: string;
  onInsert?: (record: T) => void;
  onUpdate?: (record: T) => void;
  onDelete?: (record: T) => void;
}

export const useSubscription = <T,>(options: UseSubscriptionOptions<T>) => {
  const { channelName, table, onInsert, onUpdate, onDelete } = options;

  useEffect(() => {
    const channel = supabase
      .channel(channelName)
      .on<T>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table },
        (payload: Payload<T>) => {
          if (onInsert) onInsert(payload.new);
        }
      )
      .on<T>(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table },
        (payload: Payload<T>) => {
          if (onUpdate) onUpdate(payload.new);
        }
      )
      .on<T>(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table },
        (payload: Payload<T>) => {
          if (onDelete) onDelete(payload.old);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName, table, onInsert, onUpdate, onDelete]);
};
