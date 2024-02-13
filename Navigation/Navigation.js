import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoListsScreen from '../Screen/TodoListsScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoFirstScreen from '../Screen/TodoFirstScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Création d'un TabNavigator pour la navigation entre différents écrans
const Tab = createBottomTabNavigator();

// Création d'un StackNavigator pour gérer la navigation spécifique aux tâches à accomplir (TodoLists)
const Stack = createNativeStackNavigator();

// Fonction qui retourne le StackNavigator pour la navigation liée aux tâches à accomplir
function NavigationTodo () {
  return (
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name="TodoLists" component={TodoFirstScreen} />
        <Stack.Screen name="DetailTodo"  component={TodoListsScreen} />
      </Stack.Navigator>
  )
}

// Composant principal de la navigation
export default function Navigation() {
  return (
    // Utilisation des contextes TokenContext et UsernameContext pour gérer les données d'authentification
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            // Conteneur de navigation principal
            <NavigationContainer>
              {/* Condition pour afficher les onglets en fonction de l'état du token */}
              {token == null ? (
                // Si l'utilisateur n'est pas authentifié (token null), affiche les onglets SignIn et SignUp
                <Tab.Navigator>
                  <Tab.Screen name="SignIn" component={SignInScreen} />
                  <Tab.Screen name="SignUp" component={SignUpScreen} />
                </Tab.Navigator>
              ) : (
                // Si l'utilisateur est authentifié (token non null), affiche les onglets Home, TodoLists et SignOut
                <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name='TodoLists' component={NavigationTodo} />
                  <Tab.Screen name="SignOut" component={SignOutScreen} />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          )}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
