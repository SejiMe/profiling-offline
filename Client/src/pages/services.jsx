import Checkbox from '@/components/Checkbox';
import Seo from '@/components/Seo';
import Container from '@/components/layouts/Container';
import MainLayout from '@/components/layouts/MainLayout';
import { VIEW_TYPES as types } from '@/constants/getTypes';
import React, { useState } from 'react';
import RequestForm from '@/components/requests/RequestForm';

export default function services() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState();

  //To get the value inside checkbox
  const getVal = () => {};

  return (
    <MainLayout>
      <Seo titleTemplate='Online Services' />
      <Container type={types.DEFAULT}>
        <RequestForm />
      </Container>
    </MainLayout>
  );
}
