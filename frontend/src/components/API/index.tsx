import { API } from "../../config-dev.json";


const handleSubmission = (selected_file:any) => {
    const formData = new FormData();

    formData.append('File', selected_file);

    fetch(`${API}/key`, {
            method: 'GET',
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


export {
    handleSubmission
}
