import { db } from '@/config/firebaseConfig';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from 'firebase/firestore';
import { useInfiniteQuery } from 'react-query';

const requestCollection = collection(db, 'requests');
const getQuery = query(
  requestCollection,
  orderBy('createdAt', 'desc'),
  limit(10)
);

const fetchRequests = async (queryParam) => {
  return await getDocs(queryParam);
};

export const useGetRequests = () => {
  return useInfiniteQuery(
    'requests',
    ({ pageParam = getQuery }) => {
      return fetchRequests(pageParam);
    },
    {
      getNextPageParam: (pageSnapshot, allPages) => {
        if (!pageSnapshot.docs.length) return;
        const lastDocument = pageSnapshot.docs[pageSnapshot.docs.length - 1];

        return query(getQuery, startAfter(lastDocument));
      },
      getPreviousPageParam: (pageSnapshot, allPages) => {
        if (!pageSnapshot.docs.length) return;
        const firstDocument = pageSnapshot.docs[0];
        return query(getQuery, startAt(firstDocument));
      },
    }
  );
};