import React, { useState } from 'react';
import ResidentForm from './ResidentForm';
import moment from 'moment/moment';
import 'firebase/app';
import { useRouter } from 'next/router';
import { useAddResident } from '@/hooks/useResidentData';
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
    birthdate: '',
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
      _4ps: [],
      senior: '',
      pension: false,
    },
    health: {
      pwd: false,
      Vaccine1Type: '',
      Vaccine1Date: '',
      Vaccine1Location: '',
      Vaccine2Type: '',
      Vaccine2Date: '',
      Vaccine2Location: '',
      boosters: [],
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
            ResidentFormType='Add'
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
      <div className='flex flex-col justify-center align-middle items-center content-center'>
        <h2>Resident Added Successfully</h2>
        <h3>
          {object.firstName} {object.lastName}
        </h3>
        <Button
          type='button'
          onClick={() => {
            router.reload;
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }
};

export default AddResident;
