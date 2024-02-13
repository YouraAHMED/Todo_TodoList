
import React from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import SignUp from '../components/SignUp';

export default function SignUpScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
            <UsernameContext.Consumer>
            {([username, setUsername]) => (
                <SignUp></SignUp>
            )}
    </UsernameContext.Consumer>
)}
</TokenContext.Consumer>
)
}