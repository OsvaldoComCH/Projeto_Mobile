import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../Servicos/firebase';
import { getDatabase, ref, get } from "firebase/database";

const PostsScreen = ({ navigation, route }) =>
{
	const [posts, setPosts] = useState([]);
	const database = getDatabase(firebase);

	useEffect(() =>
	{
		const usersRef = ref(database, 'users');
		get(usersRef)
		.then((usersSnapshot) => 
		{
			const users = usersSnapshot.val()
			if(users) 
			{
				const allPosts = [];
				Object.keys(users).forEach((userId) => {
					const user = users[userId]
					if (user.posts)
					{
						Object.keys(user.posts).forEach((postId) =>
						{
							const post = user.posts[postId];
							allPosts.push({ userId, userName: user.nome, postId, ...post });
						});
					}
				})
				setPosts(allPosts)
			}
		})
		.catch ((error) => 
		{
			console.error('Erro ao buscar posts:', error);
		})
	}, [route.params])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header showNav={true} navigation={navigation} route={route} />
			</View>
			<View style={styles.container}>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.postId}
					renderItem={({ item }) =>
					(
						<View style={{paddingTop: 10}}>
						{item.foto && (<Image source={{uri: item.foto}} style={styles.foto}/>)}
						<View style={styles.postContainer}>
							<Text style={styles.userName}>{item.userName}:</Text>
							<Text style={styles.container}>{item.legenda}</Text>
						</View>
						<Button title='localização' onPress={() => 
							{
								navigation.navigate("localizacao", {post: item, uid: route.params.uid})
							}}
						/>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	postContainer: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	userName: {
		fontWeight: 'bold',
		marginRight: 8,
	},
	header: {
		flex: 0.25
	},
	foto: {
		alignSelf: 'center',
		width: '80%',
		aspectRatio: 1
	}
});

export default PostsScreen;
