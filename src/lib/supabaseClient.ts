import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const eventbriteToken = import.meta.env.VITE_EVENTBRITE_TOKEN;
export const eventbriteClientSecret = import.meta.env.VITE_EVENTBRITE_CLIENT_SECRET;
export const eventbritePublicToken = import.meta.env.VITE_EVENTBRITE_PUBLIC_TOKEN;
export const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const rapidApiKey = 'ca216c1575msh5615719b6340d0bp1fd9dcjsnf6c09fd2a2ee';