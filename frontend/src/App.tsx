import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageContainer } from './components/page-container';
import { CheckStonePage } from './pages/check-stone-page';
import { HomePage } from './pages/home-page';
import { NewStonePage } from './pages/new-stone-page';
import { NotFoundPage } from './pages/not-found-page';
import { RegisterParticipantPage } from './pages/register-participant-page';
import { UpdateStonePage } from './pages/update-stone-page';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PageContainer />}>
          <Route path="" element={<HomePage />} />
          <Route path="check" element={<CheckStonePage />} />
          <Route path="update" element={<UpdateStonePage />} />
          <Route path="new" element={<NewStonePage />} />
          <Route path="profile" element={<RegisterParticipantPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
