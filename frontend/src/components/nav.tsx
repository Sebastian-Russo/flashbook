
import * as React from "react";
import * as RB from "rebass";

// import svg_lib from "../assets/icons/library-outline.svg";
// import svg_upload from "../assets/icon/cloud-upload-outline.svg";
// import svg_read from "../assets/icon/play-outline.svg";
// import svg_set from "../assets/icon/settings-outline.svg";

//--- Navigation Window ---\\

type NavProps = {
	page_title: React.ReactNode,

	selected_tab: TabSelection;
	onTabSelected: (tab_name: TabSelection) => void;
	onPageSelected: (page_name?: PageSelection) => void;

	nav_type: "tab" | "page";

	top_nav_override?: JSX.Element,
}

type TabSelection =
	| "library"
	| "upload"
	| "reading"
	| "settings"
	| never;

type PageSelection =
	| "profile"
	| "login"
	| "settings"
	| "app_preferences"
	| never;

const Nav: React.FC<NavProps> = props => {


  return (
	<RB.Flex style={{ height: "100vh"}} flexDirection="column" justifyContent="space-between">

		{/* Top Navbar (pages) */}
		{props.nav_type === "tab" &&
		<RB.Flex justifyContent="space-between" px="4.673vw" alignItems="center" pt="2.804vw" pb="1.402vw" backgroundColor={"white"}>
		<div onClick={() => props.onPageSelected("profile")}>
			<img src="" width="6.542vw" color="royalblue" />
		</div>
		<RB.Text pt="2.336vw" fontSize="4.673vw" textAlign="center" color="black">
			{props.page_title}
		</RB.Text>
		<div onClick={() => props.onPageSelected("settings")}>
			<img src="" width="6.542vw" color="royalblue" />
		</div>
		</RB.Flex>}

		{/* Page Selection */}
		{props.nav_type === "page" &&
		<RB.Flex justifyContent={"space-between"} style={{ margin: "4.673vw 2.336vw"}} flexDirection={"row"} alignItems={"center"}>
		<RB.Flex justifyContent={"space-between"} width={"100%"} onClick={() => props.onPageSelected(undefined)}>
			<img src="" width={"32"} />
			<RB.Text fontSize={"4.673vw"} color={"black"} fontWeight={"bold"}>{props.page_title}</RB.Text>
			<RB.Box width="7.477vw" />
		</RB.Flex>
		</RB.Flex>}

		{/*Page Goes Here !!!*/}
		{props.children}

		{/* Profile Sidebar */}

		{/*Floating Scan Button*/}
		{/* {props.nav_type === "tab" &&
		<RB.Flex className="scanner-button" justifyContent="end">
		<button onClick={() => props.onPageSelected("scanner")}>
			<UpcScan width="5.607vw" />
			<RB.Text>
			Scan
			</RB.Text>
		</button>
		</RB.Flex> || undefined} */}

		{/* Bottom Navbar (tabs) */}
		{props.nav_type === "tab" &&
		<RB.Flex className="bottom-nav" backgroundColor="white" justifyContent="space-around" pb="9.346vw" pt="4.673vw">

		<div className={props.selected_tab === "library" ? "selected-nav-icon" : undefined} key={"library"} onClick={() => props.onTabSelected("library")}>
			<NavButton title="Library"  /> 
			{/* icon={svg_lib} */}
			{/* <img src={svg_lib} /> */}
		</div>
		<div className={props.selected_tab === "upload" ? "selected-nav-icon" : undefined} key={"upload"} onClick={() => props.onTabSelected("upload")}>
			<NavButton title="Upload"  />
			{/* icon={svg_upload} */}
			{/* <img src={svg_upload} /> */}
		</div>
		<div className={props.selected_tab === "reading" ? "selected-nav-icon" : undefined} key={"reading"} onClick={() => props.onTabSelected("reading")}>
			<NavButton title="Reading Room"  />
			{/* icon={svg_read} */}
			{/* <img src={svg_read} /> */}
		</div>
		<div className={props.selected_tab === "settings" ? "selected-nav-icon" : undefined} key={"settings"} onClick={() => props.onTabSelected("settings")}>
			<NavButton title="Settings"  />
			{/* icon={svg_set} */}
			{/* <img src={svg_set} /> */}
		</div>

		</RB.Flex> || undefined}

	</RB.Flex>
	);
}


//--- Navigation Button ---\\

type NavButtonProps = {
	// icon: typeof React.Component | React.FC<any>,
	title: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = props => {
	return (
	<RB.Flex flexDirection="column" alignItems="center">
		{/* <props.icon width="7.477vw" /> */}
		<RB.Text fontSize={"3.505vw"} fontWeight={100} pt={"1.168vw"}>{props.title}</RB.Text>
	</RB.Flex>
	);
};


//--- Exports ---\\

export {
	Nav,
	TabSelection,
	PageSelection
};
