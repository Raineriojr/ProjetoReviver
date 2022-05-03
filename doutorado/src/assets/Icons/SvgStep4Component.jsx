import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={224}
      height={32}
      viewBox="0 0 224 32"
      fill="none"
      {...props}
    >
      <Path d="M168 16h16v1h-16v-1z" fill="#4EBD6C" />
      <Circle cx={208} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <Path
        d="M211.047 17.18h1.578v1.18h-1.578V21h-1.453v-2.64h-5.18v-.852l5.094-7.883h1.539v7.555zm-4.992 0h3.539v-5.578l-.172.312-3.367 5.266z"
        fill="#fff"
      />
      <Path d="M40 16h16v1H40v-1zM104 16h16v1h-16v-1z" fill="#4EBD6C" />
      <Circle cx={16} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <Path
        d="M13 20.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L24.3 11.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L13 20.2z"
        fill="#fff"
      />
      <Circle cx={80} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <Path
        d="M77 20.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L88.3 11.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L77 20.2z"
        fill="#fff"
      />
      <Circle cx={144} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <Path
        d="M141 20.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0l10.6-10.59a.984.984 0 000-1.4.984.984 0 00-1.4 0l-9.9 9.9z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
