import { setDoc, doc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useMutation } from 'react-query';

const colReference = collection(db, 'residents');

const addResident = async (ResidentDoc) => {
  console.log('calling from addResident inside hook:');
  console.log(ResidentDoc);
  return await addDoc(colReference, ResidentDoc);
};

export const useAddResident = () => {
  return useMutation(addResident);
};
