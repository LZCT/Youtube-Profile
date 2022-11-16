import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://kprqnqeejresdacfcaou.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcnFucWVlanJlc2RhY2ZjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMjksImV4cCI6MTk4Mzc3MDIyOX0.HYTP-tipGhRL7b6RuS0s7JfV9mZMKyRVC0H0f66o80c";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService(){
    return {
        getAllVideos(){
            return supabase.from("video")
                .select("*");
        }
    }
}