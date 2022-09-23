import React, { Children } from 'react';
import Sidebar from './Sidebar';
import SplitPane from './SplitPane';

const AdminLayout = ({ children }) => {
  return (
    <>
      <SplitPane left={<Sidebar />} right={children} />
    </>
  );
};

export default AdminLayout;
