import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import firebase from '../Servicos/firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Header from '../Componentes/Header';
import { getDatabase, ref, set } from "firebase/database"

function TelaAddUser({navigation})
{
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [nome, setNome] = useState('')
	const [createFailed, setCreateFailed] = useState(false)

	const registrar = () =>
	{
		const auth = getAuth(firebase)
		createUserWithEmailAndPassword(auth, email, senha)
		.then((userCredential) =>
		{
			const database = getDatabase(firebase)
			const userRef = ref(database, 'users/'+ userCredential.user.uid)
			set(userRef, { nome: nome })
			.then(() =>
			{
				console.log('Usuário criado com sucesso:', userCredential.user.email);
				setCreateFailed(false)
				navigation.navigate('login')
			})
			.catch((error) =>
			{
				console.error("Erro ao adicionar usuário:", error);
			})
		})
		.catch((error) => 
		{
			console.error('Erro ao criar usuário:', error.message)
			setCreateFailed(true)
		})
	};

	return(
		<View style={styles.container2}>
			<Header showNav={false} />
			<View style={styles.container}>
				{createFailed && <Text style={styles.createFailed}>Falha ao Criar Usuário.</Text>}
				<TextInput
					placeholder="Nome"
					value={nome}
					onChangeText={(text) => setNome(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="E-mail"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Senha"
					value={senha}
					onChangeText={(text) => setSenha(text)}
					secureTextEntry={true}
					style={styles.input}
				/>
				<Button title="Registrar" onPress={registrar} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container2: {
		flex: 0.7
	},
	input: {
		width: '80%',
		borderBottomWidth: 1,
		marginBottom: 10,
		padding: 10,
	},
	createFailed: {
		color: 'red'
	}
});

export default TelaAddUser;