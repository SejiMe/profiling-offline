import Seo from '@/components/Seo';
import Container from '@/layouts/Container';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';

export default function login() {
  return (
    <MainLayout>
      <Seo templateTitle='Official Login' />
      <Container>
        <section>This is the Login Page TODO make login forms</section>
      </Container>
    </MainLayout>
  );
}
