import * as React from "react";
// import * as RB from "rebass";
import svg_search from "@/assets/icons/Search.svg"
import svg_arrow_down from "@/assets/icons/ArrowDown.svg";
import svg_arrow_up from "@/assets/icons/ArrowCircleUpOutlined.svg";



const fake_input = {
	position: "relative",
	width: "240px",
	margin: "2px"
}
const real_input = {
	border: "none",
	background: "#fff",
	display: "block",
	width: "100%",
	boxSizing: "border-box",
	height: "50px",
	paddingLeft: "40px",
	fontSize: "16px",
	borderRadius: "15px",
	color: "#808080"
}
const img_left = {
	position: "absolute",
	top: "14px",
	left: "5px"
}
const img_right = {
	position: "absolute",
	top: "14px",
	right: "5px"
}

interface TextEntrySearchProps {
	handleTextEntry: (input:string) => void;
}

const TextEntrySearch: React.FC<TextEntrySearchProps> = props => {
	const [data, setData] = React.useState('');

	console.log("Input:", data);

	// React.useEffect(() => {
	// 	props.handleTextEntry(data)
	// }, [data]);

	return (
		// @ts-ignore
		<div style={fake_input}>
			<img src={svg_search} style={img_left} />
			<input style={real_input} placeholder="Search Zip Code" onChange={(e) => setData(e.target.value)} />
				<img src={svg_arrow_down} style={img_right} width="25"/>
		</div>
	)
}


interface TextEntryChatProps {

}

const TextEntryChat: React.FC<TextEntryChatProps> = props => {
	const [data, setData] = React.useState('');

	console.log("Input:", data);

	return (
		<div style={fake_input}>
			<img src={svg_arrow_up} style={img_right} />
			<input style={real_input} onChange={(e) => setData(e.target.value)} placeholder="Enter Message..."/>
		</div>
	)
}


interface TextEntryGeneralProps {

}

const TextEntryGeneral: React.FC<TextEntryGeneralProps> = props => {
	const [data, setData] = React.useState('');

	console.log("Input:", data);

	return (
		<div style={fake_input}>
			<input style={real_input} onChange={(e) => setData(e.target.value)} placeholder="Text"/>
		</div>
	)
}

export {
	TextEntrySearch,
	TextEntryChat,
	TextEntryGeneral
}
