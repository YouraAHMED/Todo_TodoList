import React, { useState,useEffect,useContext } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'

import TodoFirstItem from './item/TodoFirstItem'
import {createTodoList, getTodoLists,deleteTodoList} from '../api/Api'
import { TokenContext, UsernameContext } from '../Context/Context'
import Input from './UI/Input';

export default function TodoList () {
  const [todoLists, setTodoLists] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useContext(TokenContext)
  const [username, setUsername] = useContext(UsernameContext)
  

  /**liste des todos */
  const getAllTodoLists = () => {
    setError('');
    // Appel à la fonction pour récupérer les listes de tâches
    getTodoLists(username, token)
      .then(lists => {
        setTodoLists(lists); // Mettre à jour l'état avec les listes récupérées
      })
      .catch(err => {
        setError(err.message);
      });
  };


  const addTodoLists = (title) => {
    if (title.trim() !== "") { // Vérifie si le titre n'est pas vide après suppression des espaces blancs
      createTodoList(username, title, token)
        .then((response) => {
          getAllTodoLists();
        })
        .catch((error) => {
          setError(error);
          // Gérez l'erreur ou affichez un message à l'utilisateur en conséquence
        });
    } else {
      setError("Le titre de la todoList ne peut pas être vide.");
      // Vous pouvez également définir setError ou un autre mécanisme pour signaler à l'utilisateur
    }
  };
  

useEffect(() => {
  // Mettre à jour l'état 'done' lorsque la propriété 'item.done' change
  getAllTodoLists();
} );

  const deleteTodoLists = (id) => {

    deleteTodoList(id,token) 
      .then((response) => {
        getAllTodoLists(); 
      })
      .catch((error) => {
        
        console.error();
      });

  }
  
  return (
      <View style={{ margin: 10 }}>

        <View style={styles.textInput_group}>
          <View>
          <Input onSubmit={addTodoLists} title="Enregistrer"/>
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 10 }}
          data={todoLists}
          renderItem={({ item }) => (
            <TodoFirstItem
              item={item}
              deleteTodoList={deleteTodoLists}
            />
          )}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  textInput_group: {
    flexDirection: 'row'
  },
  textinput_view: {
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  buttoninput_view: {
    margin: 12,
    paddingTop: 3
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // Alignement horizontal au centre
    alignItems: 'center', // Alignement vertical au centre si nécessaire
    marginTop: 10, // Espacement par rapport aux éléments adjacents
  },
})