
import * as React from "react";
import * as RB from "rebass";


//--- Navigation Window ---\\

type NavProps = {
	page_title: React.ReactNode,

	onPageSelected: (page_name?: PageSelection) => void;

}

type PageSelection =
	| "library"
	| "login"
	| "reading"
  | "upload"
	| never;

const Nav: React.FC<NavProps> = props => {

  return (
    <RB.Flex style={{ height: "100vh"}} flexDirection="column" justifyContent="space-between">

      <RB.Flex justifyContent={"space-between"} style={{ margin: "4.673vw 2.336vw" }} flexDirection={"row"} alignItems={"center"}>
        <RB.Flex justifyContent={"space-between"} width={"100%"} onClick={() => props.onPageSelected(undefined)}>
          {/* <ArrowIosBackOutline width={"32"} /> */}
          <RB.Text fontSize={"4.673vw"} color={"black"} fontWeight={"bold"}>{props.page_title}</RB.Text>
          <RB.Box width="7.477vw" />
        </RB.Flex>
      </RB.Flex>

		{/*Page Goes Here !!!*/}
		{props.children}

    </RB.Flex>
  )
}


//--- Exports ---\\

export {
	Nav,
  PageSelection
};
