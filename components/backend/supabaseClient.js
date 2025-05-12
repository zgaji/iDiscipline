// supabaseClient.js (Force Supabase to Use Native WebSocket)
import { createClient } from '@supabase/supabase-js';

// ✅ Force Supabase to use Native WebSocket in Expo
global.WebSocket = global.WebSocket || window.WebSocket;

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
