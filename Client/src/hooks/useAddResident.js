import { setDoc, doc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useMutation } from 'react-query';

const colReference = collection(db, 'residents');

const addResident = async (ResidentDoc) => {
  return await addDoc(colReference, ResidentDoc);
};

export const useAddResident = () => {
  return useMutation(addResident);
};
