import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function CursorSelect(props: any) {
    return (
        <Svg width={120} height={120} viewBox="0 0 120 120" fill="none" {...props}>
            <Path
                d="M63.53 65V42.5c0-4.14-3.36-7.5-7.5-7.5-4.14 0-7.5 3.36-7.5 7.5V80l-10.16-3.385a8.261 8.261 0 00-8.45 1.995c-3.435 3.435-3.175 9.07.55 12.18l20.275 16.895A10.045 10.045 0 0057.15 110H79.7c5.045 0 9.295-3.755 9.925-8.76l2.715-21.715c.665-5.325-2.99-10.22-8.28-11.105L63.53 65z"
                fill="url(#prefix__paint0_linear)"
                stroke="#FFD152"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M26.05 40h5M86.05 40h-5M77.25 18.8l-3.55 3.5M34.8 18.8l3.55 3.5M56.05 10v5"
                stroke="#FFD152"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={59.96}
                    y1={35}
                    x2={59.96}
                    y2={110}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FFCA33" stopOpacity={0.5} />
                    <Stop offset={1} stopColor="#FFCA33" stopOpacity={0.24} />
                    <Stop offset={1} stopColor="#FFCA33" stopOpacity={0.1} />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default CursorSelect
