import { doc, deleteDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import { db } from '@/config/firebaseConfig';

const deleteResident = async (docID) => {
  await deleteDoc(doc(db, 'residents', docID));
};

export const useDeleteResident = () => {
  return useMutation(deleteResident);
};
