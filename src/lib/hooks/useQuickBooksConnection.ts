// hooks/useQuickBooksConnection.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { apiProviderKey } from '@/constants/config';

const useQuickBooksConnection = (session: any, companyId: string | null) => {
    const [quickbooksCompanyId, setQuickbooksCompanyId] = useState<string | null>(null);
    const [qbExpiresAt, setQbExpiresAt] = useState<Date | null>(null);

    useEffect(() => {
        const checkQuickBooksConnection = async () => {
            if (session && companyId) {
                const { data, error } = await supabase
                    .from('provider_company')
                    .select('provider_company_id')
                    .eq('company_id', companyId)
                    .eq('provider_id', apiProviderKey['quickbooks'])
                    .single();

                if (error) {
                    console.error('Error fetching QuickBooks company ID:', error);
                    setQuickbooksCompanyId(null);
                    return;
                }

                setQuickbooksCompanyId(data.provider_company_id || null);

                const tokenResponse = await supabase
                    .from('api_token')
                    .select('expiration_datetime')
                    .eq('company_id', companyId)
                    .eq('provider_id', apiProviderKey['quickbooks'])
                    .eq('type', 'Access')
                    .single();

                if (tokenResponse.error) {
                    console.error('Error fetching QuickBooks token expiration:', tokenResponse.error);
                    setQbExpiresAt(null);
                    return;
                }

                setQbExpiresAt(new Date(tokenResponse.data.expiration_datetime));
            }
        };

        checkQuickBooksConnection();
    }, [session, companyId]);

    return { quickbooksCompanyId, qbExpiresAt };
};

export default useQuickBooksConnection;
