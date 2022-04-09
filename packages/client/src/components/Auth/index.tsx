import React from 'react';

import './Auth.css';

type AuthProps = {
  children: React.ReactNode;
};

const Auth = (props: AuthProps) => {

  const children = props.children;

  return (
    <section id="auth">
      {children}
    </section>
  );
}

export default Auth;
