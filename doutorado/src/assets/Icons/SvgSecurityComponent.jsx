import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 36"
      fill="none"
      {...props}
    >
      <Path
        d="M24 12.333h-1.667V9C22.333 4.4 18.6.667 14 .667A8.336 8.336 0 005.667 9v3.333H4a3.343 3.343 0 00-3.333 3.334v16.666c0 1.834 1.5 3.334 3.333 3.334h20c1.833 0 3.333-1.5 3.333-3.334V15.667c0-1.834-1.5-3.334-3.333-3.334zm-10 15A3.343 3.343 0 0110.667 24c0-1.833 1.5-3.333 3.333-3.333 1.833 0 3.333 1.5 3.333 3.333 0 1.833-1.5 3.333-3.333 3.333zm-5-15V9c0-2.767 2.233-5 5-5s5 2.233 5 5v3.333H9z"
        fill="#040404"
      />
    </Svg>
  )
}

export default SvgComponent
