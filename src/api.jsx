const API_BASE_URL = "https://dogapi.dog/api/v2";

async function fetchBreeds() {
    const response = await fetch(`${API_BASE_URL}/breeds`);
    if (!response.ok) {
        throw new Error('Could not fetch breeds');
    }
    return response.json();
}

export { fetchBreeds };