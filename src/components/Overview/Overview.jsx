import React from 'react';
import { Element } from 'react-scroll';
import Map from '../Map';

const Overview = () => {
  return (
    <Element name='contact'>
      <div className='flex flex-col h-full w-full'>
        <h1>Overview</h1>
        <Map />
        <div className='flex'>
          <div className='flex flex-col h-full'>
            <div>
              <h2>Mission</h2>
              <p>
                Bumuo at magpaunlad ng mga programa at proyektong pang-unlad sa
                aspeto ng pangkabuhayan, pangkalusugan at pang-edukasyon ng mga
                pamilya. Maging masipag at hangarin na maingat ang antas ng
                buhay ng mga tao sa pamamagitan ng pagsuporta sa mga proyekto.
              </p>
            </div>
            <div>Vision</div>
          </div>
          <div>Background</div>
        </div>
        <div className='flex'>
          <div className='flex'></div>

          <div className='flex flex-col'>
            <h2>Contact Us</h2>
            <span>
              Caramutan, La Paz, Tarlac Philippines Behind the Caramutan Covered
              Court
            </span>
            <span>officialbarangaycaramutan123@yahoo.com.ph</span>
            <span>606-1265</span>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Overview;
