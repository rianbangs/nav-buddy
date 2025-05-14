// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import * as tfReactNative from '@tensorflow/tfjs-react-native';
// import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
// import * as cocossd from '@tensorflow-models/coco-ssd';

// const TensorCamera = cameraWithTensors(Camera);

// export default function SignDetector() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isTfReady, setIsTfReady] = useState(false);
//   const [model, setModel] = useState(null);
//   const [detected, setDetected] = useState('');
//   const textureDims = { height: 1920, width: 1080 };
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');

//       await tf.ready();
//       setIsTfReady(true);

//       const loadedModel = await cocossd.load();
//       setModel(loadedModel);
//     })();
//   }, []);

//   const handleCameraStream = async (images) => {
//     const loop = async () => {
//       const nextImageTensor = images.next().value;
//       if (model && nextImageTensor) {
//         const predictions = await model.detect(nextImageTensor);
//         if (predictions.length > 0) {
//           setDetected(predictions[0].class); // Show first detected class
//         }
//         tf.dispose([nextImageTensor]);
//       }
//       requestAnimationFrame(loop);
//     };
//     loop();
//   };

//   if (hasPermission === null) return <Text>Requesting permissions...</Text>;
//   if (hasPermission === false) return <Text>No access to camera</Text>;

//   if (!isTfReady || !model) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Loading TensorFlow and model...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <TensorCamera
//         ref={cameraRef}
//         style={styles.camera}
//         type={Camera.Constants.Type.back}
//         cameraTextureHeight={textureDims.height}
//         cameraTextureWidth={textureDims.width}
//         resizeHeight={200}
//         resizeWidth={152}
//         resizeDepth={3}
//         onReady={handleCameraStream}
//         autorender={true}
//       />
//       <View style={styles.labelContainer}>
//         <Text style={styles.labelText}>
//           Detected: {detected || 'None'}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   camera: { flex: 1 },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   labelContainer: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   labelText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });
