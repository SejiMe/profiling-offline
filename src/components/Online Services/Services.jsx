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
import { useMedia } from 'react-use';
import { Link as ScrollLink } from 'react-scroll';

const provider = new GoogleAuthProvider();

function Services() {
  const isSmall = useMedia('(max-width: 580px)');
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
    <div className=' text-black px-2 py-4 flex flex-col md:grid md:grid-cols-3 md:gap-4'>
      <h1 className='md:mb-10 text-center md:col-span-3'>Online Services</h1>
      <div className='md:col-span-2 mb-4'>
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

      <Image src={unsplashImg} layout='responsive' />

      <div>
        <h4>Document Requesting</h4>
        <p>
          Resident of Caramutan, At a party? At Work? Stay at home? No. Problem
          you can request a document wherever you are! Don't waste your time on
          queueing just show us your serial code for validation.
        </p>
      </div>
      <div>
        <h4>Documents</h4>
        <p>
          What you can request? Barangay Indigency, Barangay Residency, Barangay
          Clearance & Business Permit. you can pick up your requested document
          at our Barangay, be sure to update your barangay residency
          information.
        </p>
      </div>
      <div>
        <ScrollLink
          activeClass='active'
          to='contact'
          smooth={true}
          duration={1000}
        >
          <h4>And More...</h4>
        </ScrollLink>
        <p>
          Interact with us, share your experience with us, and leave us a review
          to improve the system. Thank you.
        </p>
      </div>
      <div></div>
      <div className='mt-4'>
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
      <div></div>
    </div>
  );
}

export default Services;
