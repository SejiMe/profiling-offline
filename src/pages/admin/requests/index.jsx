import AdminLayout from '@/components/layouts/AdminLayout';
import Container from '@/components/layouts/Container';
import RequestView from '@/components/requests/RequestView';
import ResidentForm from '@/components/residents/ResidentForm';
import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';

const requests = () => {
  return (
    <AdminLayout>
      <Container type={types.ADMIN} className='px-6 py-5'>
        <div className='container h-full w-full bg-slate-100 p-2 overflow-auto border rounded-lg shadow-md'>
          <RequestView />
        </div>
      </Container>
    </AdminLayout>
  );
};

export default requests;
