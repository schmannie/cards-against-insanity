import React from 'react';

import './Auth.css';

const Auth = props => {

    const children = props.children;

    return (
        <section id="auth">
            {children}
        </section>
    );
}

export default Auth;
