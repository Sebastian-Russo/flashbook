
import * as React from "react";
import * as RB from "rebass";

interface ReadingProps {}

const Reading: React.FC<ReadingProps> = props => {



  
  return (
    <RB.Flex>Reading</RB.Flex>
  )
}


export {
  Reading
}


/*
NOTES:
  Progress bar at top
    Paragraphs, pages, sections, chapters

  Video Player / Reading Screen
    Buttons:
      Play, Puase, Stop
      Back x1, x5, Forward x1, x5
  
  A range between speeds
    200-400 words a minute
*/