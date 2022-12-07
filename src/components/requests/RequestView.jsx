import IconInfo from '@/components/svg/icons8-info-52.svg';
import { useGetRequests, useUpdateRequests } from '@/hooks/useRequestData';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import Button from '../Button';
import InputTextField from '../Fields/InputTextField';
import { MoonLoader, PulseLoader } from 'react-spinners';
import Td from '../Table/Td';
import Th from '../Table/Th';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import Tr from '../Table/Tr';
import SVGApproval from '@/components/svg/icons8-submit-for-approval/icons8-submit-for-approval.svg';
import TableNavigator from '../Table/TableNavigator';
import SVGCheck from '@/components/svg/icons8-checkmark/icons8-checkmark.svg';
import SVGDecline from '@/components/svg/icons8-macos-close/icons8-macos-close.svg';
import { useGetResemblance } from '@/hooks/useResemblance';
import Thead from '../Table/Thead';
import { BarangayClearance, BarangayResidency } from '@/lib/DocumentCreator';
import { getAge } from '@/hooks/getAge';
import clsx from 'clsx';
import { useGetOfficials } from '@/hooks/useOfficialData';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useRouter } from 'next/router';
import Tippy from '@tippyjs/react';
import TippyTooltip from '../TippyTooltip';

export default function RequestView() {
  const { data, fetchNextPage, isFetching, isFetched, hasNextPage } =
    useGetRequests();

  const { data: officialsData } = useGetOfficials();

  const { mutate: updateStatus } = useUpdateRequests();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [nextButton, setNextButton] = useState(false);
  const [forwardButton, setForwardButton] = useState(false);
  const [backButton, setBackButton] = useState(true);
  const [backwardButton, setBackwardButton] = useState(true);
  // const [searchPages, setSearchPages] = useState([{}]);
  const [showImage, setShowImage] = useState(false);
  const [ssURL, setSSURL] = useState();
  const [index, setIndex] = useState();
  const [docToUpdate, setDocToUpdate] = useState();
  const [docID, setDocID] = useState();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isDecline, setIsDecline] = useState(false);
  const [reason, setReason] = useState('');
  const [disableDeclineBtn, setDisbaleDeclineBtn] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [validateFirstName, setValidateFN] = useState('');
  const [validateLastName, setValidateLN] = useState('');
  const [validateAge, setValidateAge] = useState();
  const [resemblanceData, setResemblanceData] = useState([]);
  const [validateDocType, setValidateDocType] = useState('');
  const router = useRouter();

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
      // console.log(documents);
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

  const statusUpdateProcessor = useMemo(() => {
    return { index, docToUpdate, docID };
  }, [index, docToUpdate, docID]);

  const ss = useMemo(() => {
    return ssURL;
  }, [ssURL]);

  const reasonOfDecline = useMemo(() => {
    return reason;
  }, [reason]);

  const isDisable = useMemo(() => {
    return disableDeclineBtn;
  }, [disableDeclineBtn]);

  //Link handlers
  const handleViewPayment = (e) => {
    const { value } = e.target;
    setShowImage(true);
    setSSURL(value);
  };

  // Input Handlers
  const handleChangeReason = (evt) => {
    const { name, value } = evt.target;
    if (value !== '') {
      setReason(value);
      setDisbaleDeclineBtn(false);
    }
  };

  // ----- button handlers ---------

  const closeImage = () => {
    setShowImage(false);
  };

  const closeConfirmation = () => {
    setIsConfirm(false);
  };
  const closeDecline = () => {
    setIsDecline(false);
    setReason('');
    setDisbaleDeclineBtn(true);
  };

  const closeValidation = () => {
    setIsValidating(false);
  };

  const handleSuccessStatus = (document, id) => {
    updateStatus({ requestDoc: document, requestID: id });
    setTimeout(() => {
      setIsConfirm(false);
    }, 600);
  };

  const handleDeclineStatus = (document, id) => {
    const addDecline = document;
    addDecline.reason = reasonOfDecline;
    updateStatus({ requestDoc: addDecline, requestID: id });
    setTimeout(() => {
      setIsDecline(false);
      setReason('');
    }, 600);
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

  const handleSuccessPages = (id, index) => {
    pages.at(currentPage).at(index)['documentStatus'] = 'Success';
    const document = pages.at(currentPage).at(index);
    console.log(document);
    setDocToUpdate(document);
    setDocID(id);
    setIsConfirm(true);
  };

  const handleDeclinePages = (id, index) => {
    pages.at(currentPage).at(index)['documentStatus'] = 'Decline';
    const document = pages.at(currentPage).at(index);
    setDocToUpdate(document);
    setDocID(id);
    setIsDecline(true);
  };

  const handleSearchPageSuccess = (id, index) => {
    searchPage.at(index)['documentStatus'] = 'Success';
    const document = searchPage.at(index);
    console.log('searchPages');
    console.table(searchPage);
    setDocToUpdate(document);
    setDocID(id);
    setIsConfirm(true);
  };
  const handleSearchPageDecline = (id, index) => {
    searchPage.at(index)['documentStatus'] = 'Decline';
    const document = searchPage.at(index);
    setDocToUpdate(document);
    setDocID(id);
    setIsDecline(true);
  };

  const handleFindRelevance = async (
    firstName,
    lastName,
    age,
    documentType
  ) => {
    setValidateFN(firstName);
    setValidateLN(lastName);
    setIsValidating(true);
    setValidateAge(age);
    setValidateDocType(documentType);

    const reference = collection(db, 'residents');
    const query1 = query(
      reference,
      where('firstName', '==', firstName),
      where('lastName', '==', lastName)
    );
    const resemblance = await getDocs(query1);
    const docs = resemblance.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      data.age = getAge(data.birthdate);
      return data;
    });
    setResemblanceData(docs);
  };

  const handleGenerateDoc = async (
    documentType,
    firstName,
    lastName,
    middleName = '',
    age,
    status,
    Capt
  ) => {
    console.log(documentType);
    let doc;
    const date = new Date();
    const yearNow = date.getFullYear();
    switch (documentType) {
      case 'Barangay Clearance':
        doc = await BarangayClearance(
          firstName,
          lastName,
          middleName,
          age,
          status,
          Capt,
          yearNow
        );
        break;
      case 'Barangay Residency':
        doc = await BarangayResidency(
          firstName,
          lastName,
          middleName,
          age,
          status,
          Capt,
          yearNow
        );
        break;

      default:
        break;
    }
    await Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'sample.docx');
    });
  };
  const handleValidateResident = (resident) => {
    setLookingFor(resident);
    setIsValidating(true);
  };

  // ---- Search handler
  const handleInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  return (
    <div className='w-full h-full p-4'>
      <div className='flex flex-row min-w-full justify-between mb-2'>
        <Modal show={showImage} onClose={closeImage} stylesBody='overflow-auto'>
          <Image
            src={ss}
            width={400}
            height={600}
            objectFit='contain'
            objectPosition='top'
          />
        </Modal>
        <Modal
          show={isConfirm}
          onClose={closeConfirmation}
          stylesBody='rounded-md bg-green-500 flex flex-col justify-center'
        >
          <div className='p-5 rounded-lg flex flex-col justify-center text-center text-white gap-2'>
            <h3 className='mb-2'>Have you delivered the document?</h3>
            <Button
              type='button'
              className={'bg-green-50'}
              onClick={() =>
                handleSuccessStatus(
                  statusUpdateProcessor.docToUpdate,
                  statusUpdateProcessor.docID
                )
              }
            >
              Confirm
            </Button>
          </div>
        </Modal>
        <Modal
          show={isDecline}
          onClose={closeDecline}
          stylesBody='overflow-auto bg-green-500 rounded-md flex flex-col justify-center'
        >
          <div className='p-5 rounded-lg flex flex-col  gap-5 justify-center text-center'>
            <h3>
              Reason for <span className='text-red-600'>Decline?</span>
            </h3>
            <div>
              <label htmlFor='reason'></label>
              <select
                name='reason'
                className='rounded-md'
                value={reasonOfDecline}
                onChange={handleChangeReason}
              >
                <option value=''>Reason</option>
                <option value='Unpaid'>Unpaid</option>
                <option value='Unregistered'>Unregistered</option>
                <option value='Wrong Info'>Wrong Info</option>
              </select>
            </div>

            <Button
              type='button'
              className='disabled:bg-gray-500 bg-red-400'
              disabled={isDisable}
              onClick={() =>
                handleDeclineStatus(
                  statusUpdateProcessor.docToUpdate,
                  statusUpdateProcessor.docID
                )
              }
            >
              Decline
            </Button>
          </div>
        </Modal>
        <Modal
          stylesBody='rounded-md bg-green-500 flex flex-col justify-center'
          show={isValidating}
          onClose={closeValidation}
        >
          <div className='p-5 rounded-lg flex flex-col justify-center text-center text-white gap-2'>
            <div className='flex flex-col gap-2'>
              <h2 className=''>Validating Request</h2>
              <h3>
                {validateFirstName} {validateLastName} {validateAge} years old
              </h3>
              <h4>Document Requested: {validateDocType}</h4>
            </div>

            {resemblanceData.length > 0 ? <h4>Registered Residents</h4> : null}
            <ul className='py-2 mt-0'>
              {resemblanceData.length > 0 ? (
                resemblanceData?.map((doc) => {
                  return (
                    <li
                      key={doc.id}
                      className='bg-slate-100 shadow-md rounded-sm w-full flex px-2 gap-2 h-10 align-middle items-center'
                    >
                      <div className='flex'>
                        <h4>
                          {doc.firstName} {doc.middleName} {doc.lastName}{' '}
                          {doc.age} years old
                        </h4>
                      </div>
                      {validateDocType === 'Business Permit' ? (
                        <Button
                          type='button'
                          onClick={() => {
                            router.push(`residents/${doc.id}`);
                          }}
                        >
                          View Resident Information
                        </Button>
                      ) : (
                        <Button
                          className='bg-transparent'
                          type='button'
                          onClick={() =>
                            handleGenerateDoc(
                              validateDocType,
                              doc.firstName,
                              doc.lastName,
                              doc.middleName,
                              doc.age,
                              doc.civ_status,
                              officialsData.Captain
                            )
                          }
                        >
                          Print
                        </Button>
                      )}
                    </li>
                  );
                })
              ) : (
                <h1 className='flex text-red-400 justify-center align-middle items-center'>
                  Search Results None
                </h1>
              )}
            </ul>
          </div>
        </Modal>
        <div>
          <InputTextField
            type={'search'}
            name={'searchData'}
            onChange={handleInput}
            label={'Search Request'}
            placeholder='Serial Code'
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
        <table className='scrollbar-hide w-full px-2 border-2 border-l-0 border-r-0 rounded-md p-4 shadow-md '>
          <Thead>
            <Tr className=''>
              <Th>Serial Code</Th>
              <Th>Name</Th>
              <Th>Mobile Number</Th>
              <Th>Payment Method</Th>
              <Th>Date</Th>
              <Th>Document Type</Th>
              <Th>Document Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {searchInput.length > 0 ? (
            <tbody>
              {searchPage.map((doc, index) => {
                let color = '';
                if (doc.documentStatus === 'Pending') {
                  color = 'text-orange-600 bg-orange-200';
                } else if (doc.documentStatus === 'Success') {
                  color = 'text-green-800 bg-green-200';
                } else {
                  color = 'text-red-600 bg-red-200';
                }
                return (
                  <Tr key={doc.id} className='max-h-7'>
                    <Td className=''>{doc.serialCode}</Td>
                    <Td className=''>
                      {doc.firstName} {doc.lastName}
                    </Td>
                    <Td>{!doc.contactNumber ? 'None' : doc.contactNumber}</Td>
                    <Td className=''>
                      {doc.paymentMethod === 'GCash' ? (
                        <span className='p-1.5 bg-gray-100'>
                          <Button
                            value={doc.screenShotUrl}
                            onClick={(e) => handleViewPayment(e)}
                            className='bg-transparent text-blue-600'
                          >
                            {doc.paymentMethod}
                          </Button>
                        </span>
                      ) : (
                        doc.paymentMethod
                      )}
                    </Td>
                    <Td className=''>{doc.date}</Td>
                    <Td className=''>{doc.documentType}</Td>
                    <Td
                      className={`${
                        doc.documentStatus === 'Decline'
                          ? 'hover:cursor-pointer'
                          : null
                      }`}
                    >
                      {doc.documentStatus === 'Decline' ? (
                        <TippyTooltip
                          className={'bg-red-400'}
                          content={doc.reason}
                        >
                          <span
                            className={`p-1.5 rounded-lg text-xs uppercase ${color}`}
                          >
                            {doc.documentStatus}
                          </span>
                        </TippyTooltip>
                      ) : (
                        <span
                          className={`p-1.5 rounded-lg text-xs uppercase ${color}`}
                        >
                          {doc.documentStatus}
                        </span>
                      )}
                    </Td>
                    <ActionTd>
                      <Button
                        type='button'
                        disabled={doc.documentStatus === 'Success'}
                        className='group bg-transparent'
                        onClick={() => {
                          handleSearchPageSuccess(doc.id, index);
                        }}
                      >
                        <SVGCheck className='group-disabled:fill-gray-600 h-4 w-4 fill-green-300' />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() => {
                          handleSearchPageDecline(doc.id, index);
                        }}
                      >
                        <SVGDecline className='h-5 w-5 fill-red-600' />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() =>
                          handleFindRelevance(
                            doc.firstName,
                            doc.lastName,
                            getAge(doc.birthdate),
                            doc.documentType
                          )
                        }
                      >
                        <SVGApproval />
                      </Button>
                    </ActionTd>
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
                let color = '';
                if (doc.documentStatus === 'Pending') {
                  color = 'text-orange-600 bg-orange-200';
                } else if (doc.documentStatus === 'Success') {
                  color = 'text-green-800 bg-green-100';
                } else {
                  color = 'text-red-600 bg-red-200';
                }
                return (
                  <Tr key={doc.id} className=''>
                    <Td className='border-l-0'>{doc.serialCode}</Td>
                    <Td className=''>
                      {doc.firstName} {doc.lastName}
                    </Td>
                    <Td>{!doc.contactNumber ? 'None' : doc.contactNumber}</Td>
                    <Td className=''>
                      {doc.paymentMethod === 'GCash' ? (
                        <Button
                          value={doc.screenShotUrl}
                          onClick={(e) => handleViewPayment(e)}
                          className='bg-gray-100 hover:text-blue-800 text-blue-600'
                        >
                          {doc.paymentMethod}
                        </Button>
                      ) : (
                        doc.paymentMethod
                      )}
                    </Td>
                    <Td className=''>{doc.date}</Td>
                    <Td className=''>{doc.documentType}</Td>
                    <Td
                      className={`${
                        doc.documentStatus === 'Decline'
                          ? 'hover:cursor-pointer'
                          : null
                      }`}
                    >
                      {doc.documentStatus === 'Decline' ? (
                        <TippyTooltip
                          className={'bg-red-400'}
                          content={doc.reason}
                        >
                          <span
                            className={`p-1.5 rounded-lg text-xs uppercase ${color}`}
                          >
                            {doc.documentStatus}
                          </span>
                        </TippyTooltip>
                      ) : (
                        <span
                          className={`p-1.5 rounded-lg text-xs uppercase ${color}`}
                        >
                          {doc.documentStatus}
                        </span>
                      )}
                    </Td>
                    <ActionTd>
                      <Button
                        type='button'
                        className='group bg-transparent'
                        disabled={doc.documentStatus === 'Success'}
                        onClick={() => handleSuccessPages(doc.id, index)}
                      >
                        <SVGCheck className='group-disabled:fill-gray-600 h-4 w-4 fill-lime-500' />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() => handleDeclinePages(doc.id, index)}
                      >
                        <SVGDecline className='h-5 w-5 fill-red-600' />
                      </Button>
                      <Button
                        type='button'
                        className='bg-transparent'
                        onClick={() =>
                          handleFindRelevance(
                            doc.firstName,
                            doc.lastName,
                            getAge(doc.birthdate),
                            doc.documentType
                          )
                        }
                      >
                        <SVGApproval />
                      </Button>
                    </ActionTd>
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

const ActionTd = ({ children, className }) => {
  return (
    <Td
      className={clsx(
        'flex border-b-0 border-l-0 border-r-0 border-t-0',
        className
      )}
    >
      {children}
    </Td>
  );
};
