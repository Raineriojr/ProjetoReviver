import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <Path
        d="M28.333 5H11.667C10.75 5 10 5.75 10 6.667c0 .916.75 1.666 1.667 1.666h16.666c.917 0 1.667-.75 1.667-1.666C30 5.75 29.25 5 28.333 5zM28.334 10H11.666a3.343 3.343 0 00-3.333 3.333v18.334c0 1.833 1.5 3.333 3.333 3.333h16.666c1.834 0 3.334-1.5 3.334-3.333V13.333c0-1.833-1.5-3.333-3.334-3.333zm-4.167 15H22.5v1.667c0 1.383-1.116 2.5-2.5 2.5a2.497 2.497 0 01-2.5-2.5V25h-1.666a2.497 2.497 0 01-2.5-2.5c0-1.383 1.116-2.5 2.5-2.5H17.5v-1.667c0-1.383 1.117-2.5 2.5-2.5 1.384 0 2.5 1.117 2.5 2.5V20h1.667c1.383 0 2.5 1.117 2.5 2.5s-1.117 2.5-2.5 2.5z"
        fill="#F9A749"
      />
    </Svg>
  )
}

export default SvgComponent
