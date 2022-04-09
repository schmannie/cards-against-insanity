import React from 'react';

import './Sidebar.css';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = (props: SidebarProps) => {

  const children = props.children;

  return (
    <section id="sidebar">
      {children}
    </section>
  );
}

export default Sidebar;
