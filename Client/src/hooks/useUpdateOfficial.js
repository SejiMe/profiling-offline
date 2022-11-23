import { useMutation } from 'react-query';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const updateOfficials = async ({ officialsDoc }) => {
  const officialsRef = doc(db, 'officials', 'charter');
  return await setDoc(officialsRef, officialsDoc);
};

export const useUpdateOfficials = () => {
  return useMutation(updateOfficials);
};
