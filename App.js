import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './Telas/TelaLogin';
import TelaAddUser from './Telas/TelaAddUser';
import TelaPosts from './Telas/TelaPosts';
import TelaMeusPosts from './Telas/TelaMeusPosts';
import TelaAddPost from './Telas/TelaAddPost';
import TelaLocalizacao from './Telas/TelaLocalizacao';
import TelaCamera from './Telas/TelaCamera';

const Stack = createStackNavigator()
export default function App() {  
  	return(
    	<NavigationContainer>
      		<Stack.Navigator initialRouteName="login">
        		<Stack.Screen
				options={{ headerShown: false }}
				name="login" 
				component={TelaLogin}
				/>
				<Stack.Screen 
				name="posts" 
				options={{ headerShown: false }}
				component={TelaPosts}  
				/>
				<Stack.Screen 
				name="meusPosts" 
				options={{ headerShown: false }}
				component={TelaMeusPosts}  
				/>
				<Stack.Screen 
				name="addPost" 
				options={{ headerShown: false }}
				component={TelaAddPost}  
				/>
				<Stack.Screen
				options={{ headerShown: false }}
				name="addUser"
				component={TelaAddUser}
				/>
				<Stack.Screen
				options={{ headerShown: false }}
				name="camera"
				component={TelaCamera}
				/>
				<Stack.Screen
				options={{ headerShown: false }}
				name="localizacao"
				component={TelaLocalizacao}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}