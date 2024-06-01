import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../Servicos/firebase'
import { getDatabase, ref, update } from "firebase/database"
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import {Picker} from '@react-native-picker/picker'
import * as Location from 'expo-location'

const TelaAddPost = ({navigation, route}) =>
{
	const [selectedTag, setSelectedTag] = useState('');
	const [availableTags, setAvailableTags] = useState([]);
	const [PostFailed, SetPostFailed] = useState(false);
	const [location, SetLocation] = useState(null);

	const image = route.params.image ? route.params.image : null;

	const searchQuotes = async () =>
	{
		url = "";
		if(selectedTag.length === 0)
		{
			url = "https://api.quotable.io/quotes/random"
		}else
		{
			url = "https://api.quotable.io/quotes/random?tags=" + selectedTag
		}
		fetch(url)
		.then((response) => response.json())
		.then(async (data) => 
		{
			if(data.length > 0)
			{
				const Database = getDatabase(firebase);
				const Storage = getStorage(firebase);
				const PostID = Date.now().toString();
				var ImageURL = "";
				if(route.params.image)
				{
					const ImageRef = storageRef(Storage, 'images/' + PostID + '.jpg');
					const ImageData = await fetch(route.params.image).then((response) => response.blob());
					const UploadTask = await uploadBytes(ImageRef, ImageData);
					ImageURL = await getDownloadURL(ImageRef);
					console.log(ImageURL)
				}
				const UserRef = ref(Database, "users/" + route.params.uid + "/posts/" + PostID)
				update(UserRef, {legenda: data[0].content, foto: ImageURL, geolocalizacao: location})
				.then(() =>
				{
					console.log("Post criado: " + data[0].content);
					SetPostFailed(false);
					navigation.navigate("posts", {uid: route.params.uid})
				})
				.catch((error) =>
				{
					SetPostFailed(true);
					console.error("Erro: ", error);
				})
			}else
			{
				console.log("Sem citação nessa tag")
				SetPostFailed(true)
			}
		})
		.catch((error) =>
		{
			SetPostFailed(true);
			console.error(error)
		})
	}
	const searchTags = () =>
	{
		fetch("https://api.quotable.io/tags")
		.then((response) => response.json())
		.then((data) => 
		{
			setAvailableTags(data);
		})
		.catch((error) => {console.error(error)})
	}

	const getLocation = async () =>
	{
		let { status } = await Location.requestForegroundPermissionsAsync();
		if(status !== 'granted')
		{
			return (<View><Text style={styles.PostFailed}>Permissão de Localização negada</Text></View>)
		}
		let CurrentLocation = await Location.getCurrentPositionAsync({});
		SetLocation({latitude: CurrentLocation.coords.latitude, longitude: CurrentLocation.coords.longitude})
	}

	useEffect(() =>
	{
		searchTags();
		getLocation();
	}, [])

	return(
		<View style={styles.container}>
			<Header showNav={true} navigation={navigation} route={route} />
			{PostFailed ? <Text style={styles.PostFailed}>Falha ao Enviar o Post</Text>: null}
			{route.params.image ? <Image source={{uri: route.params.image}} style={styles.image}/>: (<View/>)}
			<View style={styles.contentContainer}>
				<Button
					onPress={() => {navigation.navigate("camera", {uid: route.params.uid})}}
					title="Tirar foto"
				/>
				<Picker
					selectedValue={selectedTag}
					onValueChange={(itemValue, itemIndex) => setSelectedTag(itemValue)}
					itemStyle={styles.tagItem}
				>
					<Picker.Item label="Selecione um tipo de legenda" value="" />
					{availableTags.map((tag) => 
					(
						<Picker.Item key={tag._id} label={tag.name} value={tag.name} />
					)
					)}
				</Picker>
				<Button
					onPress={searchQuotes}
					title="Gerar post"
					color='grey'
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	tagItem: {
		flexDirection: "row",
		alignItems: "center",
		color: 'black',
		fontWeight: 'bold',
		fontSize: 12,
		marginBottom: 8
	},
	image: {
		flex: 1,
		resizeMode: "contain"
	},
	PostFailed: {
		fontWeight: 'bold',
		color: 'red'
	}
});

export default TelaAddPost;
