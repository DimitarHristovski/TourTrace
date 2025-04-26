import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';

export interface UserPreferences {
  language: string;
  currency: string;
  travelInterests: string[];
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  preferredTransportation: string[];
  budget: {
    accommodation: string;
    food: string;
    activities: string;
    transportation: string;
  };
  travelStyle: string;
}

const defaultPreferences: UserPreferences = {
  language: 'en',
  currency: 'USD',
  travelInterests: [],
  dietaryRestrictions: [],
  accessibilityNeeds: [],
  preferredTransportation: ['walking', 'public transit'],
  budget: {
    accommodation: 'moderate',
    food: 'moderate',
    activities: 'moderate',
    transportation: 'moderate',
  },
  travelStyle: 'balanced',
};

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => Promise<void>;
  loading: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setPreferences(defaultPreferences);
      setLoading(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferences')
        .eq('user_id', user?.id)
        .limit(1);

      if (error) {
        console.error('Error fetching preferences:', error);
        return;
      }

      // If we have data and it's not empty, use the first result
      if (data && data.length > 0) {
        setPreferences(data[0].preferences as UserPreferences);
      } else {
        // If no preferences found, use defaults and create a new record
        setPreferences(defaultPreferences);
        if (user) {
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert({
              user_id: user.id,
              preferences: defaultPreferences,
            });

          if (insertError) {
            console.error('Error creating default preferences:', insertError);
          }
        }
      }
    } catch (err) {
      console.error('Error in fetchPreferences:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      setLoading(true);
      const updatedPreferences = { ...preferences, ...newPreferences };
      setPreferences(updatedPreferences);

      const { error } = await supabase
        .from('user_preferences')
        .update({ preferences: updatedPreferences })
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating preferences:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    preferences,
    updatePreferences,
    loading,
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};