// hooks/useCompanyExists.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

const useUserSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUserSession = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (sessionError) { 
                console.error('Error fetching session:', sessionError.message);
            } else {    
                setSession(session);
            }        

            if (userError) {
                console.error('Error fetching user:', userError.message);
            } else {    
                setUser(user);
            }
        };

        checkUserSession();
    }, []);

    return { user, session };
};

export default useUserSession;
