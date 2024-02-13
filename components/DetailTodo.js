import React, { useState,useEffect,useContext } from 'react'
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
} from 'react-native'
import * as Progress from 'react-native-progress'

import TodoItem from './item/TodoItem'
import {getTodos,deleteTodo,updateTodo} from '../api/Api'
import { TokenContext, UsernameContext } from '../Context/Context'
import Input from './UI/Input';
import { createTodo } from '../api/Api'

export default function TodoList ( props ) {
  const [todoLists, setTodoLists] = useState([]);
  const [todoFiltre, settodFiltre] = useState(todoLists)
  const [count, setCount] = useState(todoLists.filter(item => item.done).length)
  const [type, setType] = useState('all'); 
  const [error, setError] = useState("");
  const [token, setToken] = useContext(TokenContext)
  const [username, setUsername] = useContext(UsernameContext)
  const [pourcentage,setpourcentage] = useState(0);

  //gestion de la barre de progression
  const calculatePercentage = (updatedLists) => {

    let completed = updatedLists.filter(it => it.done).length;
    let totalTasks = updatedLists.length;
    setpourcentage((completed/totalTasks))};
  
  
  

  /**liste des todos */
  const getAllTodos = () => {
    setError('');
    // Appel à la fonction pour récupérer les listes de tâches
    getTodos(props.route.params.parentId, token)
    .then(lists => {
      setTodoLists(lists); // Mettre à jour l'état avec les listes récupérées
      calculatePercentage(lists);
         
    })
    .catch(err => {
      setError(err.message);
    });
};

  /**
   * permet d'ajouter un todo dans la base de donnee
   */
  const addTodo = (title) => {
    if (title.trim() !== "") { // Vérifie si le titre n'est pas vide après suppression des espaces blancs
      createTodo(title, props.route.params.parentId, token)
        .then((response) => {
          getAllTodos();
        })
        .catch((error) => {
          setErrorrror(error);
          // Gérez l'erreur ou affichez un message à l'utilisateur en conséquence
        });
    } else {
      // Gérez le cas où le champ 'title' est vide
      setError("Le titre ne peut pas être vide.");
      // Vous pouvez également définir setError ou un autre mécanisme pour signaler à l'utilisateur
    }
  };
  

  //suppression d'un toto

  const deleteItem = (todoId) => {
    deleteTodo(todoId, token) 
      .then((response) => {
        getAllTodos(); 
      })
      .catch((error) => {
        
        console.error();
      });
  };

  //modification todo

  const updateItem = (todoId, done, content ) => {
    updateTodo(todoId,done, token,content) 
      .then((response) => {
        getAllTodos(); 
      })
      .catch((error) => {
        
        console.error();
      });
  };

  /**
   * methode permettant de filtrer l'affiche
   */
  const filterFromType = () => {
    if (type === "done") {
      settodFiltre(todoLists.filter(item => item.done));
    } else if (type === "none") {
      settodFiltre(todoLists.filter(item => !item.done));
    } else {
      // Si le type est différent de "done" ou "none", afficher tous les éléments
      settodFiltre([...todoLists]);//... permet de creer une copie de totolist
    }
        

  };

  useEffect(() => {
    filterFromType(); // Appeler la fonction de filtre chaque fois que le type change
  }, [todoLists,type]);


useEffect(() => {
  getAllTodos();
}, [props.route.params.parentId]);

useEffect(() => {
  setCount((todoLists.filter(it => it.done).length))
}, [todoLists]);

  const checkAll = () => {
    const newTodos = todoLists.map((item) => {return {id: item.id, content: item.content, done: true}})
    setTodoLists(newTodos)
    calculatePercentage(newTodos);
  }

  const checkNone = () => {
    const newTodos = todoLists.map((item) => {return {id: item.id, content: item.content, done: false}})
    setTodoLists(newTodos)
    calculatePercentage(newTodos);
  }

  return (

      <View style={{ margin: 10 }}>
        <Progress.Bar progress ={pourcentage} width ={300}/> {pourcentage * 100}
        <View style={styles.filterButtons}>
        <View style={styles.buttoninput_view}>
            <Button onPress={() => setType("all")} title='all' />
          </View>
          <View style={styles.buttoninput_view}>
            <Button onPress={() => setType("done")} title='termine' />
          </View>
          <View style={styles.buttoninput_view}>
            <Button onPress={() => setType("none")} title='En cours' />
          </View>

          <View style={styles.buttoninput_view}>
            <Button onPress={checkAll} title='Tout cocher' />
          </View>

          <View style={styles.buttoninput_view}>
            <Button onPress={checkNone} title='Tout décocher' />
          </View>
        </View>

        <Text>{count} items réalisés</Text>
        <View style={styles.textInput_group}>
          <View>
          <Input onSubmit={addTodo} title="Enregistrer"/>
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 10 }}
          data={todoFiltre}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              updateItem={updateItem}
              deleteItem ={deleteItem }
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