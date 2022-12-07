import AdminLayout from '@/components/layouts/AdminLayout';
import ResidentView from '@/components/residents/ResidentView';
import Container from '@/components/layouts/Container';
import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';

const residents = () => {
  return (
    <AdminLayout>
      <div>
        <Container type={types.ADMIN} className='px-6 py-5'>
          <div className='container h-full w-full bg-slate-100 p-2 scrollbar-hide overflow-auto border rounded-lg shadow-md'>
            <ResidentView label='This should be dynamic labeling' />
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default residents;
