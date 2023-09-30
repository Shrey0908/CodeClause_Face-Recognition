document.addEventListener("DOMContentLoaded", function () {
    faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    faceapi.nets.faceRecognitionNet.loadFromUri("/models");
});

async function detectFaces() {
    const imageInput = document.getElementById("imageInput");
    const faceResult = document.getElementById("faceResult");
    const faceCanvas = document.getElementById("faceCanvas");
    const canvas = faceapi.createCanvasFromMedia(faceCanvas);
    const displaySize = { width: imageInput.width, height: imageInput.height };

    faceCanvas.innerHTML = "";
    faceCanvas.append(canvas);

    const detections = await faceapi.detectAllFaces(imageInput, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    if (detections.length === 0) {
        faceResult.innerHTML = "No faces detected.";
    } else {
        faceResult.innerHTML = `Detected ${detections.length} face(s).`;
    }
}

