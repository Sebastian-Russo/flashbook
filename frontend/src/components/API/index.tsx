import { API } from "../../config-dev.json";


const apiUploadDocumentS3 = async (selected_file:any, file_contents:string) => {
    console.log("API Selected file:", selected_file);
    // const formData = new FormData();
    // const body = formData.append('content', selected_file, selected_file.name);
    // console.log('File appended:', body);

    // Buffer.from(selected_file).toString('base64')
    // console.log("Contents of file:", selected_file);
    // const body = Buffer.from(selected_file).toString('base64');
    // console.log("Contents of body:", body);

    // const blob = new Blob([file_contents], { type: 'text/plain' });
    // const myFile = new File([blob], { type: 'text/plain' });

    const body = {
        name: selected_file.name,
        size: selected_file.size,
        type: selected_file.type,
        content: file_contents
    }

    console.log('File body:', body);

    const response = await fetch(`${API}/upload`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                // "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                "Accepts": "application/json"
            },
    })
    console.log('Upload Response:', await response.json());

    return response;
};

const apiGetDocumentS3 = async () => {

    const response = await fetch(`${API}/library`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Content-Type": "application/json",
            "Accepts": "application/json",
        },
    })

    console.log('GET Response:', await response.json());

    return response;
}


export {
    apiUploadDocumentS3,
    apiGetDocumentS3
}
