import React, { useState } from 'react';

import InputTextField from '../Fields/InputTextField';
import moment from 'moment/moment';
import { STATUS_TYPES } from '@/constants/getTypes';
import InputNumberField from '../Fields/InputNumberField';
import Button from '../Button';
import GCashImg from '~/images/gcashlogo.png';
import CashinHand from '~/images/icons8-cash-in-hand-color/icons8-cash-in-hand-144.png';
import RadioButton from '../RadioButton';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
import { v4 } from 'uuid';
import { useAddRequestDoc } from '@/hooks/useAddRequestDoc';
import { DotLoader } from 'react-spinners';
import { useAuth } from '@/contexts/AuthContext';

function RequestForm() {
  //TODO Disable Submit if there
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isGcash, setIsGCash] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [requestObj, setRequestObj] = useState({
    uid: '',
    serialCode: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    documentType: '',
    documentStatus: '',
    requestCount: 0,
    paymentMethod: '',
    screenShotUrl: '',
    date: moment().format('DD-MM-YYYY'),
    time: moment().format('hh-mm-ss-A'),
  });

  const optionValues = [
    'Barangay Clearance',
    'Barangay Indigency',
    'Guardianship',
    'Business Permit',
  ];

  //Value truty
  const trutyVal = true;

  const { mutate: addRequest, isLoading } = useAddRequestDoc();
  const { user } = useAuth();

  const handleImage = (e) => {
    console.log(e.target.files);
    setImageFile(e.target.files[0]);
  };

  const handleSelect = (e) => {
    const { value, name } = e.target;
    setRequestObj({
      ...requestObj,
      documentType: value,
    });
    console.log(requestObj.documentType);
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

  const handleNextPage = () => {
    const serialPattern = 6;
    const digits =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let generatedSerial = '';
    for (let index = 0; index < serialPattern; index++) {
      let randomVal = Math.floor(Math.random() * digits.length);
      generatedSerial += digits[randomVal];
    }
    console.log(user);
    setRequestObj({
      ...requestObj,
      date: moment().format('DD-MM-YYYY'),
      time: moment().format('hh-mm-ss A'),
      serialCode: generatedSerial,
      email: user.email,
      uid: user.uid,
      documentStatus: STATUS_TYPES.PENDING,
    });

    setIsFirstPage(false);
  };

  const documentValidator = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      // TODO Disable submit button
      setIsDisabled(true);
    }
  };

  const uploadImage = async (evt) => {
    evt.preventDefault();
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(requestObj);
    addRequest(requestObj);
  };

  if (isLoading) {
    return (
      <>
        <DotLoader />
      </>
    );
  }
  return (
    <>
      <form
        className='grid grid-cols-3 border-2 rounded-sm p-4'
        onSubmit={handleSubmit}
      >
        {isFirstPage ? (
          <>
            <div className='col-span-3 grid grid-cols-2 gap-4 items-center '>
              <span className='col-span-2 text-center'>
                Pangalan ng nasa dokumento
              </span>
              <InputTextField
                className='col-span-1 '
                type='text'
                name='firstName'
                isRequired={trutyVal}
                placeholder='E.g. Juan'
                label='First Name (Pangalan)'
                value={requestObj.firstName}
                getValue={(e) => handleInput(e)}
              />
              <InputTextField
                className='col-span-1'
                type='text'
                name='lastName'
                isRequired={trutyVal}
                placeholder='E.g. Cruz'
                label='Last Name (Apellido)'
                value={requestObj.lastName}
                getValue={(e) => handleInput(e)}
              />
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
                    <span className='text-orange-600'>Payment required!</span>
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
                  <input
                    type='file'
                    name='screenShot'
                    accept='.jpg, .jpeg, .bmp, .png'
                    onChange={handleImage}
                  />
                  <Button onClick={uploadImage}>Upload Image</Button>
                  <h3>Please send 50Php</h3>
                </div>
              ) : null}
            </div>
          </>
        )}

        {isFirstPage && (
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
        )}
        {!isFirstPage && (
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
              disabled={isDisabled}
              className='col-span-1 disabled:bg-gray-500'
              type='submit'
            >
              Submit Request
            </Button>
          </>
        )}
      </form>
    </>
  );
}

export default RequestForm;
