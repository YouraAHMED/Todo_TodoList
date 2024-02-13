import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { signUp } from '../api/Api';

export default function SignUp() {
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * methode permettant d'incrire un utilisateur
   */

  const onSignIn = () => {
    setError(""); // Réinitialisez d'abord l'erreur
  
    if (login !== "" && password !== "") { // Correction de la condition logique
      signUp(login, password)
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
    <View style={styles.container}>
      <Text>Nouveau Nom d'utilisateur:</Text>
      <TextInput style={styles.input} value={login} onChangeText={setLogin} />
      <Text>Mot de passe:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Button title="S'inscrire" onPress={onSignIn} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});