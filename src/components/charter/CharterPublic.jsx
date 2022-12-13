import { useGetOfficials } from '@/hooks/useOfficialData';
import React from 'react';
import { Element } from 'react-scroll';
import { MoonLoader } from 'react-spinners';
import { useMedia } from 'react-use';
import OfficiateCard from './OfficiateCard';

const CharterPublic = () => {
  const isSmall = useMedia('(max-width: 580px)');
  const { data, isLoading } = useGetOfficials();
  if (isLoading) {
    return (
      <div>
        <MoonLoader />
      </div>
    );
  }
  return (
    <div
      className={` bg-slightG-500 w-full h-full flex flex-col ${
        isSmall ? 'justify-center items-center' : ''
      } `}
    >
      <Element name='about'>
        <h2 className='text-center mt-2'>Barangay Officials</h2>
      </Element>
      <div className='p-10 flex flex-col justify-center items-center md:grid md:grid-cols-6 gap-3 align-middle'>
        <OfficiateCard
          className={
            'col-start-2 col-end-6 bg-slate-50 p-5 border-2 border-black'
          }
          name={data.Captain}
          position={'Barangay Captain'}
        />
        <OfficiateCard
          className={
            'col-start-1 col-span-3 bg-slate-50 p-5 border-2 border-black'
          }
          name={data.Secretary}
          position={'Barangay Secretary'}
        />
        <OfficiateCard
          className={
            'col-start-4 col-span-3 p-5 bg-slate-50 border-2 border-black'
          }
          name={data.Treasurer}
          position={'Barangay Treasurer'}
        />
        <OfficiateCard
          className={
            'col-start-1 col-span-2 p-5 bg-slate-50 border-2 border-black'
          }
          name={data.Kagawad1}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={'col-span-2 p-5 bg-slate-50 border-2 border-black'}
          name={data.Kagawad2}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={'col-span-2 p-5 bg-slate-50 border-2 border-black'}
          name={data.Kagawad3}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={'col-span-2 p-5 bg-slate-50 border-2 border-black'}
          name={data.Kagawad4}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={'col-span-2 p-5 bg-slate-50 border-2 border-black'}
          name={data.Kagawad5}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={'col-span-2 p-5 bg-slate-50 border-2 border-black'}
          name={data.Kagawad6}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={
            'col-start-3 col-span-2 p-5 bg-slate-50 border-2 border-black'
          }
          name={data.Kagawad7}
          position={'Barangay Kagawad'}
        />
        <OfficiateCard
          className={
            'col-start-3 col-span-2 p-5 bg-slate-50 border-2 border-black'
          }
          name={data.SK}
          position={'SK Chairman'}
        />
      </div>
    </div>
  );
};

export default CharterPublic;
