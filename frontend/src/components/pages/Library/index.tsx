
import * as React from "react";
import * as RB from "rebass";

import { apiGetDocumentS3 } from "../../API";


interface LibraryProps {}

const Library: React.FC<LibraryProps> = props => {
  const [documents, setDocuments] = React.useState([]);

  console.log('Documents:', documents);

  React.useEffect(() => {
      const response = apiGetDocumentS3();
      console.log('Lib response:', response);
      // setDocuments([...documents, response])
    
  }, []);

  return (
    <RB.Flex flexDirection="column">
      <RB.Flex>
        <RB.Text>Documents Titles:</RB.Text>
        {/* <RB.Box>{documents?.map(item => {
          <RB.Flex>{item}</RB.Flex>
        })}</RB.Box> */}
      </RB.Flex>
    </RB.Flex>
  )
}

export {
  Library
}

/*
Notes:
  Create category lists
  Display categories here
    Display transformed docs here
*/
