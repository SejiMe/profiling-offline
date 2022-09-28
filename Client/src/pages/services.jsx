import Checkbox from '@/components/Checkbox';
import Seo from '@/components/Seo';
import Container from '@/components/layouts/Container';
import MainLayout from '@/components/layouts/MainLayout';
import { VIEW_TYPES as types } from '@/constants/getTypes';
import React, { useState } from 'react';

export default function services() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState();

  //To get the value inside checkbox
  const getVal = () => {};

  return (
    <MainLayout>
      <Seo titleTemplate='Online Services' />
      <Container type={types.DEFAULT}>
        <form action='' className='flex flex-col border-2 p-2'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label htmlFor='phone'>Cellphone Number</label>
          <input type='tel' name='phone' placeholder='ex. 09xx-xxx-xxxx' />
          <label htmlFor='requestee'>
            Name of Requestee ( Pangalan ng may dokumento )
          </label>
          <input
            type='text'
            name='requestee'
            placeholder='e.g. Juan G. Dela Cruz'
            onChange={(e) => {
              setName(e.target.value);
            }}
            required='required'
          />
          <Checkbox name='cb-clearance' val='Barangay Clearance'>
            Barangay Clearance
          </Checkbox>
          <Checkbox name='cb-clearance' val='Barangay Clearance'>
            Register in Barangay
          </Checkbox>
          <div
            name='request'
            className='min-w-[80%] min-h-[40%] border rounded-md m-4 p-4'
          >
            <label htmlFor='request'>
              Hello {name} is requesting for the documents to be printed out
            </label>
          </div>
          <button type='submit'>Send Request</button>
        </form>
      </Container>
    </MainLayout>
  );
}
