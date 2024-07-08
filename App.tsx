import 'react-native-reanimated'
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Frame, useCameraDevice, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import {
  Face,
  Camera,
  FaceDetectionOptions
} from 'react-native-vision-camera-face-detector'

export default function App() {
  const [facing, setFacing] = useState('back');
  const faceDetectionOptions = useRef<FaceDetectionOptions>( {
    // detection options
  } ).current

  const device = useCameraDevice('front')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [permission, setPermission] = useState<null | boolean>(null)

  useEffect(() => {
    (async () => {
      const status = await requestPermission()
      console.log('teste')
      if (status) {
        setPermission(true)
      }
    })()
  }, [])

  if (!permission || !device) {
    return <View />
  }


  function handleFacesDetection(
    faces: Face[],
    frame: Frame
  ) { 
    console.log(
      'faces', faces.length,
      'frame', frame.toString()
    )
  }


  return (
    <View style={{ flex: 1 }}>
      {!!device? <Camera
        isActive
        style={StyleSheet.absoluteFill}
        device={device}
        faceDetectionCallback={ handleFacesDetection }
        faceDetectionOptions={ faceDetectionOptions }
      /> : <Text>
        No Device
      </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});