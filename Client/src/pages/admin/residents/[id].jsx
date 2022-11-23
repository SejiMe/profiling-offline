import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import ResidentForm from '@/components/residents/ResidentForm';
import { useUpdateResident } from '@/hooks/useUpdateResident';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import BackSVG128 from '@/components/svg/icons8-go-back-pastel-glyph/icons8-go-back-128.svg';
import BackSVG64 from '@/components/svg/icons8-go-back-pastel-glyph/icons8-go-back-64.svg';

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

  const { mutate: updateResident } = useUpdateResident();

  const handleProcessMutation = (Doc) => {
    updateResident({ residentDoc: Doc, residentID: id });
  };

  if (idLoading) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      {/* TODO Icon */}
      <Button
        type='button'
        className='bg-none'
        onClick={() => router.push('/admin/residents')}
      >
        <BackSVG128 />
      </Button>
      <div className='p-2 w-full h-full'>
        <ResidentForm
          objectData={data}
          getObject={(value) => handleProcessMutation(value)}
        />
      </div>
    </div>
  );
};

export default ResidentDetails;
