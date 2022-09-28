import AdminLayout from '@/components/layouts/AdminLayout';
import ResidentView from '@/components/residents/ResidentView';
import Container from '@/components/layouts/Container';
import React from 'react';
import { VIEW_TYPES as types} from '@/constants/getTypes';
import AddResidentForm from '@/components/residents/AddResidentForm';

const residents = () => {
  return (
    <AdminLayout>
      <div>
        <Container type={types.RESIDENT}>
          
          <ResidentView label='This should be dynamic labeling'/>
          <AddResidentForm/>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default residents;

function ResidentHeader () {
  return(
    <div>

    </div>
  )
}