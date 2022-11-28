import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import ResidentForm from '@/components/residents/ResidentForm';
import SVGRemove from '@/components/svg/icons8-denied/icons8-denied-96.svg';
import BackSVG128 from '@/components/svg/icons8-go-back-pastel-glyph/icons8-go-back-128.svg';
import { useDeleteResident, useUpdateResident } from '@/hooks/useResidentData';
import { MoonLoader } from 'react-spinners';
import useUpdateCount from '@/hooks/useUpdateCount';

const ResidentDetails = () => {
  //TODO back button for User Interaction
  // 1. Read Data from firebase get the Doc file === Doc ID
  // 2. Send Merge Data to Firebase
  const router = useRouter();
  const params = router.query;
  const id = params.id.toString();

  const { isLoading: idLoading, data } = useQuery(
    `${router.query}`,
    async () => {
      //Read Data based on ID
      const docReference = doc(db, 'residents', id);
      const document = await getDoc(docReference);
      const docData = document.data();
      console.log(docData);
      return docData;
    }
  );

  const { mutate: deleteResident } = useDeleteResident();
  const { mutate: updateResident } = useUpdateResident();
  const { mutate: decrementCount } = useUpdateCount();

  const handleProcessMutation = (Doc) => {
    updateResident({ residentDoc: Doc, residentID: id });
  };

  if (idLoading)
    return (
      <div className='h-screen w-screen flex justify-center align-middle items-center'>
        <MoonLoader />
      </div>
    );

  const handleDelete = (docID) => {
    decrementCount(-1);
    deleteResident(docID);
    setTimeout(() => {
      router.push('/admin/residents');
    }, 2000);
  };

  return (
    <div className='p-4'>
      {/* TODO Icon */}
      <div className='flex justify-between'>
        <Button
          type='button'
          className='bg-transparent ml-10 '
          onClick={() => router.push('/admin/residents')}
        >
          <BackSVG128 className='w-8 h-8' />
        </Button>
        <Button
          type='button'
          className='bg-transparent mr-10 '
          onClick={() => handleDelete(id)}
        >
          <SVGRemove className='w-10 h-10 fill-red-600' />
        </Button>
      </div>

      <div className='p-2 w-full h-full'>
        <ResidentForm
          ResidentFormType='Update'
          objectData={data}
          getObject={(value) => handleProcessMutation(value)}
        />
      </div>
    </div>
  );
};

export default ResidentDetails;
