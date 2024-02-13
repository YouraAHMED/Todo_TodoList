
import React, { useContext } from 'react';
import { Text} from 'react-native';
import { TokenContext,UsernameContext } from '../Context/Context';


export default function HomeScreen ({ navigation, route }) {
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    return (
      <>
        <Text>Welcome !</Text>
        <Text>You are logged as {username}</Text>
      </>
    );
  }