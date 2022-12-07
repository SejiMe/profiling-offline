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

export const useGetResemblance = () => {
  return useQuery('resemblance', fetchResemblance);
};
