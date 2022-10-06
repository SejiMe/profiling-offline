import React from 'react';
import ResidentItem from './ResidentItem';
import { useQuery } from 'react-query';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ResidentView = ({ label = 'Feature' }) => {
  const { isLoading, data } = useQuery('residents', async () => {
    const colRef = collection(db, 'residents');
    const snapshots = await getDocs(colRef);
    console.log(snapshots);
    const documents = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    console.log(documents);
    return documents;
  });

  if (isLoading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <div className='h-full w-full'>
      <input type='text' placeholder='Search Resident Name' />
      <h2>{label}</h2>
      <div className=''>
        <ul className='flex flex-col gap-1'>
          {data?.map((document) => (
            <ResidentItem
              key={document.id}
              id={document.id}
              name={document.firstName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResidentView;
