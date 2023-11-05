import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pmpxsnzgesvvvetnflve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcHhzbnpnZXN2dnZldG5mbHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTA0MDcsImV4cCI6MjAwOTU2NjQwN30.bsn9mwogzr0mFekDueSeNdOiFXgMkTvAp4Fo1F8nWGo"
);

