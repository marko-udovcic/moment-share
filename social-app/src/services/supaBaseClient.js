// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygsysrwakrgagatsjazh.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnc3lzcndha3JnYWdhdHNqYXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NDI3MDAsImV4cCI6MjA1MTQxODcwMH0.fB93PTPyAXHbUg08f73H7mZXh_USwCfPOVikKIPUhwk";
// Create a single instance of Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
