
import * as React from "react";
import * as RB from "rebass";

import { apiGetDocumentS3 } from "../../API";

/**************************** Styles ***************************************/
const container = {
	padding: "10px"
}
const title = {
	fontSize:"20px"
}

interface DocumentsProps {
	key: string;
	doc: string;
}

/**************************** Interfaces ***************************************/

interface LibraryProps {}

/*******************************************************************/

const Library: React.FC<LibraryProps> = () => {
	const [documents, setDocuments] = React.useState<DocumentsProps[]>([]);
	const [select_doc, setSelectDoc] = React.useState('');

	console.log('Documents:', documents);

	React.useEffect(() => {
		async function getS3Docs() {
			const response = await apiGetDocumentS3();
			const data = await response.json();
			setDocuments(data.results_text);
		}
		getS3Docs()
	}, []);

	const handleTitleClick = (item:any) => {
		console.log('Title Clicked:', item);
		setSelectDoc(item)
	}

	return (
		<RB.Box style={container}>
			<RB.Flex style={container}>
				<RB.Flex flexDirection="column">
					<RB.Text style={title}>Documents Titles:</RB.Text>
						<RB.Box>{documents.map((item:DocumentsProps) => (
							<RB.Flex style={container} key={item.key}>
								<RB.Text onClick={() => handleTitleClick(item.doc)}>{item.key}</RB.Text>
							</RB.Flex>
						))}
						</RB.Box>
				</RB.Flex >
			{select_doc &&
			<RB.Flex flexDirection="column">
				<RB.Text style={title}>Text Preview</RB.Text>
				<RB.Flex>
					<RB.Text>{select_doc}</RB.Text>
				</RB.Flex>
			</RB.Flex>}
			</RB.Flex>
		</RB.Box>
		)
	}

export {
	Library
}
