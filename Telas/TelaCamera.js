import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function TelaCamera({navigation, route}) {
  const [Facing, SetFacing] = useState('back');
  const [Permission, RequestPermission] = useCameraPermissions();
  const CameraRef = useRef(null);
  const [image, SetImage] = useState(null);
  let image2 = {};

  if(!Permission)
  {
    return (
      <View>
        <Text>Carregando</Text>
      </View>
    );
  }

  if(!Permission.granted)
  {
    return (
      <View style={styles.container}>
        <Text>Camera permission is not granted</Text>
        <Button onPress={RequestPermission} title="Grant permission"/>
      </View>
    );
  }

  function resetImage()
  {
    SetImage(null);
  }
  function FlipCamera()
  {
    SetFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const TakePicture = async () =>
  {
    CameraRef.current.takePictureAsync().then((result) => {
      SetImage(result)
      image2 = result
      console.log(image);
      console.log(result);
    }).catch((err) => {
      console.log("Erro:", err)
    });
  };

  return (
    <View style={styles.container}>
      {image!=null ? (
        <View style={styles.container}>
            <Image source={{uri: image.uri}} style={{flex: 1, resizeMode: 'contain'}}/>
            <View style={styles.ButtonContainer}>

              <TouchableOpacity style={styles.Button} onPress={resetImage}>
                <Text style={styles.text}>Descartar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Button} onPress={
                () => {navigation.navigate("addPost", {uid: route.params.uid, image: image2.uri})}
              }>
                <Text style={styles.text}>Usar esta foto</Text>
              </TouchableOpacity>

            </View>
        </View>
      ) : (
          <CameraView style={styles.Camera} facing={Facing} ref={CameraRef} zoom={1}>
            <View style={styles.ButtonContainer}>

              <TouchableOpacity style={styles.Button} onPress={FlipCamera}>
                <Text style={styles.text}>Virar Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Button} onPress={TakePicture}>
                <Text style={styles.text}>Tirar Foto</Text>
              </TouchableOpacity>

            </View>
          </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Camera: {
    flex: 1,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 3,
    right: 0,
  },
  Button: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 6,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
