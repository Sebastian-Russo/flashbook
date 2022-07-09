import * as React from "react";
import * as RB from "rebass";

import { Nav, PageSelection } from "./nav"
import { LibraryPage } from "./LibraryPage";
import { LoginPage } from "./LoginPage";
import { ReadingPage } from "./ReadingPage";
import { UploadPage } from "./UploadPage";


const page_map: Record<PageSelection, {title: string, Page: typeof React.Component | React.FC}> = {
	library: {
		title: "Library",
		Page: LibraryPage,
	},
	login: {
		title: "Login",
		Page: LoginPage,
	},
	reading: {
		title: "Support Chat",
		Page: ReadingPage,
	},
	upload: {
		title: "Upload Docs",
		Page: UploadPage
	}
}

const App: React.FC = () => {
	const [selected_page, setSelectedPage] = React.useState<PageSelection>("upload");

	const PageComponent = page_map[selected_page!]?.Page;
	const page_title = page_map[selected_page!]?.title;


	return (
		<RB.Flex style={{width: "100%"}} flexDirection="column">

			<Nav
				page_title={page_title}
				// @ts-ignores
				onPageSelected={setSelectedPage}
				>

				<RB.Flex className="page-container" flex="1" flexDirection="column">
					<PageComponent />
				</RB.Flex>
				
			</Nav>

	</RB.Flex>
	);
}


export {
	App,
};
