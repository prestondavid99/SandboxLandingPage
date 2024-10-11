// types.ts (or any appropriate file)

// Database Types
export type Company = {
    id: number; // or string, depending on your database schema
    name: string;
    quickbooks_company_id: string;
};


// QuickBooks Types
export type ColData = {
    value: string;
    id?: string;
}

export type Row = {
    Header?: { ColData: ColData[] };
    Rows?: { Row: Row[] };
    ColData?: ColData[];
    Summary?: { ColData: ColData[] };
    type?: string;
}