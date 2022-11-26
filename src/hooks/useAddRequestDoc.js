import { db } from '@/config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
const newRequestRef = collection(db, 'requests');

const addRequestDoc = async (docRef) => {
  return await addDoc(newRequestRef, docRef);
};

export const useAddRequestDoc = () => {
  return useMutation(addRequestDoc);
};
