'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export default function NotificationsPage() {
  useEffect(() => {

    // Listen to inserts
    supabase
      .channel('donations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public' }, (change) => {
        console.log(change);
      })
      .subscribe()
  }, [])
  return (
    <section>

    </section>
  )
}
