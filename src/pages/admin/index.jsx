import Admin from '@/components/Admin';
import AdminLayout from '@/components/layouts/AdminLayout';
import Container from '@/components/layouts/Container';
import { db } from '@/config/firebaseConfig';
import { collection, getCountFromServer } from 'firebase/firestore';
import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';
export default function admin() {
  return (
    <AdminLayout>
      <Container type={types.ADMIN} className='px-6 py-5'>
        <div className='container h-full w-full bg-slate-100 p-2 overflow-auto border rounded-lg shadow-md'>
          <Admin />
        </div>
      </Container>
    </AdminLayout>
  );
}
