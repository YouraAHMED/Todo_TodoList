import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

export default function Input(props) {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = () => {
    props.onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nouvelle TodoList..."
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title={props.title} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
});
