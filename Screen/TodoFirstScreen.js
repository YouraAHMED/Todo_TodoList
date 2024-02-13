
import React from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoFirst from '../components/TodoLists';


export default function TodoFirstScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
            <UsernameContext.Consumer>
            {([username, setUsername]) => (
                <TodoFirst></TodoFirst>
                
            )}
    </UsernameContext.Consumer>
)}
</TokenContext.Consumer>
)
}