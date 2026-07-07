import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: "500px",
                    borderRadius: "12px",
                    transform: "scaleX(-1)",
                }}
            />

            <h2>{expression}</h2>
            <button style={{ backgroundColor: "green", paddingInline: "1rem", paddingBlock: "0.75rem", border: "none", borderRadius: "0.5rem" }} onClick={handleClick}
            >Detect Expression</button>
        </div >
    );
}