import Seo from '@/components/Seo';
import Container from '@/layouts/Container';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { useRouter } from 'next/router';
import app from '../config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
export default function login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { user, login } = useAuth();

  /**
   * When the user submits the form, prevent the default action, then try to log in with the email and
   * password provided, and if successful, redirect the user to the admin page, otherwise, render an
   * error page.
   */
  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await login(data.email, data.password);
      router.push('/admin');
    } catch (error) {
      //TODO
      //Render Error page/component
      console.log(error);
    }
  };

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
            onChange={(e) => {
              /* A way to update the state of the component. */
              setData({
                ...data,
                email: e.target.value,
              });
            }}
            required='required'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={(e) => {
              /* A way to update the state of the component. */
              setData({
                ...data,
                password: e.target.value,
              });
            }}
            required='required'
          />
          {/**TODO
           * setup forget password method
           */}
          <button type='submit' onClick={onSubmit}>
            Login
          </button>
        </form>
      </Container>
    </MainLayout>
  );
}
