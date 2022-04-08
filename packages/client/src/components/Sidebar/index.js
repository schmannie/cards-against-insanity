import React from 'react';

import './Sidebar.css';

const Sidebar = props => {

    const children = props.children;

    return (
        <section id="sidebar">
            {children}
        </section>
    );
}

export default Sidebar;
