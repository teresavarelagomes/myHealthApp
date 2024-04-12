import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://localhost:3001';

//axiosClient.defaults.headers = {
//    'Content-Type': 'application/json',
//    Accept: 'application/json'
//};

//All request will wait 2 seconds before timeout
//axiosClient.defaults.timeout = 2000;

//axiosClient.defaults.withCredentials = true;

//GET
export async function getRequest(URL) {
    return await axiosClient.get(`${URL}`)
        .then(response => response);
}

//GET ALL FROM ALL PAGES
export async function getAllItems(URL, items = [], page = 0, size = 100) {
    try {
        const response = await axiosClient.get(URL, { params: { page, size } });
        
        // Extract items from the response and concatenate with existing items
        const newItems = response.data.content;
        items = items.concat(newItems); 

        // If there are more items in the next page, recursively fetch them
        if (response.data.last === false) {
            return getAllItems(URL, items, page + 1, size);
        }
    } catch (error) {
        console.log("Error all items: ");
        console.log(error.response);
    }

    // Return all items when no more pages are left
    return items;
}

//POST
export async function postRequest(URL, payload) {
    return await axiosClient.post(`${URL}`, payload)
        .then(response => response);
}

//PATCH
export async function patchRequest(URL, payload) {
    return await axiosClient.patch(`${URL}`, payload)
        .then(response => response);
}

//PUT
export async function putRequest(URL, payload) {
    return await axiosClient.put(`${URL}`, payload)
        .then(response => response);
}

//DELETE
export async function deleteRequest(URL) {
    return await axiosClient.delete(`${URL}`)
        .then(response => response);
}