import { useGetRequests } from '@/hooks/getRequests';
import React from 'react';

export default function RequestView() {
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useGetRequests();

  if (hasNextPage) {
    console.log(fetchNextPage);
    return <h1>there is next page</h1>;
  }
  return (
    <div>
      <table className='border-2 rounded-lg'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Serial Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Payment Method</th>
            <th>Document Type</th>
            <th>Document Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{/* <tr>Serial Code</tr> */}</tbody>
      </table>
    </div>
  );
}
