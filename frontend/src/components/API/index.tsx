import { API } from "../../config-dev.json";


const apiUploadDocumentS3 = (selected_file:any) => {
    const formData = new FormData();

    const body = formData.append('File', selected_file);

    fetch(`${API}/upload`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(body)
    
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
        return result;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error;
    });
};

const apiGetDocumentS3 = () => {

    fetch(`${API}/library`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
        return result;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error;
    });
}


export {
    apiUploadDocumentS3,
    apiGetDocumentS3
}
