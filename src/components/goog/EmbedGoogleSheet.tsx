import React from "react";
import Button from "@mui/material/Button";
import listMajors, { authorize } from "@/pages/api/google-sheets/sheets_test";

const handleClick = async () => {
    try {
        // Authorize the user
        const authClient = await authorize();

        // Call your API or function using the authorized client
        // await listMajors(authClient); // Uncomment if you want to call directly

        // Fetch from the API endpoint (ensure this is the correct path)
        const response = await fetch("/api/google-sheets/sheets_test");

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data);
    } catch (error) {
        console.error("Error fetching majors:", error);
    }
};

function EmbedGoogleSheet(props: any) {
    return (
        <Button
            onClick={handleClick}
            className='button button-contained'
            variant="contained"
        >
            Get Google Sheet
        </Button>
    );
}

export default EmbedGoogleSheet;
