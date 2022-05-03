import * as React from "react"
import Svg, { Path, G, Circle } from "react-native-svg"

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
      <Path opacity={0.5} d="M168 16h16v1h-16v-1z" fill="#4EBD6C" />
      <G opacity={0.5}>
        <Circle cx={208} cy={16} r={15.5} stroke="#4EBD6C" />
        <Path
          d="M211.047 17.18h1.578v1.18h-1.578V21h-1.453v-2.64h-5.18v-.852l5.094-7.883h1.539v7.555zm-4.992 0h3.539v-5.578l-.172.312-3.367 5.266z"
          fill="#4EBD6C"
        />
      </G>
      <Path d="M40 16h16v1H40v-1z" fill="#4EBD6C" />
      <Path opacity={0.5} d="M104 16h16v1h-16v-1z" fill="#4EBD6C" />
      <Circle cx={80} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <Path
        d="M84.398 21h-7.453v-1.04l3.938-4.374c.583-.662.984-1.198 1.203-1.61a2.69 2.69 0 00.336-1.289c0-.593-.18-1.08-.54-1.46-.359-.38-.838-.57-1.437-.57-.718 0-1.278.205-1.68.616-.395.407-.593.974-.593 1.704h-1.445c0-1.047.335-1.894 1.007-2.54.678-.645 1.581-.968 2.711-.968 1.058 0 1.894.278 2.508.836.615.552.922 1.289.922 2.21 0 1.12-.713 2.454-2.14 4l-3.047 3.305h5.71V21z"
        fill="#fff"
      />
      <Circle cx={16} cy={16} r={15.5} fill="#4EBD6C" stroke="#4EBD6C" />
      <G opacity={0.5}>
        <Circle cx={144} cy={16} r={15.5} stroke="#4EBD6C" />
        <Path
          d="M143.047 14.61h1.086c.682-.011 1.219-.19 1.609-.54.391-.349.586-.82.586-1.414 0-1.333-.664-2-1.992-2-.625 0-1.125.18-1.5.54-.37.354-.555.825-.555 1.413h-1.445c0-.9.328-1.648.984-2.242.662-.599 1.5-.898 2.516-.898 1.073 0 1.914.284 2.523.851.61.568.914 1.357.914 2.367 0 .495-.161.975-.484 1.438a2.88 2.88 0 01-1.305 1.04c.625.197 1.107.525 1.446.983.343.459.515 1.019.515 1.68 0 1.021-.333 1.83-1 2.43-.666.599-1.534.898-2.601.898-1.068 0-1.938-.289-2.61-.867-.666-.578-1-1.341-1-2.289h1.454c0 .599.195 1.078.585 1.438.391.359.915.539 1.571.539.698 0 1.232-.183 1.601-.547.37-.365.555-.888.555-1.57 0-.662-.203-1.17-.609-1.524-.407-.354-.993-.536-1.758-.547h-1.086v-1.18z"
          fill="#4EBD6C"
        />
      </G>
      <Path
        d="M13 20.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L24.3 11.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L13 20.2z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent