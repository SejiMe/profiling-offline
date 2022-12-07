import { db } from '@/config/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
} from 'firebase/firestore';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

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

// ==== Add
const newRequestRef = collection(db, 'requests');

const addRequestDoc = async (docRef) => {
  return await addDoc(newRequestRef, docRef);
};

export const useAddRequestDoc = () => {
  return useMutation(addRequestDoc);
};

// ======== Update

const updateRequest = async ({ requestDoc, requestID }) => {
  const requestRef = doc(db, 'requests', requestID);
  return await setDoc(requestRef, requestDoc);
};

export const useUpdateRequests = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('requests');
    },
  });
};
