import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface SvgProps {
    width?: number
    height?: number
}

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={169} height={195} viewBox="0 0 169 195" fill="none" {...props}>
      <Path
        d="M168.311 49.256v68.536c0 27.202-22.114 49.256-49.391 49.256h-4.995l-25.512 25.425A5.534 5.534 0 0184.5 194.1a5.535 5.535 0 01-3.68-1.378l-.433-.432-.017-.016-25.295-25.226h-5.012c-27.26 0-49.374-22.054-49.374-49.256V49.256C.689 22.054 22.803 0 50.079 0h68.841c27.277 0 49.391 22.054 49.391 49.256z"
        fill="#FFD666"
      />
    </Svg>
  )
}

export default SvgComponent
