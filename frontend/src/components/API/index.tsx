import { API } from "../../config-dev.json";


const handleSubmission = (selected_file:any) => {
    const formData = new FormData();

    formData.append('File', selected_file);

    fetch(`${API}=${process.env.key}`, {
            method: 'POST',
            body: formData,
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return {
        response:"response"
    }
};


export {
    handleSubmission
}
