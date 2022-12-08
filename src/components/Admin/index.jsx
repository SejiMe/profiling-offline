import { db } from '@/config/firebaseConfig';
import clsx from 'clsx';
import {
  collection,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../Button';
import CardContainer from './CardContainer';

const Admin = () => {
  const getResidentsCount = async () => {
    const colRef = collection(db, 'residents');
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count;
  };

  const getVaccinated = async () => {};

  const getDeliveredDocuments = async () => {};

  const getPendingRequests = async () => {
    const colRef = collection(db, 'requests');
    const query_ = query(colRef, where('documentStatus', '==', 'Pending'));
    const snapshot = await getCountFromServer(query_);
    return snapshot.data().count;
  };

  const { data: resCount } = useQuery('resident-count', getResidentsCount);
  const { data: penCount } = useQuery('pending-count', getPendingRequests);

  return (
    <div className='w-full px-4 py-2 flex flex-col gap-2 '>
      <CardRows>
        <CardContainer>
          <CardTitle>Mission</CardTitle>
          <CardParagraph>
            Bumuo at magpaunlad ng mga programa at proyektong pang-unlad sa
            aspeto ng pangkabuhayan, pangkalusugan at pang-edukasyon ng mga
            pamilya. Maging masipag at hangarin na maingat ang antas ng buhay ng
            mga tao sa pamamagitan ng pagsuporta sa mga proyekto.
          </CardParagraph>
        </CardContainer>
        <CardContainer>
          <CardTitle>Vision</CardTitle>
          <CardParagraph>
            Pangarap na magkaroon ng maunlad, masagana at tiyak na hanap-buhay
            ang bawal pamilya sa Barangay, maging mulat sa lahat.
          </CardParagraph>
        </CardContainer>
      </CardRows>
      <CardRows>
        <CardContainer className={'h-[20%]'}>
          <CardTitle className={'text-green-400'}>
            Registered Population
          </CardTitle>
          <CardHighlight className={'text-green-400'}>{resCount}</CardHighlight>
        </CardContainer>
        <CardContainer className={'h-[20%]'}>
          <CardTitle className={'text-orange-500'}>Pending Documents</CardTitle>
          <CardHighlight className={'text-orange-500'}>
            {penCount}
          </CardHighlight>
        </CardContainer>
      </CardRows>
    </div>
  );
};
const CardRows = ({ children, className }) => {
  return <div className={clsx('flex gap-2', className)}>{children}</div>;
};

const CardParagraph = ({ children, className }) => {
  return <p className={clsx('text-start flex-nowrap')}>{children}</p>;
};

const CardTitle = ({ children, className }) => {
  return <h3 className={clsx('', className)}>{children}</h3>;
};

const CardHighlight = ({ children, className }) => {
  return <h4 className={clsx('', className)}>{children}</h4>;
};

export default Admin;
