import * as React from "react";
import * as RB from "rebass";

const style_1 = {
	background: "#159b9b", // green
	color: "#fff", // white
}

const style_2 = {
	background: "#fff", // white
	color: "#000", // bllack
}

const style_container_1 = {
	padding: "10px 5px",
	margin: "2px",
	borderRadius: "10px",
	fontSize: "12px",
	background: "#159b9b", // green
	color: "#fff", // white
}
const style_container_2 = {
	padding: "10px 5px",
	margin: "2px",
	fontSize: "12px",
	background: "#fff", // white
	color: "#000", // black
	fontWeight: "bold"
}
interface HorizontalSliderSelectorProps {
	options: string[],
	onOptionSelected: (option:string) => void;
}

const HorizontalSliderSelector: React.FC<HorizontalSliderSelectorProps> = props => {
	const [checked, setChecked] = React.useState(0);

	console.log('Horizontal Slider Props:', props);

	React.useEffect(() => {
		props.onOptionSelected(props.options[checked])
	}, [checked]);

	return (
		<RB.Flex style={{background: "#fff", borderRadius: "10px" }}>
			{props.options.map((option, index) => (
			<RB.Flex style={ checked === index ? style_container_1 : style_container_2}>
				<RB.Flex flexDirection="row" onClick={() => setChecked(index)}>
					<RB.Text style={checked === index ? style_1 : style_2}>
						{option}
					</RB.Text>
				</RB.Flex>
			</RB.Flex>
			))}
		</RB.Flex>
	);
}

export {
	HorizontalSliderSelector
}


// Add the line below to the component you want to add to

// return (
// 	<RB.Flex style={{ }} >
// 		<HorizontalSliderSelector
// 			options={["Available Offers", "Active Offers"]}
// 			onOptionSelected={(option) => {console.log(option)}}
// 		/>
// 	</RB.Flex>
// )
