import { db } from '@/config/firebaseConfig';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { useQuery } from 'react-query';

const fetchResemblance = async (firstName, lastName) => {
  const residentsRef = collection(db, 'residents');
  return await getDocs(
    residentsRef,
    where('firstName', '==', firstName),
    where()
  );
};

export const useGetRelevance = () => {
  return useQuery('resemblance', fetchResemblance());
};
