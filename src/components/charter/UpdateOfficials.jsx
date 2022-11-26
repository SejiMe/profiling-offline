import { db } from '@/config/firebaseConfig';
import { useGetOfficials } from '@/hooks/getOfficial';
import { useUpdateOfficials } from '@/hooks/useUpdateOfficial';
import residents from '@/pages/admin/residents';
import clsx from 'clsx';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import Button from '../Button';
import InputText from '../Fields/InputText';

const UpdateOfficials = () => {
  const { data, isFetched, isLoading } = useGetOfficials();
  const [officials, setOfficials] = useState(data);
  const router = useRouter();
  console.log(officials);
  const { mutate: updateOfficial } = useUpdateOfficials();

  const processMutation = (charterDoc) => {
    updateOfficial({ officialsDoc: charterDoc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processMutation(officials);
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const handleInput = (val) => {
    const { value, name } = val;
    console.log('from handleInput: ' + value);
    setOfficials({
      ...officials,
      [name]: value,
    });
  };

  if (isLoading) {
    return (
      <div>
        <MoonLoader />
      </div>
    );
  }

  return (
    <div className=' p-1 top-0 bg-white'>
      <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
        <SectionDiv>
          <SectionHeading>Barangay Captain</SectionHeading>
          <InputText
            value={officials.Captain}
            type='text'
            name='Captain'
            className=''
            getValue={(e) => handleInput(e)}
          />
        </SectionDiv>
        <SectionDiv>
          <SectionHeading>Barangay Secretary</SectionHeading>
          <InputText
            value={officials.Secretary}
            type='text'
            name='Secretary'
            className=''
            getValue={(e) => handleInput(e)}
          />
        </SectionDiv>
        <SectionDiv>
          <SectionHeading>Barangay Treasurer</SectionHeading>
          <InputText
            value={officials.Treasurer}
            type='text'
            name='Treasurer'
            className=''
            getValue={(e) => handleInput(e)}
          />
        </SectionDiv>
        <SectionDiv></SectionDiv>

        <SectionDiv className=''>
          <SectionHeading>Mga Kagawad</SectionHeading>
          <div className='grid grid-cols-2 gap-2'>
            <InputText
              value={officials.Kagawad1}
              type='text'
              name='Kagawad1'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad2}
              type='text'
              name='Kagawad2'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad3}
              type='text'
              name='Kagawad3'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad4}
              type='text'
              name='Kagawad4'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad5}
              type='text'
              name='Kagawad5'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad6}
              type='text'
              name='Kagawad6'
              className=''
              getValue={(e) => handleInput(e)}
            />
            <InputText
              value={officials.Kagawad7}
              type='text'
              name='Kagawad7'
              className=''
              getValue={(e) => handleInput(e)}
            />
          </div>
        </SectionDiv>
        <SectionDiv>
          <label htmlFor='sk'>SK Chairman</label>
          <InputText
            type='text'
            name='SK'
            className=''
            value={officials.SK}
            getValue={(e) => handleInput(e)}
          />
        </SectionDiv>
        <Button type={'submit'}>Update</Button>
      </form>
    </div>
  );
};

const SectionDiv = ({ className, children }) => {
  return <div className={clsx('p-2 flex flex-col', className)}>{children}</div>;
};
const SectionHeading = ({ className, children }) => {
  return <span>{children}</span>;
};
export default UpdateOfficials;
