
import * as React from "react";
import * as RB from "rebass";

import { apiUploadDocumentS3 } from "../../API";


interface UploadProps {}

const Upload: React.FC<UploadProps> = props => {
	const [selected_file, setSelectedFile] = React.useState([]);
	const [is_selected, setIsSelected] = React.useState(false);

	console.log('Selected file:', selected_file);

	const changeHandler = (event:any) => {
		const file = event.target.files[0];

		console.log("Raw file:", file);
		setSelectedFile(file); // this an object that contains the details of files selected to be uploaded in a form
		setIsSelected(true);
	};

	// Send to API Gateway > S3
	const handleSubmit = () => {
		console.log('Handle Submit', selected_file);
		apiUploadDocumentS3(selected_file);
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
