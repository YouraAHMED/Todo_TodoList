import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function SignOut() {
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);

  const handleSignOut = () => {
    // Réinitialisation du jeton et du nom d'utilisateur
    setToken(null);
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut}/>
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


