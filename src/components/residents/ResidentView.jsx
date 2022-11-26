import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button';
import DotLoader from 'react-spinners/DotLoader';
import AddResident from './AddResident';
import Tr from '../Table/Tr';
import Th from '../Table/Th';
import Td from '../Table/Td';
import { useGetResidents } from '@/hooks/getResidents';
import TableNavigator from '../Table/TableNavigator';
import Link from 'next/link';
import moment from 'moment';
import Modal from '../Modal/Modal';

function ResidentView() {
  const { data, fetchNextPage, isLoading, isFetching, isFetched, hasNextPage } =
    useGetResidents();
  const [searchInput, setSearchInput] = useState('');
  const [nextButton, setNextButton] = useState(false);
  const [forwardButton, setForwardButton] = useState(false);
  const [backButton, setBackButton] = useState(true);
  const [backwardButton, setBackwardButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  let pages = [];
  let mergedData = [];

  const searchPage = useMemo(() => {
    const result = mergedData.filter((info) => {
      if (info === '*') {
        return;
      } else {
        if (info.serialCode === '') {
          return;
        } else {
          if (
            info.serialCode.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return info;
          }
        }
      }
    });
    return result;
  }, [searchInput, pages]);

  if (isLoading)
    return (
      <>
        <DotLoader />
      </>
    );

  if (hasNextPage) {
    fetchNextPage();
  }

  if (!hasNextPage) {
    pages.forEach((pageArr) => {
      mergedData = mergedData.concat(pageArr);
    });
  }

  console.log('from query:');
  //console.log(data);
  if (isFetched) {
    const page = data?.pages.map((page) => {
      console.log('from data:');
      //console.log(page);
      const documents = page?.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        //console.log(data.dob);
        const age = moment(data.dob).fromNow(true);
        //console.log(age);
        return data;
      });
      console.log('documents:');
      //console.log(documents);
      if (!documents.length) {
        return '*';
      } else {
        return documents;
      }
    });
    console.log('page:');
    //console.log(page);
    pages = page;
  }
  console.log('pages:');
  //console.log(pages);

  // ------ Button Handlers ---------

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

  // ---- Search handler
  const handleInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex justify-between'>
        <div>
          <input
            className='col-span-2'
            type='text'
            placeholder='Search Resident Name'
          />
          <Button className='col-span-1' onClick={() => setOpenPopup(true)}>
            Add Resident
          </Button>
          <Modal
            show={openPopup}
            onClose={() => {
              setOpenPopup(false);
            }}
            stylesBody='overflow-auto scrollbar-hide flex flex col'
          >
            <AddResident />
          </Modal>
          {/* <Popup
            title='Add Resident Form'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <AddResident />
          </Popup> */}
        </div>
        <TableNavigator>
          <>
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
            <div className='flex flex-row items-center'>
              <h4>{currentPage + 1}</h4>
              <span>out of</span>
              {!isFetching ? (
                <h4>{pages.length - 1}</h4>
              ) : (
                <h4>{currentPage + 1}</h4>
              )}
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
            </Button>{' '}
          </>
        </TableNavigator>
      </div>
      <div className='col-span-4'>
        <table>
          <thead>
            <Tr>
              <Th>Index</Th>
              <Th>First Name</Th>
              <Th>Middle Name</Th>
              <Th>Last Name</Th>
              <Th>Resident Information</Th>
            </Tr>
          </thead>
          <tbody>
            {pages?.at(currentPage)?.map((doc, index) => {
              return (
                <Tr>
                  <Td className=''>{index + 1}</Td>
                  <Td className=''>{doc.firstName}</Td>
                  <Td className=''>{doc.middleName}</Td>
                  <Td className=''>{doc.lastName}</Td>
                  <Td className=''>
                    <Link href={`residents/${doc.id}`}>View Information</Link>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResidentView;
