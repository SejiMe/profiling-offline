import IconInfo from '@/components/svg/icons8-info-52.svg';
import { useGetRequests } from '@/hooks/getRequests';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import InputTextField from '../Fields/InputTextField';

export default function RequestView() {
  const { data, fetchNextPage, isFetching, isFetched, hasNextPage } =
    useGetRequests();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchData, setSearchData] = useState('');
  const [nextButton, setNextButton] = useState(false);
  const [forwardButton, setForwardButton] = useState(false);
  const [backButton, setBackButton] = useState(true);
  const [backwardButton, setBackwardButton] = useState(true);
  let pages = [];
  let mergedData = [];
  if (isFetching) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  if (hasNextPage) {
    fetchNextPage();
  }
  if (isFetched) {
    const page = data?.pages.map((page) => {
      const documents = page?.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.date = moment(data.createdAt.seconds * 1000).format('MM/DD/YYYY');
        return data;
      });
      if (!documents.length) return;
      return documents;
    });
    pages = page;
  }
  console.log('merged data: ' + mergedData);
  if (!hasNextPage) {
    pages.forEach((pageArr) => {
      mergedData = mergedData.concat(pageArr);
    });
    console.log(mergedData);
  }
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage === pages.length - 3) {
      console.log('triggered');
      setNextButton(true);
    } else {
      setBackButton(false);

      if (currentPage > pages.length - 5) {
        setForwardButton(true);
        setBackwardButton(false);
      }
    }
  };
  console.log(pages);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
    if (currentPage === pages.length - pages.length + 1) {
      setBackButton(true);
    } else if (currentPage > pages.length - pages.length + 1) {
      setNextButton(false);

      if (currentPage > pages.length - pages.length + 2) {
        setForwardButton(false);
      } else if (currentPage > pages.length - pages.length + 2) {
        setBackwardButton(true);
      }
    }
  };

  const handleForwardPage = () => {
    setCurrentPage(pages.length - 2);
    setForwardButton(true);
    setNextButton(true);
    setBackwardButton(false);
    setBackButton(false);
  };
  const handleBackwardPage = () => {
    setCurrentPage(pages.length - pages.length);
    setForwardButton(false);
    setNextButton(false);
    setBackButton(true);
    setBackwardButton(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearchData(value);
    const result = mergedData.filter((info) => console.log(info));
  };

  return (
    <div>
      <div className='flex'>
        <div>
          <InputTextField
            type={'search'}
            name={'searchData'}
            onChange={handleInput}
            label={'Search'}
          />
        </div>
        <Button
          type='button'
          disabled={backwardButton}
          onClick={handleBackwardPage}
          className='bg-transparent disabled:text-gray-300'
        >
          {'<<'}
        </Button>
        <Button
          type='button'
          disabled={backButton}
          onClick={handlePrevPage}
          className='bg-transparent disabled:text-gray-300'
        >
          {'<'}
        </Button>
        <div className='flex flex-row'>
          <h4>{currentPage + 1}</h4>
          <span>out of</span>
          <h4>{pages.length - 1}</h4>
        </div>

        <Button
          type='button'
          disabled={nextButton}
          onClick={handleNextPage}
          className='bg-transparent disabled:text-gray-300'
        >
          {'>'}
        </Button>
        <Button
          type='button'
          disabled={forwardButton}
          onClick={handleForwardPage}
          className='bg-transparent disabled:text-gray-300'
        >
          {'>>'}
        </Button>
      </div>

      <table className='border-2 rounded-lg'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Serial Code</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment Method</th>
            <th>Document Type</th>
            <th>Document Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.at(currentPage)?.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.serialCode}</td>
                <td>{doc.firstName}</td>
                <td>{doc.lastName}</td>
                <td>{doc.date}</td>
                <td>{doc.paymentMethod}</td>
                <td>{doc.documentType}</td>
                <td>{doc.documentStatus}</td>
                <td className='flex'>
                  <Button type='button' className='bg-transparent'>
                    ✅
                  </Button>
                  <Button type='button' className='bg-transparent'>
                    ❌
                  </Button>
                  <Button type='button' className='bg-transparent'>
                    💥
                  </Button>
                  <Button type='button' className='bg-transparent'>
                    🖨️
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
