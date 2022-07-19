import * as React from "react";
import * as RB from "rebass";
// import { hot } from "react-hot-loader";

// import config from "config.json";

import { Nav, TabSelection, PageSelection } from "./nav"

import { Library } from "./pages/Library";
import { Upload } from "./pages/Upload";
import { Reading } from "./pages/Reading";

import { Profile } from "./pages/Profile";
import { Login } from "./pages/AppPreferences/Login";
import { Settings } from "./pages/Settings";
import { AppPreferences } from "./pages/AppPreferences";

const tab_map: Record<TabSelection, {title: string, Page: typeof React.Component | React.FC}> = {
	library: {
		title: "Library",
		Page: Library,
	},
	upload: {
		title: "Upload",
		Page: Upload,
	},
	reading: {
		title: "Reading",
		Page: Reading,
	},
	settings: {
		title: "Settings",
		Page: Settings,
	}
};


const page_map: Record<PageSelection, {title: string, Page: typeof React.Component | React.FC}> = {
	profile: {
		title: "Profile",
		Page: Profile,
	},
	login: {
		title: "login",
		Page: Login,
	},
	settings: {
		title: "Settings",
		Page: Settings,
	},
	app_preferences: {
		title: "App Preferences",
		Page: AppPreferences,
	},
}


const App: React.FC = () => {

	const [selected_tab, setSelectedTab] = React.useState<TabSelection>("library");
	const [selected_page, setSelectedPage] = React.useState<PageSelection>();

	const PageComponent = page_map[selected_page!]?.Page || tab_map[selected_tab].Page;
	const page_title = page_map[selected_page!]?.title || tab_map[selected_tab].title;


	return (
		<RB.Flex style={{width: "100%"}} flexDirection="column">
		{/* {!state.token ?
			<Authentication />
		: */}
			<Nav
				page_title={page_title}

				selected_tab={selected_tab}
				onTabSelected={setSelectedTab}
				onPageSelected={setSelectedPage}

				nav_type={selected_page ? "page" : "tab" }
				>

				<RB.Flex className="page-container" flex="1" flexDirection="column">
					<PageComponent onPageSelected={setSelectedPage} />
				</RB.Flex>
			</Nav>
		{/* } */}

		</RB.Flex>
	);
}


// export default hot(module)(App);
export default App;