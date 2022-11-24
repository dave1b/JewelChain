import React from 'react';
import { Outlet } from 'react-router-dom';

import { NavigationBar } from './navigation-bar';

export const PageContainer = () => {
  return (
    <div className="m-4">
      {/* make max width of content 1250px and make content have an equal margin on left and right side */}
      <div style={{ maxWidth: 1250, margin: '0 auto' }}>
        <div className="mb-4">
          <NavigationBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
