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

  // if (isSuccess)
  //   return (
  //     <div>
  //       <Dialog open={openDialog}>
  //         <DialogTitle>
  //           <h2>Successfully Updated Resident</h2>
  //         </DialogTitle>
  //         <DialogContent dividers>
  //           <p></p>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button type='button' onClick={() => setOpenDialog(false)}>
  //             Confirm
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   );

  return (
    <div>
      {/* TODO Icon */}
      <Button type='button' onClick={() => router.push('/admin/residents')}>
        Go back
      </Button>
      <ResidentForm
        objectData={data}
        getObject={(value) => handleProcessMutation(value)}
      />
    </div>
  );
};

export default ResidentDetails;
