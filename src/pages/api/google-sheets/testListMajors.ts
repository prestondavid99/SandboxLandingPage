import { authorize, listMajors } from './sheets_test';  // Import the functions from your main script

// Function to test listMajors
async function testListMajors() {
    try {
        // Authorize and get the OAuth2 client
        const authClient = await authorize();

        // Run the listMajors function with the authorized client
        await listMajors(authClient);

    } catch (error) {
        console.error('Error during test:', error);
    }
}

testListMajors()
