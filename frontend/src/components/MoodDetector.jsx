import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const MoodDetector = () => {

const [songs, setsongs] = useState([])

const getMood = async(mood)=>{

  const res = await axios.get(`http://localhost:3000/songs?mood=${mood}`)
  setsongs(res.data.songs);
  console.log(res.data.songs);
  
}

  const videoRef = useRef();

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // path to models

      await faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models/face_expression');

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing webcam:', err));
    };

    loadModels();
  }, []);

  // Detect mood
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections?.expressions) {
          const mood = getTopExpression(detections.expressions);
          getMood(mood)
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Get top expression
  const getTopExpression = (expressions) => {
    return Object.entries(expressions).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    )[0]; // returns "happy", "sad", etc.
  };

  return (
    <div>
      <h2>Moody App - Mood Detection</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="500"
        height="400"
        style={{ border: '2px solid black' }}
      />

      {
        songs.map((song)=>{
          return <div key={song.id}>
            <h1>{song.audio}</h1>
          </div>
        })
      }
    </div>
  );
};

export default MoodDetector;
