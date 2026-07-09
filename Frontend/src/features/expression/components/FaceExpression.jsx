import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";
import '../style/FaceExpression.scss'

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");
    const streamRef = useRef(null);





    useEffect(() => {
        init({ faceLandmarkerRef, videoRef, streamRef });

        return () => {

            if (faceLandmarkerRef.current) {
                faceLandmarkerRef.current.close();
            }

            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
    const expression = await detect({
        faceLandmarkerRef,
        videoRef,
        setExpression,
    });

    console.log(expression);

    onClick(expression);   // ✅ Only this
    }

    return (
        <div className="face-expression">
            <video
                className="video"
                ref={videoRef}
                autoPlay
                muted
                playsInline
            />

            <h2>{expression}</h2>
            <button className="btn" onClick={handleClick}
            >Detect Expression</button>
        </div >
    );
}