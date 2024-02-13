import React, {} from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import SignOut from '../components/SignOut';

export default function SignOutScreen({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => (
                        <SignOut />
                    )}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    );
}
