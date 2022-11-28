import IconInfo from '@/components/svg/icons8-info-52.svg';
import { useGetRequests } from '@/hooks/useRequestData';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import InputTextField from '../Fields/InputTextField';
import { MoonLoader, PulseLoader } from 'react-spinners';
import Td from '../Table/Td';
import Th from '../Table/Th';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import { Packer } from 'docx';
import DocumentCreate from '@/lib/DocumentCreator';
import { saveAs } from 'file-saver';
import Tr from '../Table/Tr';
import SVGApproval from '@/components/svg/icons8-submit-for-approval/icons8-submit-for-approval.svg';
import TableNavigator from '../Table/TableNavigator';

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
      console.log('documents:');
      console.log(documents);
      if (!documents.length) {
        return '*';
      } else {
        return documents;
      }
    });
    console.log('page:');
    console.log(page);
    pages = page;
  }

  console.log('pages');
  console.log(pages);
  if (!hasNextPage) {
    pages.forEach((pageArr) => {
      mergedData = mergedData.concat(pageArr);
    });
  }

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

  const handleFindRelevance = () => {};

  const handleSuccessPages = (doc, id, index) => {
    console.log('button handle change to succes');
    console.log(doc);
    console.log(id);
    console.log(index);
    pages.at(currentPage).at(index)['documentStatus'] = 'Success';
    console.log(pages.at(currentPage).at(index));
  };
  const handleDeclinePages = (doc, id, index) => {
    console.log('button handle change to succes');
    console.log(doc);
    console.log(id);
    console.log(index);
    pages.at(currentPage).at(index)['documentStatus'] = 'Decline';
    console.log(pages.at(currentPage).at(index));
  };

  const handleSuccessMerge = (doc, id, index) => {
    console.log('button handle change to succes');
    console.log(doc);
    console.log(id);
    console.log(index);
    mergedData.at(index)['documentStatus'] = 'Success';
    console.log(pages.at(currentPage).at(index));
  };

  const handleGenerateDoc = async () => {
    const doc = await DocumentCreate();
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'sample.docx');
    });
  };
  const handleValidateResident = (resident) => {
    console.log('inside validator');
    console.log(resident);
    const { firstName, lastName, birthdate } = resident;
  };

  console.log('request page');
  console.log(pages);
  // ---- Search handler
  const handleInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  return (
    <div className='w-full h-full p-4'>
      <div className='flex flex-row min-w-full justify-between'>
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
        <TableNavigator>
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
        <table className='w-full h-full border-2 rounded-lg'>
          <thead>
            <Tr className=''>
              <Th>Index</Th>
              <Th>Serial Code</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Payment Method</Th>
              <Th>Document Type</Th>
              <Th>Document Status</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>
          {searchInput.length > 0 ? (
            <tbody>
              {searchPage.map((doc, index) => {
                return (
                  <Tr key={doc.id} className='max-h-7'>
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
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() => handleValidateResident(doc)}
                      >
                        <SVGApproval />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={handleGenerateDoc}
                      >
                        🖨️
                      </Button>
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
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() => handleSuccessPages(doc, doc.id, index)}
                      >
                        ✅
                      </Button>
                      <Button type='button' className='bg-transparent'>
                        ❌
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() => handleValidateResident(doc)}
                      >
                        <SVGApproval />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={handleGenerateDoc}
                      >
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
