import React, { useEffect, useState } from 'react';

import InputTextField from '../Fields/InputTextField';
import { STATUS_TYPES } from '@/constants/getTypes';
import InputNumberField from '../Fields/InputNumberField';
import Button from '../Button';
import GCashImg from '~/images/gcashlogo.png';
import CashinHand from '~/images/icons8-cash-in-hand-color/icons8-cash-in-hand-144.png';
import RadioButton from '../RadioButton';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
import { v4 } from 'uuid';
import { useAddRequestDoc } from '@/hooks/useRequestData';
import { DotLoader } from 'react-spinners';
import { useAuth } from '@/contexts/AuthContext';
import { serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';

function RequestForm() {
  //TODO Disable Submit if there
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isGcash, setIsGCash] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [requestObj, setRequestObj] = useState({
    serialCode: null,
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    documentType: '',
    birthdate: '',
    documentStatus: '',
    paymentMethod: '',
    screenShotUrl: '',
    createdAt: '',
  });

  const optionValues = [
    'Barangay Clearance',
    'Barangay Residency',
    'Barangay Indigency',
    'Business Permit',
  ];

  const {
    mutate: addRequest,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useAddRequestDoc();
  const { user, logout } = useAuth();

  const handleImage = (e) => {
    console.log(e.target.files);
    setImageFile(e.target.files[0]);
  };

  const handleBirthdate = (evt) => {
    const { name, value } = evt.target;
    setRequestObj({
      ...requestObj,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    const { value, name } = e.target;

    if (value === 'Barangay Residency' || value === 'Barangay Indigency') {
      setRequestObj({
        ...requestObj,
        documentType: value,
        paymentMethod: 'Not Valid',
      });
      setIsDisabled(false);
    } else if (value === '') {
      setIsDisabled(true);
    } else {
      setRequestObj({
        ...requestObj,
        documentType: value,
      });
    }
    setIsDisabled(false);
  };
  const handleInput = (val) => {
    const { value, name } = val;
    console.log('from handleInput: ' + value);
    setRequestObj({
      ...requestObj,
      [name]: value,
    });
    if (value === 'GCash') {
      setIsDisabled(true);
      setIsGCash(true);
    } else if (value === 'Cash') {
      setRequestObj({
        ...requestObj,
        paymentMethod: 'Cash',
        screenShotUrl: null,
      });
      setIsDisabled(false);
      setImageFile(null);
      setIsGCash(false);
    }
  };

  const addInfo = () => {
    return new Promise((resolve) => {
      setRequestObj({
        ...requestObj,
        documentStatus: STATUS_TYPES.PENDING,
        email: user.email,
      });
      resolve(requestObj.documentStatus);
    });
  };
  async function addAutoInfo() {
    console.log('adding auto info...');
    const infoAdded = await addInfo();
    console.log(infoAdded);
    if (requestObj.serialCode === null) {
      console.log('serial is null generating serial...');
      const serial = await generateSerial();
      setRequestObj({
        ...requestObj,
        serialCode: serial,
      });
    }
  }

  if (requestObj.documentStatus === '' || requestObj.email === '') {
    addAutoInfo();
  }

  const handleNextPage = () => {
    // setRequestObj({
    //   ...requestObj,
    //   createdAt: serverTimestamp(),
    //   email: user.email,
    //   documentStatus: STATUS_TYPES.PENDING,
    // });
    setIsFirstPage(false);
  };

  function handleBackOnSuccess() {
    setRequestObj({
      ...requestObj,
      firstName: '',
      lastName: '',
      contactNumber: '',
      documentType: '',
      paymentMethod: '',
      screenShotUrl: '',
      createdAt: serverTimestamp(),
    });
    reset();
  }

  const documentValidator = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      // TODO Disable submit button
      setIsDisabled(true);
    }
  };

  const uploadImage = async (evt) => {
    evt.preventDefault();
    // v4 for generating id
    const genID = v4();
    const imagePath = ref(storage, `screenshots/${genID + requestObj.name}`);
    if (imageFile === null) return;
    await uploadBytes(imagePath, imageFile).then(() => {
      alert('uploading image successfully');
    });
    await getDownloadURL(imagePath).then((imgUrl) => {
      setRequestObj({
        ...requestObj,
        screenShotUrl: imgUrl,
      });
      setIsDisabled(false);
    });
    console.log(requestObj.screenShotUrl);
  };

  const generateSerial = () => {
    const serialPattern = 6;
    const digits =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let generatedSerial = '';
    for (let index = 0; index < serialPattern; index++) {
      let randomVal = Math.floor(Math.random() * digits.length);
      generatedSerial += digits[randomVal];
    }
    return new Promise((resolve) => {
      if (generatedSerial.length === serialPattern) {
        resolve(generatedSerial);
      }
    });
  };
  const addTimestamp = () => {
    const timeStamp = serverTimestamp();
    return new Promise((resolve) => {
      resolve(timeStamp);
    });
  };
  const checkInfoifComplete = () => {
    return new Promise((resolve, reject) => {
      if (requestObj.createdAt !== '' && isConfirm === true) {
        resolve(requestObj);
      } else {
        reject('There is no object');
      }
    });
  };

  // -------- button handlers ----------
  const handleConfirmation = async (e) => {
    e.preventDefault();
    console.log('Hey This should be triggered first');
    setIsConfirm(true);
    const timestamp = await addTimestamp();
    setRequestObj({
      ...requestObj,
      createdAt: timestamp,
    });
    setTimeout(() => {
      setIsConfirm(true);
    }, 200);
  };

  // This needs to be triggered by another button and
  // in Form Event
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const request = await checkInfoifComplete();
      addRequest(request);
      setTimeout(() => {
        setIsConfirm(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <>
        <DotLoader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h2>Unable to process your Request</h2>
      </>
    );
  }
  if (isSuccess) {
    return (
      <>
        <div className='flex flex-col text-center'>
          <h3>Your request has been sent</h3>
          <h3>
            Please Take a screenshot of your Serial Code to claim your Request
          </h3>
          <h1>{requestObj.serialCode}</h1>
          <div>✅</div>
          <Button type='button' onClick={handleBackOnSuccess}>
            Done
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <form
        className='grid grid-cols-3 border-2 rounded-sm p-4'
        onSubmit={handleSubmit}
      >
        {(isConfirm && isFirstPage) ||
        (isConfirm && !isFirstPage && !isGcash) ? (
          <>
            <div className='col-span-3 grid grid-cols-2'>
              <p className='col-span-2'>
                See if your entered information below are correct
              </p>
              <div className='col-span-2 grid grid-cols-4'>
                <h4 className='col-span-1'>Name:</h4>
                <h3 className='col-span-3 text-right'>{`${requestObj.firstName} ${requestObj.lastName}`}</h3>
              </div>
              <div className='col-span-2 grid grid-cols-4'>
                <h4 className='col-span-1'>Document:</h4>
                <h3 className='col-span-3 text-right'>
                  {requestObj.documentType}
                </h3>
              </div>
            </div>
          </>
        ) : isConfirm && !isFirstPage && isGcash ? (
          <>
            <div className='col-span-3 grid grid-cols-2'>
              <p className='col-span-2'>
                See if your entered information below are correct
              </p>
              <div className='col-span-2 grid grid-cols-4'>
                <h4 className='col-span-1'>Name:</h4>
                <h3 className='col-span-3 text-right'>{`${requestObj.firstName} ${requestObj.lastName}`}</h3>
              </div>
              <div className='col-span-2 grid grid-cols-4'>
                <h4 className='col-span-1'>Document:</h4>
                <h3 className='col-span-3 text-right'>
                  {requestObj.documentType}
                </h3>
              </div>
              <div className='col-span-2 grid grid-cols-4'>
                <h4>Payment Screenshot</h4>
                {/* TODO Image */}
                <Image
                  src={requestObj.screenShotUrl}
                  alt={requestObj.screenShotUrl}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </>
        ) : isFirstPage ? (
          <>
            <div className='col-span-3 grid grid-cols-2 gap-4 items-center '>
              <span className='col-span-2 text-center'>
                Pangalan ng nasa dokumento
              </span>
              <InputTextField
                className='col-span-1 '
                type='text'
                name='firstName'
                required
                placeholder='E.g. Juan'
                label='First Name (Pangalan)'
                value={requestObj.firstName}
                getValue={(e) => handleInput(e)}
              />
              <InputTextField
                className='col-span-1'
                type='text'
                name='lastName'
                required
                placeholder='E.g. Cruz'
                label='Last Name (Apellido)'
                value={requestObj.lastName}
                getValue={(e) => handleInput(e)}
              />
              <div className='flex flex-col'>
                <label htmlFor='birthdate'>Birthdate</label>
                <input
                  name='birthdate'
                  type='date'
                  required
                  value={requestObj.birthdate}
                  selected={requestObj.birthdate}
                  onChange={handleBirthdate}
                />
              </div>
              <InputNumberField
                className='col-span-2'
                type='tel'
                name='contactNumber'
                placeholder='e.g. 0920-xxxx-xxx'
                label='Mobile Number (Optional)'
                pattern='[0-9]{11}'
                value={requestObj.contactNumber}
                getValue={(e) => handleInput(e)}
              />
              <div className='col-span-2 flex flex-col'>
                <label htmlFor='documentType' className='flex justify-between'>
                  Choose Document
                  {requestObj.documentType === 'Barangay Clearance' ||
                  requestObj.documentType === 'Business Permit' ? (
                    <span className='text-orange-600'>
                      {requestObj.documentType === 'Business Permit'
                        ? '150 Php'
                        : '20 Php'}{' '}
                      Payment required!
                    </span>
                  ) : null}
                </label>
                <select
                  name='documentType'
                  value={requestObj.documentType}
                  onBlur={documentValidator}
                  onChange={(e) => handleSelect(e)}
                >
                  <option value=''>Select Document</option>
                  {optionValues?.map((element, index) => {
                    return (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='col-span-3 gap-2 justify-center text-center grid grid-cols-2 w-full h-full p-2'>
              <h2 className='col-span-2'>Choose your Payment Method</h2>
              {isGcash && (
                <h3 className='col-span-3 text-orange-400'>
                  Please send{' '}
                  {requestObj.documentType === 'Business Permit'
                    ? '150 Php'
                    : '20 Php'}
                </h3>
              )}
              <RadioButton
                src={GCashImg}
                name='paymentMethod'
                value='GCash'
                label='Online GCash'
                // checkedVal={requestObj.paymentMethod}
                getValue={(val) => handleInput(val)}
                alt='Gcash Logo'
              />

              <RadioButton
                src={CashinHand}
                name='paymentMethod'
                value='Cash'
                label='Walk-in Cash'
                alt='Cash on Hand'
                // checkedVal={requestObj.paymentMethod}
                getValue={(val) => handleInput(val)}
              />
              {isGcash ? (
                <div className='col-span-2'>
                  <span>Please Send to</span>
                  <span>0999-xxxx-xxx</span>
                  <input
                    type='file'
                    name='screenShot'
                    accept='.jpg, .jpeg, .bmp, .png'
                    onChange={handleImage}
                  />
                  <Button onClick={uploadImage}>Upload Image</Button>
                </div>
              ) : null}
            </div>
          </>
        )}

        {isFirstPage === true &&
        (requestObj.documentType === 'Business Permit' ||
          requestObj.documentType === 'Barangay Clearance') ? (
          <>
            <div></div>
            <div></div>
            <Button
              type='button'
              className='bg-blue-300 mt-4'
              onClick={handleNextPage}
            >
              Next
            </Button>
          </>
        ) : isFirstPage &&
          (requestObj.documentType !== 'Business Permit' ||
            requestObj.documentType !== 'Barangay Clearance') ? (
          <>
            {isConfirm && isFirstPage ? (
              <Button
                className='col-span-1 bg-blue-200'
                type='button'
                onClick={() => setIsConfirm(false)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <div></div>
            {isConfirm && isFirstPage ? (
              <Button
                disabled={isDisabled}
                type='submit'
                className='bg-blue-300 mt-4 disabled:bg-gray-400'
              >
                Confirm Send
              </Button>
            ) : !isConfirm && isFirstPage ? (
              <Button
                disabled={isDisabled}
                type='button'
                onClick={handleConfirmation}
                className='bg-blue-300 mt-4 disabled:bg-gray-400'
              >
                Send Request
              </Button>
            ) : (
              // <button
              //   type='button'
              //   disabled={isDisabled}
              //   onClick={(e) => handleConfirmation(e)}
              //   className='bg-blue-300 mt-4 disabled:bg-gray-400'
              // >
              //   Send
              // </button>
              <></>
            )}
          </>
        ) : null}

        {!isFirstPage && isConfirm === false ? (
          <>
            <Button
              className='col-span-1 bg-blue-200'
              type='button'
              onClick={() => setIsFirstPage(true)}
            >
              Back
            </Button>
            <div></div>
            <Button
              name='to-Confirmation'
              type='button'
              disabled={isDisabled}
              onClick={handleConfirmation}
              className='bg-blue-300 mt-4 disabled:bg-gray-400'
            >
              Send Request
            </Button>
            {/* <button
              type='button'
              disabled={isDisabled}
              onClick={(e) => handleConfirmation(e)}
              className='bg-blue-300 mt-4 disabled:bg-gray-400'
            >
              Send
            </button> */}
          </>
        ) : !isFirstPage && isConfirm ? (
          <>
            <Button
              className='col-span-1 bg-blue-200'
              type='button'
              onClick={() => setIsConfirm(false)}
            >
              Back
            </Button>
            <div></div>
            <Button
              disabled={isDisabled}
              className='col-span-1 disabled:bg-gray-500'
              type='submit'
            >
              Confirm Request
            </Button>
          </>
        ) : null}
      </form>
    </>
  );
}

export default RequestForm;
