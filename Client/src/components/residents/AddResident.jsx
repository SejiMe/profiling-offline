import React, { useState } from 'react';
import ResidentForm from './ResidentForm';
import moment from 'moment/moment';
import 'firebase/app';
import { useRouter } from 'next/router';
import { useAddResident } from '@/hooks/useAddResident';
import useUpdateCount from '@/hooks/useUpdateCount';
import Button from '../Button';
import { ClipLoader } from 'react-spinners';

const AddResident = () => {
  const [object, setObject] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    alias: '',
    gender: '',
    birthdate: moment().format('MM-DD-YYYY'),
    birthplace: '',
    religion: '',
    bloodType: '',
    civ_status: '',
    nationality: '',
    education: '',
    occupation: '',
    contacts: {
      lot: '',
      streetName: '',
      purok: '',
      barangay: 'Caramutan',
      city: 'La Paz',
      province: 'Tarlac',
      mobile: '',
      telephone: '',
      email: '',
    },
    family: {
      father: '',
      mother: '',
      spouse: '',
      children: [],
    },
    beneficiaries: {
      _4ps: false,
      pension: false,
    },
    health: {
      pwd: false,
      covidvax: false,
    },
  });

  const { mutate: updateCountBy } = useUpdateCount();
  const {
    mutate: addResident,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    error,
  } = useAddResident();

  console.log({ isIdle, isLoading });
  const handleObjectData = (value) => {
    const objectDocument = value;
    /* Setting the state of the object to the data. */
    console.log('Inside handleObjectData');
    console.log(objectDocument);
    setObject(objectDocument);
    updateCountBy(1);
    addResident(objectDocument);
  }; /* Calling the `addResident` function from the `useAddResident` hook. */

  const router = useRouter();
  if (isIdle) {
    return (
      <div>
        {/* TODO Icon */}

        <div>
          <ResidentForm
            /* Passing the object to the ResidentForm component. */
            objectData={object}
            /* A function that takes in a value, sets the data to that value, and then sets the object to
        that data. */
            getObject={(value) => handleObjectData(value)}
          />
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <ClipLoader speedMultiplier={2} />;
  }
  if (isError) {
    return (
      <div>
        <h2>Sorry Something Went Wrong {error}</h2>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div>
        <h2>Resident Added Successfully</h2>
        <button type='button' onClick={() => useAddResident.reset()}></button>
      </div>
    );
  }
};

export default AddResident;
