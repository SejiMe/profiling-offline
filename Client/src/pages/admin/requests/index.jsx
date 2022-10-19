import AdminLayout from '@/components/layouts/AdminLayout';
import RequestView from '@/components/requests/RequestView';
import ResidentForm from '@/components/residents/ResidentForm';
import React from 'react';

const requests = () => {
  return (
    <AdminLayout>
      <div className='container p-16 bg-slate-50 border rounded-lg shadow-md'>
        This is request
        <RequestView />
      </div>
    </AdminLayout>
  );
};

export default requests;
