
import * as React from "react";
import * as RB from "rebass";

import { apiGetDocumentS3 } from "../../API";


interface LibraryProps {}

const Library: React.FC<LibraryProps> = props => {
  const [documents, setDocuments] = React.useState<object[]>();

  console.log('Documents:', documents);

  React.useEffect(() => {
    const result = apiGetDocumentS3()
    console.log('GET s3 response:', result)
    // @ts-ignore
    // setDocuments([...documents, result])
  }, []);

  return (
    <RB.Flex flexDirection="column">
      <RB.Flex>
        <RB.Text>Documents:</RB.Text>
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
