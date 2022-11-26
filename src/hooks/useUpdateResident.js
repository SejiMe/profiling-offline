import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useMutation } from 'react-query';

const updateResident = async ({ residentDoc, residentID }) => {
  console.log(residentDoc);
  console.log(residentID);

  const docReference = doc(db, 'residents', residentID);

  return await setDoc(docReference, residentDoc);
};

export const useUpdateResident = () => {
  return useMutation(updateResident);
};
