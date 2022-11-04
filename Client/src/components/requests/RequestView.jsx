import IconInfo from '@/components/svg/icons8-info-52.svg';
import { useGetRequests } from '@/hooks/getRequests';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import InputTextField from '../Fields/InputTextField';
import { MoonLoader, PulseLoader } from 'react-spinners';
import Td from '../Table/Td';
import Th from '../Table/Th';
import Modal from '../Modal/Modal';
import Image from 'next/image';

export default function RequestView() {
  const { data, fetchNextPage, isFetching, isFetched, hasNextPage } =
    useGetRequests();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [nextButton, setNextButton] = useState(false);
  const [forwardButton, setForwardButton] = useState(false);
  const [backButton, setBackButton] = useState(true);
  const [backwardButton, setBackwardButton] = useState(true);
  const [searchPages, setSearchPages] = useState([{}]);
  const [showImage, setShowImage] = useState(false);
  const [ssURL, setSSURL] = useState();
  let pages = [];
  let mergedData = [];

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
      if (!documents.length) {
        return '*';
      } else {
        return documents;
      }
    });
    pages = page;
  }
  if (!hasNextPage) {
    pages.forEach((pageArr) => {
      mergedData = mergedData.concat(pageArr);
    });
  }

  const searchPage = useMemo(() => {
    console.log('inside memo');
    console.log(searchInput);
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
      console.log('inside filter');
      console.log(info);
    });
    console.log('inside memo result:');
    console.log(result);
    return result;
  }, [searchInput, pages]);

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

  const ss = useMemo(() => {
    return ssURL;
  }, [ssURL]);
  //Link handlers
  const handleViewPayment = (e) => {
    const { value } = e.target;
    setShowImage(true);
    setSSURL(value);
  };

  // ----- button handlers ---------

  const closeImage = () => {
    setShowImage(false);
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
    const { name, value } = e.target;
    setSearchInput(value);
  };
  return (
    <div className='w-full h-full p-4'>
      <div className='flex'>
        <Modal show={showImage} onClose={closeImage}>
          <Image
            src={ss}
            width={400}
            height={600}
            objectFit='contain'
            objectPosition='top'
          />
        </Modal>
        <div>
          <InputTextField
            type={'search'}
            name={'searchData'}
            onChange={handleInput}
            label={'Search'}
          />
        </div>
        {searchInput.length === 0 ? (
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
            <div className='flex flex-row'>
              <h4>{currentPage + 1}</h4>
              <span>out of</span>
              {!isFetching ? (
                <h4>{pages.length - 1}</h4>
              ) : (
                <h3>{currentPage + 1}</h3>
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
      </div>
      <div className='overflow-auto h-full w-full'>
        <table className='w-full h-full border-2 rounded-lg'>
          <thead>
            <tr className=''>
              <Th>Index</Th>
              <Th>Serial Code</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Payment Method</Th>
              <Th>Document Type</Th>
              <Th>Document Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          {searchInput.length > 0 ? (
            <tbody>
              {searchPage.map((doc, index) => {
                return (
                  <tr key={doc.id} className='max-h-7'>
                    <Td className=''>{index + 1}</Td>
                    <Td className=''>{doc.serialCode}</Td>
                    <Td className=''>{doc.firstName}</Td>
                    <Td className=''>{doc.lastName}</Td>
                    <Td className=''>{doc.date}</Td>
                    <Td className=''>
                      {doc.paymentMethod === 'GCash' ? (
                        <Button
                          value={doc.screenShotUrl}
                          onClick={(e) => handleViewPayment(e)}
                          className='bg-transparent'
                        >
                          {doc.paymentMethod}
                        </Button>
                      ) : (
                        doc.paymentMethod
                      )}
                    </Td>
                    <Td className=''>{doc.documentType}</Td>
                    <Td className=''>{doc.documentStatus}</Td>
                    <Td className='flex justify-center items-center align-middle'>
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
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          ) : isFetching && pages.length === pages.length - pages.length ? (
            <tbody>
              <tr>
                <td>
                  <PulseLoader />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {pages.at(currentPage)?.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <Td className=''>{index + 1}</Td>
                    <Td className=''>{doc.serialCode}</Td>
                    <Td className=''>{doc.firstName}</Td>
                    <Td className=''>{doc.lastName}</Td>
                    <Td className=''>{doc.date}</Td>
                    <Td className=''>
                      {doc.paymentMethod === 'GCash' ? (
                        <Button
                          value={doc.screenShotUrl}
                          onClick={(e) => handleViewPayment(e)}
                          className='bg-transparent'
                        >
                          {doc.paymentMethod}
                        </Button>
                      ) : (
                        doc.paymentMethod
                      )}
                    </Td>
                    <Td className=''>{doc.documentType}</Td>
                    <Td className=''>{doc.documentStatus}</Td>
                    <Td className='flex'>
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
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
