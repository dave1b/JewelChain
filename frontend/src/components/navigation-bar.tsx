import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { InfoTooltip } from '../ui/info-tooltip';
import { useAuth } from './../hooks/use-auth';

const PAGES = [
  { path: '', label: 'JewelChain', icon: 'pi pi-fw ri-vip-diamond-line' },
  { path: 'check', label: 'Jewel prüfen', icon: 'pi pi-fw ri-shield-check-line' },
  { path: 'update', label: 'Jewel aktualisieren', icon: 'pi pi-fw ri-list-settings-fill' },
  { path: 'new', label: 'Jewel registrieren', icon: 'pi pi-fw pi-plus-circle' },
  { path: 'profile', label: 'Profil', icon: 'pi pi-fw pi-user-plus' },
];

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accountAddress, login, authProcessActive } = useAuth();

  const onTabChange = (e: TabMenuTabChangeParams & { value: MenuItem & { path: string } }) => {
    navigate(e.value.path);
  };

  // determine which tab is active by looking at the first part of the URL
  const firstPath = location.pathname.split('/')[1];
  const activeIndex = PAGES.map(({ path }) => path).indexOf(firstPath);

  return (
    <div className="flex navigation-bar">
      <TabMenu className="flex-grow-1" model={PAGES} activeIndex={activeIndex} onTabChange={onTabChange} />
      <div className="flex p-tabmenu overflow-visible">
        <div className="p-tabmenu-nav">
          {accountAddress ? (
            <Chip
              className="align-self-center"
              icon="pi pi-user"
              label="Connected"
              template={
                <>
                  <span className="p-chip-icon pi pi-user"></span>
                  <span className="p-chip-text">Connected</span>
                  <InfoTooltip
                    className="p-chip-icon mr-0 ml-2"
                    id="account-status"
                    text={`Connected to metamask. Account Address:\n${accountAddress}`}
                  />
                </>
              }
            />
          ) : (
            <Button
              label="Anmelden"
              type="button"
              className="p-button-outlined align-self-center"
              onClick={login}
              disabled={authProcessActive}
              loading={authProcessActive}
            />
          )}
        </div>
      </div>
    </div>
  );
};
