import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useQuery } from 'react-query';

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
