
import React from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoList from '../components/DetailTodo';


export default function TodoListsScreen ({ navigation, route }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
            <UsernameContext.Consumer>
            {([username, setUsername]) => (
                <TodoList route={route} ></TodoList>
                
            )}
    </UsernameContext.Consumer>
)}
</TokenContext.Consumer>
)
}