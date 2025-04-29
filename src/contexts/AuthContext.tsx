
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Check if the user is an admin
        setTimeout(async () => {
          try {
            const { data, error } = await supabase
              .from('admin_profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();

            if (error) throw error;
            setIsAdmin(!!data);
          } catch (error) {
            setIsAdmin(false);
            console.error('Error checking admin status:', error);
          }
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    // Check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check if the user is an admin
        const checkAdminStatus = async () => {
          try {
            const { data, error } = await supabase
              .from('admin_profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();

            if (error) throw error;
            setIsAdmin(!!data);
          } catch (error) {
            setIsAdmin(false);
            console.error('Error checking admin status:', error);
          } finally {
            setLoading(false);
          }
        };
        
        checkAdminStatus();
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Admin check will be handled by the auth state listener
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
