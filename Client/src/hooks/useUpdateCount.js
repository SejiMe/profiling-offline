import { db } from '@/config/firebaseConfig';
import { doc, increment, setDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';

const docRef = doc(db, 'counter', 'docCounter');
const useUpdateCount = () =>
  useMutation((countNum) =>
    setDoc(docRef, { count: increment(countNum) }, { merge: true })
  );

export default useUpdateCount;
