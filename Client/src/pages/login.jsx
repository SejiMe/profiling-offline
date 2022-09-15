import Seo from '@/components/Seo';
import Container from '@/layouts/Container';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { useRouter } from 'next/router';
import app from '../../firebaseConfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';

export default function login() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const auth = getAuth(app);
  const router = useRouter();

  const onSubmit = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
    .then(()=>{
      alert('login successfully');
      router.push('/admin')    
    })
    .catch((err)=>{
      console.error({err})
    })
  }

  return (
    <MainLayout>
      <Seo templateTitle='Official Login' />
      <Container>
        <form className='flex flex-col gap-4' method='POST'>
          <h1 className='text-black'>Login Barangay Caramutan</h1>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            placeholder='juandelacruz@gmail.com'
            onChange={(e)=> {setEmail(e.target.value)}}
            required='required'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={(e) => {setPass(e.target.value)}}
            required='required'
          />
          {/**TODO*/}
          <button type='submit' onClick={onSubmit}>Login</button>
        </form>
      </Container>
    </MainLayout>
  );
}
