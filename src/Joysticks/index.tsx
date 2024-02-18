import React, { useState, useEffect } from "react";
// @ts-ignore
import ReactNipple, { JoystickEventData } from "react-nipple";
// import DebugView from "react-nipple/lib/DebugView";
//import { moveRobot } from "../utils/ROS/ROSFunctions";

interface JoystickProps {
    onStart?: (evt: any, data: JoystickEventData) => void;
    onEnd?: (evt: any, data: JoystickEventData) => void;
    onMove?: (evt: any, data: JoystickEventData) => void;
    onDir?: (evt: any, data: JoystickEventData) => void;
    onPlain?: (evt: any, data: JoystickEventData) => void;
    onShown?: (evt: any, data: JoystickEventData) => void;
    onHidden?: (evt: any, data: JoystickEventData) => void;
    onPressure?: (evt: any, data: JoystickEventData) => void;
}

function Joystick(props: JoystickProps) {
    // state
    const [data, setData] = useState<JoystickEventData | undefined>();

    const [state, setState] = useState({
        axes: [0, 0, 0, 0, 0, 0],
        buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    useEffect(() => {
        // moveRobot({ axes: state.axes, buttons: state.buttons });
        console.log(state.axes);
    }, [state]);

    // functions
    const handleJoystickStart = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onStart) {
            props.onStart(evt, data);
        }
    };

    const handleJoystickEnd = (evt: any, data: JoystickEventData) => {
        setData(data);
        setState({
            axes: [0, 0, 0, 0, 0, 0],
            buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        if (props.onEnd) {
            props.onEnd(evt, data);
        }
    };

    const handleJoystickMove = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onMove) {
            props.onMove(evt, data);
        }
    };

    const handleJoystickDir = (evt: any, data: JoystickEventData) => {
        setData(data);

        let max_distance = 75.0; // pixels;
        console.log("Senas ", data.distance);
        let y_direction = Math.sin(data.angle.radian);
        let x_direction = -Math.cos(data.angle.radian);
        let x_inverte = Math.cos(data.angle.radian);

        if (y_direction <= 0.2 || y_direction <= -0.2) {
            y_direction = 0;
        }

        let x = data.direction.x === "right" ? 1 : -1;
        let y = data.direction.y === "up" ? 1 : -1;

        if (data.distance === 0) {
            x = 0.0;
            y = 0.0;
        }

        setState({
            axes: [x, y, 0, 0, 0, 0],
            buttons: [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        });
        console.log("Direction x: " + x_direction + "  y: " + y_direction);
        console.log("Exos x: " + x + "  y: " + y);
        console.log("invertido x: ", x_inverte);

        if (props.onDir) {
            props.onDir(evt, data);
        }
    };

    const handleJoystickPlain = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onPlain) {
            props.onPlain(evt, data);
        }
    };

    const handleJoystickShown = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onShown) {
            props.onShown(evt, data);
        }
    };

    const handleJoystickHidden = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onHidden) {
            props.onHidden(evt, data);
        }
    };

    const handleJoystickPressure = (evt: any, data: JoystickEventData) => {
        setData(data);
        if (props.onPressure) {
            props.onPressure(evt, data);
        }
    };

    return (
        <div>
            <div className="joystick-wrapper mt-5">
                <ReactNipple
                    className="joystick is-relative"
                    options={{
                        mode: "static",
                        color: "hsl(219, 84%, 56%)",
                        position: { top: "50%", left: "50%" },
                        size: 150,
                        treshold: 0.1,
                    }}
                    style={{
                        width: 250,
                        height: 250,
                    }}
                    onStart={handleJoystickStart}
                    onEnd={handleJoystickEnd}
                    onMove={handleJoystickMove}
                    onDir={handleJoystickDir}
                    onPlain={handleJoystickPlain}
                    onShown={handleJoystickShown}
                    onHidden={handleJoystickHidden}
                    onPressure={handleJoystickPressure}
                />
                {/* <DebugView data={data} /> */}
            </div>
        </div>
    );
}

export default Joystick;
