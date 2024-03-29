
import * as React from "react";
import * as RB from "rebass";

import { apiUploadDocumentS3 } from "../../API";


interface SelectedFile {
	name?: string,
	type?: string,
	size?: string,
	lastModifiedDate?: string
}

interface UploadProps {}

const Upload: React.FC<UploadProps> = props => {
	const [selected_file, setSelectedFile] = React.useState<SelectedFile[]>([]);
	const [is_selected, setIsSelected] = React.useState(false);
	const [file_contents, setFileContents] = React.useState('');

	console.log('Selected file:', selected_file);
	console.log('File Contents:', file_contents);

	const changeHandler = (event:any) => {
		const file_selected = event.target.files[0];
		const reader = new FileReader();
		const file = event.target.files[0];
		if (file) {
			reader.readAsText(file);
			reader.onloadend = event => {
			  setFileContents(event.target.result);
			};
		  }

		setSelectedFile(file_selected); // this an object that contains the details of files selected to be uploaded in a form
		setIsSelected(true);
	};

	// Send to API Gateway > S3
	const handleSubmit = () => {
		console.log('Handle Submit', selected_file);
		apiUploadDocumentS3(selected_file, file_contents);
	};


	return (
		<RB.Flex justifyContent="center" alignItems="center">
			<RB.Flex flexDirection="column">

				<input type="file" name="file" onChange={changeHandler} />
				{is_selected ? (
					<RB.Flex flexDirection="column">
						<p>Filename: {selected_file?.name}</p>
						<p>Filetype: {selected_file?.type}</p>
						<p>Size in bytes: {selected_file?.size}</p>
						<p>
							lastModifiedDate:{' '}
							{selected_file?.lastModifiedDate?.toLocaleDateString()}
						</p>
					</RB.Flex>
				) : (
					<p>Select a file to show details</p>
				)}
				<RB.Flex>
					<button onClick={handleSubmit}>Submit</button>
				</RB.Flex>

			</RB.Flex>
		</RB.Flex>
	)
}

export {
  Upload
}
