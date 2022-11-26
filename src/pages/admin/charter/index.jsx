import OfficiateCard from '@/components/charter/OfficiateCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import Container from '@/components/layouts/Container';
import UpdateOfficials from '@/components/charter/UpdateOfficials';
import Pencil from '@/components/svg/icons8-pencil/icons8-pencil-32.svg';
import React, { useState } from 'react';
import { useMedia } from 'react-use';
import Popup from '@/components/Popup';
import { useGetOfficials } from '@/hooks/getOfficial';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/router';

function index() {
  const isMobile = useMedia('(max-width: 680px)');
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetOfficials();
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleOnClose = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <MoonLoader />
      </div>
    );
  }

  return (
    <AdminLayout>
      <Container
        className={
          'flex md:flex-col p-10 justify-center content-center items-center'
        }
      >
        <div className='shadow-lg w-[95%] h-[95%] bg-white rounded-lg overflow-auto'>
          <Popup
            title={'Edit Barangay Officials'}
            openPopup={isOpen}
            setOpenPopup={handleOnClose}
          >
            <UpdateOfficials />
          </Popup>
          <div className='h-50 w-full flex flex-row-reverse'>
            <button
              onClick={handleClick}
              className='flex hover:bg-slate-400 hover:text-white hover:fill-white p-3 gap-1 mr-4 mt-4'
            >
              <Pencil className='mr-2 mt-1' />
              Edit
            </button>
          </div>
          <div className='p-10 grid grid-cols-3 gap-x-3 gap-y-5'>
            <OfficiateCard
              className={'col-start-1 col-end-3'}
              name={data.Captain}
              position={'Barangay Captain'}
            />
            <OfficiateCard
              className={'col-start-1 col-span-1'}
              name={data.Secretary}
              position={'Barangay Secretary'}
            />
            <OfficiateCard
              className={'col-span-1'}
              name={data.Treasurer}
              position={'Barangay Treasurer'}
            />
            <OfficiateCard
              className={'col-start-1'}
              name={data.Kagawad1}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={''}
              name={data.Kagawad2}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={''}
              name={data.Kagawad3}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={'col-start-1'}
              name={data.Kagawad4}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={''}
              name={data.Kagawad5}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={''}
              name={data.Kagawad6}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={'col-start-2'}
              name={data.Kagawad7}
              position={'Barangay Kagawad'}
            />
            <OfficiateCard
              className={'col-start-2'}
              name={data.SK}
              position={'SK Chairman'}
            />
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
}

export default index;
