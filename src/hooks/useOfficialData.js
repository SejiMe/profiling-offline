import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useMutation, useQuery } from 'react-query';

const fetchOfficials = async () => {
  const docReference = doc(db, 'officials', 'charter');
  const document = await getDoc(docReference);
  console.log('inside hook');
  console.log(document.data());
  return document.data();
};

export const useGetOfficials = () => {
  return useQuery('officials', fetchOfficials);
};

const updateOfficials = async ({ officialsDoc }) => {
  const officialsRef = doc(db, 'officials', 'charter');
  return await setDoc(officialsRef, officialsDoc);
};

export const useUpdateOfficials = () => {
  return useMutation(updateOfficials);
};
