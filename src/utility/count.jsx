import CountUp from "react-countup"
import VisibilitySensor from 'react-visibility-sensor'
import { useRef } from "react";

export default function CountUpOnce(props) {
  const countedUp = useRef();

  return (
    <CountUp end={props.end} duration={0.9} suffix={props.suffix}>
      {({ countUpRef, start }) => (
        <VisibilitySensor
          onChange={(isVisible) => {
            if (!countedUp.current && isVisible) {
              countedUp.current = true
              start()
            }
          }}
          delayedCall
        >
          <span ref={countUpRef} />
        </VisibilitySensor>
      )}
    </CountUp>
  )
}