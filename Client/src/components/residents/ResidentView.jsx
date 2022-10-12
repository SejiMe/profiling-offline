import React, { useState } from 'react';
import ResidentItem from './ResidentItem';
import { useQuery } from 'react-query';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Button from '../Button';
import DotLoader from 'react-spinners/DotLoader';
import Popup from '../Popup';
import AddResident from './AddResident';

const fetchData = async () => {
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
};

const ResidentView = () => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const { isLoading, data } = useQuery('resident-query', fetchData, {
    cacheTime: 5000,
  });

  return (
    <div className='h-full w-full'>
      <input type='text' placeholder='Search Resident Name' />
      <Button onClick={() => setOpenPopup(true)}>Add Resident</Button>
      <Popup
        title='Add Resident Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddResident />
      </Popup>

      <div className=''>
        <ul className='flex flex-col gap-1'>
          {data?.map((document) => (
            <div key={document.id}>
              <ResidentItem
                id={document.id}
                fname={document.firstName}
                lname={document.lastName}
                mName={document.middleName}
              />
            </div>
          ))}
        </ul>
        2
      </div>
    </div>
  );
};

export default ResidentView;
