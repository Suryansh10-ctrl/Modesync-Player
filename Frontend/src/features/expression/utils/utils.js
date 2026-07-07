import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";


export async function init({ faceLandmarkerRef, videoRef, streamRef }) {
    try {
        // Load MediaPipe WASM
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        // Create Face Landmarker
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                },
                runningMode: "VIDEO",
                outputFaceBlendshapes: true,
                numFaces: 1,
            }
        );

        // Start Webcam
        streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        videoRef.current.srcObject = streamRef.current;

        await videoRef.current.play();

        // detect();
    } catch (err) {
        console.error(err);
    }
}


export function detect({ faceLandmarkerRef, videoRef, setExpression }) {
    if (
        !faceLandmarkerRef.current ||
        !videoRef.current ||
        videoRef.current.readyState < 2
    ) {
        return;
    }

    const results = faceLandmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (!results.faceBlendshapes?.length) {
        setExpression("No Face Detected");
    } else {
        const blendshapes = results.faceBlendshapes[0].categories;

        const score = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smile =
            (score("mouthSmileLeft") + score("mouthSmileRight")) / 2;

        const frown =
            (score("mouthFrownLeft") + score("mouthFrownRight")) / 2;

        const browDown =
            (score("browDownLeft") + score("browDownRight")) / 2;

        const browUp = score("browInnerUp");
        const jawOpen = score("jawOpen");

        let exp = "Neutral";

        if (smile > 0.6) {
            exp = "happy";
        }
        else if (jawOpen > 0.55 && browUp > 0.45) {
            exp = "surprised";
        }
        else if (frown > 0.0001 && browDown > 0.0001) {
            exp = "sad";
        }

        setExpression(exp);
        return exp;

    }

}