import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M14 14a6.665 6.665 0 006.667-6.667A6.665 6.665 0 0014 .667a6.665 6.665 0 00-6.667 6.666A6.665 6.665 0 0014 14zm0 3.333C9.55 17.333.667 19.567.667 24v1.667c0 .916.75 1.666 1.666 1.666h23.334c.916 0 1.666-.75 1.666-1.666V24c0-4.433-8.883-6.667-13.333-6.667z"
        fill="#040404"
      />
    </Svg>
  )
}

export default SvgComponent
