import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export const HomePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const onCheckJewelClick = () => {
    navigate('check');
  };

  const onLoginClick = () => {
    // TODO: Login
  };

  return (
    <div className="grid grid-nogutter text-800 mt-6" style={{ height: '50vh' }}>
      <div className="col-12 md:col-6 text-center md:text-left flex align-items-center">
        <section style={{ maxWidth: 524, margin: isMobile ? '0 auto' : undefined }}>
          <span className="block text-6xl font-bold mb-1">Fairer Luxus</span>
          <div className="text-6xl text-primary font-bold mb-3">dank Blockchain</div>
          <p className="mt-0 mb-4 text-700 line-height-3">
            JewelChain macht deinen Luxus fair, indem durch Blockchain-Technologie die komplette Lieferkette für dich
            transparent gemacht wird.
          </p>
          <Button label="Jewel prüfen" type="button" className="mr-3 p-button-raised" onClick={onCheckJewelClick} />
          <Button label="Anmelden" type="button" className="p-button-outlined" onClick={onLoginClick} />
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
        <div
          className="md:h-full"
          style={{
            backgroundImage: 'url(assets/images/jewel-on-stone-2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '100px',
          }}
        />
      </div>
    </div>
  );
};
