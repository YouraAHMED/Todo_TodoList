
import React from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import SignIn from '../components/SignIn';


export default function SignInScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
            <UsernameContext.Consumer>
            {([username, setUsername]) => (
                <SignIn></SignIn>
            )}
    </UsernameContext.Consumer>
)}
</TokenContext.Consumer>
)
}