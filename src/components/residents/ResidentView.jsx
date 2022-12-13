import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button';
import DotLoader from 'react-spinners/DotLoader';
import AddResident from './AddResident';
import Tr from '../Table/Tr';
import Th from '../Table/Th';
import Td from '../Table/Td';
import { useGetResidents } from '@/hooks/useResidentData';
import TableNavigator from '../Table/TableNavigator';
import Link from 'next/link';
import moment from 'moment';
import Modal from '../Modal/Modal';
import InputTextField from '../Fields/InputTextField';
import Thead from '../Table/Thead';
import { useMedia } from 'react-use';

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

  const isXSmall = useMedia('(max-width: 700px)');
  const isSmall = useMedia('(max-width: 850px)');
  const isMedium = useMedia('(max-width: 920px)');

  let pages = [];
  let mergedData = [];

  if (hasNextPage) {
    fetchNextPage();
  }

  if (isFetched) {
    const thePage = data?.pages.map((page) => {
      //console.log(page);
      const documents = page?.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        //console.log(data.dob);
        //console.log(age);
        return data;
      });
      // console.log(documents);
      if (!documents.length) {
        return '*';
      } else {
        return documents;
      }
    });
    pages = thePage;
  }

  if (!hasNextPage) {
    // console.log('pages');
    // console.log(pages);
    pages.forEach((pageArr) => {
      mergedData = mergedData.concat(pageArr);
    });
  }

  const searchPage = useMemo(() => {
    // console.log(mergedData);
    const result = mergedData.filter((info) => {
      if (info === '*') {
        return;
      } else {
        if (info.lastName === '') {
          return;
        } else {
          if (info.lastName.toLowerCase().includes(searchInput.toLowerCase())) {
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
      setBackwardButton(true);
      setBackButton(true);
    } else if (currentPage === 1) {
      setBackwardButton(false);
    } else if (currentPage > pages.length - pages.length + 1) {
      setNextButton(false);
      setBackwardButton(false);
      if (currentPage > pages.length - pages.length + 2) {
        setForwardButton(false);
        console.log(pages.length - pages.length + 2);
      } else if (currentPage > pages.length - pages.length + 2) {
        setBackwardButton(true);
      }
    }
    console.log(currentPage);
    console.log(pages.length + 2);
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
    <div className='h-full w-full p-4'>
      <div className='flex justify-between mb-2'>
        <div className='flex gap-2'>
          <div className=''>
            <InputTextField
              className='col-span-2'
              type='search'
              name={'searchData'}
              onChange={handleInput}
              label={'Search Resident'}
              placeholder='Resident Last Name'
            />
          </div>
          <div className='flex flex-col-reverse'>
            <Button className='' onClick={() => setOpenPopup(true)}>
              Add Resident
            </Button>
          </div>
          <Modal
            show={openPopup}
            onClose={() => {
              setOpenPopup(false);
            }}
            stylesBody={`${
              isSmall ? 'h-screen w-screen' : 'p-5'
            } overflow-auto scrollbar-hide bg-white  rounded-md shadow-lg`}
          >
            <AddResident />
          </Modal>
        </div>
        <TableNavigator>
          {searchInput.length === 0 ? (
            <>
              <Button
                type='button'
                disabled={backwardButton}
                onClick={handleBackwardPage}
                className={`bg-transparent disabled:text-gray-300`}
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
          ) : null}
        </TableNavigator>
      </div>
      <div className='overflow-auto h-full w-full'>
        <table className='w-full px-2 border-2 border-l-0 border-r-0 rounded-md p-4 shadow-md '>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Middle Name</Th>
              <Th>Last Name</Th>
              <Th>Vaccination</Th>
              <Th>Resident Information</Th>
            </Tr>
          </Thead>
          {searchInput.length > 0 ? (
            <tbody>
              {searchPage.map((doc, index) => {
                let color = '';
                if (
                  (doc.health.Vaccine1Date === '' &&
                    doc.health.Vaccine1Type === '') ||
                  (doc.health.Vaccine2Date === '' &&
                    doc.health.Vaccine2Type === '')
                ) {
                  color = 'text-red-600 bg-orange-200';
                } else if (
                  (doc.health.Vaccine1Date !== '' &&
                    doc.health.Vaccine1Type !== '') ||
                  (doc.health.Vaccine2Date !== '' &&
                    doc.health.Vaccine2Type !== '')
                ) {
                  color = 'text-green-800 bg-green-200';
                }
                return (
                  <Tr key={doc.id}>
                    <Td className=''>{doc.firstName}</Td>
                    <Td className=''>{doc.middleName}</Td>
                    <Td className=''>{doc.lastName}</Td>
                    <Td className=''>
                      <span className={`${color} p-1 rounded shadow-md border`}>
                        {doc.health.Vaccine1Date === '' &&
                        doc.health.Vaccine1Type === ''
                          ? 'Unvaccinated'
                          : 'Vaccinated'}
                      </span>
                    </Td>
                    <Td className=''>
                      <Link href={`residents/${doc.id}`}>
                        <a className='text-blue-400 underline'>
                          View Information
                        </a>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          ) : isFetching && pages.length === pages.length - pages.length ? (
            <tbody>
              <Tr>
                <td>
                  <PulseLoader />
                </td>
              </Tr>
            </tbody>
          ) : (
            <tbody>
              {pages?.at(currentPage)?.map((doc, index) => {
                let color = '';
                if (
                  (doc.health.Vaccine1Date === '' &&
                    doc.health.Vaccine1Type === '') ||
                  (doc.health.Vaccine2Date === '' &&
                    doc.health.Vaccine2Type === '')
                ) {
                  color = 'text-red-600 bg-orange-200';
                } else if (
                  (doc.health.Vaccine1Date !== '' &&
                    doc.health.Vaccine1Type !== '') ||
                  (doc.health.Vaccine2Date !== '' &&
                    doc.health.Vaccine2Type !== '')
                ) {
                  color = 'text-green-800 bg-green-200';
                }
                return (
                  <Tr key={doc.id}>
                    <Td className=''>{doc.firstName}</Td>
                    <Td className=''>{doc.middleName}</Td>
                    <Td className=''>{doc.lastName}</Td>
                    <Td className=''>
                      <span className={`${color} p-1 rounded shadow-md border`}>
                        {doc.health.Vaccine1Date === '' &&
                        doc.health.Vaccine1Type === ''
                          ? 'Unvaccinated'
                          : 'Vaccinated'}
                      </span>
                    </Td>
                    <Td className=''>
                      <Link href={`residents/${doc.id}`}>
                        <a href='' className='text-blue-400 underline'>
                          View Information
                        </a>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default ResidentView;
