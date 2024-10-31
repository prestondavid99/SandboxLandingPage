// hooks/useCompanyExists.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';

const useCompanyExists = (session: any) => {
    const [companyExists, setCompanyExists] = useState<boolean>(false);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyId, setCompanyId] = useState<string>('');

    useEffect(() => {
        const checkCompany = async () => {
            if (session) {
                const { data, error } = await supabase
                    .from('user_company')
                    .select('company_id')
                    .eq('user_id', session.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching company:', error);
                    setCompanyExists(false);
                    return;
                }

                if (data) {
                    setCompanyExists(true);
                    setCompanyId(data.company_id.toString());

                    // Fetch the company name
                    const companyNameResponse = await supabase
                        .from('company')
                        .select('name')
                        .eq('id', data.company_id)
                        .single();

                    if (companyNameResponse.error) {
                        console.error('Error fetching company name:', companyNameResponse.error);
                        setCompanyExists(false);
                        return;
                    }

                    setCompanyName(companyNameResponse.data?.name || '');
                } else {
                    setCompanyExists(false);
                }
            }
        };

        checkCompany();
    }, [session]);

    return { companyExists, companyName, companyId };
};

export default useCompanyExists;
