import React from "react";
import { View, StyleSheet, Text } from "react-native"
import Header from "../Componentes/Header";
import MapView, { Marker } from 'react-native-maps'

const TelaLocalizacao = ({ navigation, route }) => {
    const location = route.params.post.geolocalizacao
    if(!location) {
        console.log("Erro: Post não possui localização")
        return(
            <View style={styles.container}>
                <Header showNav={true} navigation={navigation} route={route} />
                <Text style={styles.fail}>Esse Post não possui localização!</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header showNav={true} navigation={navigation} route={route} />
            </View>
            <View style={styles.container}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                <Marker
                    coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    }}
                    title="Localização do Post"
                    description={route.params.post.legenda}
                />
                </MapView>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.3
    },
    map: {
        width: '100%',
        height: '100%',
    },
    fail: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20
    }
})

export default TelaLocalizacao