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

const requestCollection = collection(db, 'residents');
const getQuery = query(
  requestCollection,
  orderBy('lastName', 'asc'),
  limit(10)
);

const fetchResidents = async (queryParam) => {
  return await getDocs(queryParam);
};

export const useGetResidents = () => {
  return useInfiniteQuery(
    'residents',
    ({ pageParam = getQuery }) => {
      return fetchResidents(pageParam);
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

// === Add / Write Data
const colReference = collection(db, 'residents');

const addResident = async (ResidentDoc) => {
  return await addDoc(colReference, ResidentDoc);
};

export const useAddResident = () => {
  const queryInvalidate = useQueryClient();
  return useMutation(addResident, {
    onSuccess: () => {
      queryInvalidate.invalidateQueries('residents');
    },
  });
};

// === Update

const updateResident = async ({ residentDoc, residentID }) => {
  const docReference = doc(db, 'residents', residentID);
  return await setDoc(docReference, residentDoc);
};

export const useUpdateResident = () => {
  const queryInvalidate = useQueryClient();
  return useMutation(updateResident, {
    onSuccess: () => {
      queryInvalidate.invalidateQueries('residents');
    },
  });
};

// ==== Delete
const deleteResident = async (docID) => {
  await deleteDoc(doc(db, 'residents', docID));
};

export const useDeleteResident = () => {
  const queryInvalidate = useQueryClient();
  return useMutation(deleteResident, {
    onSuccess: () => {
      queryInvalidate.invalidateQueries('residents');
    },
  });
};
