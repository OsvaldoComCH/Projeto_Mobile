import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image } from 'react-native';
import firebase from '../Servicos/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Header from '../Componentes/Header';

const TelaLogin = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginFailed, setLoginFailed] = useState(false)

	const handleLogin = () => {
		const auth = getAuth(firebase)
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			setLoginFailed(false)
			console.log('Usuário logado com sucesso:', userCredential.user.email)
			navigation.navigate('posts' , {uid: userCredential.user.uid})
			})
		.catch((error) => {
			setLoginFailed(true)
			console.error('Erro ao fazer login:', error.message)
		})
	}

	return(
		<View style={styles.container}>
			<Header showNav={false}/>
			<View style={styles.container2}>
				<Image source={require('../assets/user.png')}  resizeMode="contain" style={styles.image}/>
				{loginFailed && <Text style={styles.loginFailed}>Usuário ou Senha inválidos</Text>}
				<TextInput
					placeholder="E-mail"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Senha"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					style={styles.input}
				/>
				<Button title="Login" onPress={handleLogin} color='grey'/>
				<Pressable onPress={() => navigation.navigate('addUser')}>
					<Text style={styles.register}>Registrar Novo Usuário</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	register: {
		textDecorationLine: 'underline',
		color: 'gray'
	},
	container: {
		flex: 0.7
	},
	container2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		width: '80%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
	},
	loginFailed: {
		color: 'red'
	}, 
	image: {
		width: '30%',
		height: '30%',
	}
});

export default TelaLogin;
