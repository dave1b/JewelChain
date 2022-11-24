import { MenuItem } from 'primereact/menuitem';
import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGES = [
  { path: '', label: 'JewelChain', icon: 'pi pi-fw ri-vip-diamond-line' },
  { path: 'check', label: 'Jewel prüfen', icon: 'pi pi-fw ri-shield-check-line' },
  { path: 'update', label: 'Jewel aktualisieren', icon: 'pi pi-fw ri-list-settings-fill' },
  { path: 'new', label: 'Jewel registrieren', icon: 'pi pi-fw pi-plus-circle' },
  { path: 'register', label: 'Participant registrieren', icon: 'pi pi-fw pi-user-plus' },
];

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onTabChange = (e: TabMenuTabChangeParams & { value: MenuItem & { path: string } }) => {
    navigate(e.value.path);
  };

  // determine which tab is active by looking at the first part of the URL
  const firstPath = location.pathname.split('/')[1];
  const activeIndex = PAGES.map(({ path }) => path).indexOf(firstPath);

  return <TabMenu model={PAGES} activeIndex={activeIndex} onTabChange={onTabChange} />;
};
