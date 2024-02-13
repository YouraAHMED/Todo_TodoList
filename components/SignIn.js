import React, { useState,useContext, useReducer } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Button, TextInput } from 'react-native-web'
import { TokenContext, UsernameContext } from '../Context/Context'
import { signIn } from '../api/Api'

export default function SignIn (navigation) {

    const [token, setToken] = useContext(TokenContext)//recuperation du token
    const [username, setUsername] = useContext(UsernameContext) //recuperation du username

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

  /**
   * methode permettant de connecter un utilissateur 
   * utilise la fonction SignIn de l'api
   */
  const onSignIn = () => {
    setError(""); // Réinitialisez d'abord l'erreur
  
    if (login !== "" && password !== "") { // Correction de la condition logique
      signIn(login, password)
        .then(token => {
          setToken(token);
          setUsername(login);
          navigation.navigate('Home');
        })
        .catch(err => {
          setError(err.message);
        });
    } else {
      setError("Veuillez remplir tous les champs."); // Gestion des champs vides
    }
  };
  


    return (
      <View style={styles.content}>
        <Text>User</Text>
        <TextInput
          value={login}
          onChangeText={setLogin}
          style={styles.input}
          placeholder="Username"
        />
  
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
        />
        <Text>{error}</Text>
        <Button title="Se connecter" onPress={onSignIn} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
  });