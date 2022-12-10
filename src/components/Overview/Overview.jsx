import React from 'react';
import { Element } from 'react-scroll';
import Map from '../Map';

const Overview = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <h1 className='mb-10 text-center'>Overview</h1>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col h-full'>
          <div>
            <h2>Mission</h2>
            <p>
              Bumuo at magpaunlad ng mga programa at proyektong pang-unlad sa
              aspeto ng pangkabuhayan, pangkalusugan at pang-edukasyon ng mga
              pamilya. Maging masipag at hangarin na maingat ang antas ng buhay
              ng mga tao sa pamamagitan ng pagsuporta sa mga proyekto.
            </p>
          </div>
          <div>
            <h2>Vision</h2>
            <p>
              Pangarap na magkaroon ng maunlad, masagana at tiyak na hanap-buhay
              ang bawal pamilya sa Barangay, maging mulat sa lahat.
            </p>
          </div>
        </div>
        <div className='w-full flex flex-wrap'>
          <h2>Background</h2>
          <p className=''>
            Maraming taon na ang nakakalipas at nagpasalin-salin na ang
            kasaysayan ng nayon ng Caramutan sa bibig ng mga ka-barangay. Sagana
            ang buhay ng mga naninirahan sa kanilang aning palay, gulay at mga
            nahuhuling isda sa ilog. Ang magkakapit-bahay ay nagmamalasakitan at
            nagtutulungan sa isat-isa sa mga gawaing bukid. Ang libangan ng mga
            batang paslit tuwing kabilugan ng buwan ay “taguan”. Ito ang popular
            na larong bata ng kapanahunang iyon. Isa sa mga batang ito ay si
            Carlos Amutan, nag-iisang anak ng mag-asawang Kiko at Doray Amutan
            na pinalad na nakakaluwag sa buhay. Mula sa paglalaro ng taguan
            isang gabi ay hindi na umuwi ng bahay si Carlos o Car sa kanyang mga
            magulang at mga kalaro. Naging bigo ang kanyang mga magulang sa
            paghahanap sa kanya hanggang sa mawalan sa sila ng pag-asa. Sa labis
            na dalamhati ay namatay ang kanyang ama. Si Aling Doray naman ay
            pinanawan ng matinong kaisipan. Pinupuntahan niya ang kagubatan at
            may panaghoy na tinatawag ang pangalan ng kanyang anak. . . . . Car
            Car Car Car Amutan Car Amutan Car Amutan. . . . . . Isang araw siya
            ay nadaanan ng mga manlalakbay na taga-Zaragoza habang nananaghoy at
            isinisigaw ang pangalan ni Car Amutan. Nasabi nila sa isa’t-isa na
            ang lugar na iyon pala ay ang nayon ng Caramutan. Mula noon ang
            aming nayon ay tinawag na Caramutan.
          </p>
        </div>
      </div>
      <Element name='contact'>
        <div className='flex flex-col w-full gap-2 lg:flex-row  lg:items-center'>
          <div className='flex h-full w-full mb-2 mt-2 lg:py-4 lg:pr-10'>
            <Map />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='mb-2'>Contact Us</h2>
            <span>
              Caramutan, La Paz, Tarlac Philippines Behind the Caramutan Covered
              Court
            </span>
            <span>officialbarangaycaramutan123@yahoo.com.ph</span>
            <span>606-1265</span>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Overview;
