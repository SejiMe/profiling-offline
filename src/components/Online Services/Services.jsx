import { auth } from '@/config/firebaseConfig';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import unsplashImg from '~/images/unsplashimg.jpg';
import Button from '../Button';
import Popup from '../Popup';
import RequestForm from '../requests/RequestForm';
import SVGSubmitRequest from '@/components/svg/icons8-submit-document/icons8-submit-document.svg';

const provider = new GoogleAuthProvider();

function Services() {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();

  const handleRequestPopup = () => {
    logout();
    setShowModal(false);
  };

  const handleRequestClick = async (evt) => {
    evt.preventDefault();
    sessionStorage.clear();
    if (user) {
      setShowModal(true);
    }
    if (!user) {
      await signInWithPopup(auth, provider);
      setShowModal(true);
    }
  };
  return (
    <div className=' text-black px-2 py-4 flex flex-col md:grid md:grid-cols-3'>
      <div className='md:col-span-2 mb-4'>
        <h1 className=''>Online Services</h1>
        <p>
          We offer the full spectrum of services to help organisations work
          better. Everything from creating standards of excellence to training
          your people to work in more effective ways, assessing how you’re
          doing, and helping you perform even better in future. Very few others
          do this, and none have been doing it as long as we have. We can
          combine any of our products and services to create a package that’s
          tailored to your business. This removes the complexity and unnecessary
          cost of getting you where you want to be – whatever your starting
          point.
        </p>
      </div>
      <Image src={unsplashImg} />
      <div>
        <h4>Barangay Residency</h4>
        <p>
          File management can be a pain. We make it easy by letting you work
          with files in one place. File management can be a pain. We make it
          easy by letting you work with files in one place.
        </p>
      </div>
      <div>
        <h4>Barangay Residency</h4>
        <p>
          You can have an amazing time at your next event with a little
          strategic planning. Here's everything you need to know about planning
          and executing an event that's just right for you.
        </p>
      </div>
      <div>
        <h4>And More...</h4>
        <p>
          Sports are enjoyable and fun, but they can also be very competitive.
          Here, we'll show you how to make sports fun and enjoyable for
          everyone. Here are the best sports to keep your teen engaged.
        </p>
      </div>
      <div></div>
      <div>
        <Button
          type='button'
          className='flex justify-center items-center rounded text-white fill-white bg-green-500 p-3 w-full font-medium text-base'
          onClick={handleRequestClick}
        >
          <SVGSubmitRequest className='fill-white w-4 h-4 mr-4' /> Request
          Document
        </Button>
      </div>
      {/* TODO able to close popup when submit request  */}
      <Popup
        title='Request Document'
        openPopup={showModal}
        setClose={handleRequestPopup}
      >
        <RequestForm />
      </Popup>
      {/* <Modal show={showModal} onClose={handleRequestPopup}>
          <RequestForm />
        </Modal> */}
      <div></div>
    </div>
  );
}

export default Services;
