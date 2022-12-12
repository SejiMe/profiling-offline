import React, { useMemo, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import ResidentForm from '@/components/residents/ResidentForm';
import SVGRemove from '@/components/svg/icons8-denied/icons8-denied-96.svg';
import BackSVG128 from '@/components/svg/icons8-go-back-pastel-glyph/icons8-go-back-128.svg';
import SVGPrinter from '@/components/svg/icons8-printer/icons8-printer.svg';
import SVGDocument from '@/components/svg/icons8-new-document/icons8-new-document.svg';
import { useDeleteResident, useUpdateResident } from '@/hooks/useResidentData';
import { MoonLoader } from 'react-spinners';
import useUpdateCount from '@/hooks/useUpdateCount';
import { useGetOfficials } from '@/hooks/useOfficialData';
import Modal from '@/components/Modal/Modal';

import {
  BarangayClearance,
  BarangayResidency,
  BusinessPermit,
  CertificateIndigency,
} from '@/lib/DocumentCreator';
import { getAge } from '@/hooks/getAge';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

const ResidentDetails = () => {
  //TODO back button for User Interaction
  // 1. Read Data from firebase get the Doc file === Doc ID
  // 2. Send Merge Data to Firebase
  const router = useRouter();
  const params = router.query;
  const id = params.id.toString();

  const { isLoading: idLoading, data } = useQuery(
    `${router.query}`,
    async () => {
      //Read Data based on ID
      const docReference = doc(db, 'residents', id);
      const document = await getDoc(docReference);
      const docData = document.data();
      console.log(docData);
      return docData;
    }
  );
  const { data: officialData } = useGetOfficials();
  const { mutate: deleteResident } = useDeleteResident();
  const { mutate: updateResident } = useUpdateResident();
  const { mutate: decrementCount } = useUpdateCount();

  const [permitNo, setPermitNo] = useState('');
  const [validityUntil, setValidityUntil] = useState('');
  const [statusRef, setStatusRef] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [ctc, setCtc] = useState('');
  const [ctcIssued, setCtcIssued] = useState('');
  const [or, setOr] = useState('');
  const [orIssued, setOrIssued] = useState('');

  const permitNumber = useMemo(() => {
    return permitNo;
  }, [permitNo]);
  const validityPermit = useMemo(() => {
    return validityUntil;
  }, [validityUntil]);
  const statusPermit = useMemo(() => {
    return statusRef;
  }, [statusRef]);
  const amount = useMemo(() => {
    return amountPaid;
  }, [amountPaid]);
  const CTC = useMemo(() => {
    return ctc;
  }, [ctc]);
  const CTCIssued = useMemo(() => {
    return ctcIssued;
  }, [ctcIssued]);
  const OR = useMemo(() => {
    return or;
  }, [or]);
  const ORIssued = useMemo(() => {
    return orIssued;
  }, [orIssued]);

  const printDisabled =
    permitNo === '' ||
    validityUntil === '' ||
    amountPaid === '' ||
    statusRef === '' ||
    ctc === '' ||
    ctcIssued === '' ||
    or === '' ||
    orIssued === '';

  const [isToPrint, setIsToPrint] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [isPermit, setIsPermit] = useState(false);
  const [isDisablePermit, setIsDisablePermit] = useState(true);
  const date = new Date();
  const yearNow = date.getFullYear();

  const handleProcessMutation = (Doc) => {
    updateResident({ residentDoc: Doc, residentID: id });
  };

  // --- BUTTON HANDLERS

  const handleDelete = (docID) => {
    decrementCount(-1);
    deleteResident(docID);
    setTimeout(() => {
      router.push('/admin/residents');
    }, 2000);
  };

  const closeDelete = () => {
    setToDelete(false);
  };
  const openDelete = () => {
    setToDelete(true);
  };
  const closePrint = () => {
    setIsToPrint(false);
  };
  const openPrint = () => {
    setIsToPrint(true);
  };

  const handleGenerateClearance = async () => {
    setIsPermit(false);
    const doc = await BarangayClearance(
      data.firstName,
      data.lastName,
      data.middleName,
      getAge(data.birthdate),
      data.civ_status,
      officialData.Captain,
      yearNow
    );
    await Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `CLEARANCE_${data.lastName}_${data.firstName}.docx`);
    });
  };
  const handleGenerateResidency = async () => {
    setIsPermit(false);
    const doc = await BarangayResidency(
      data.firstName,
      data.lastName,
      data.middleName,
      getAge(data.birthdate),
      data.civ_status,
      officialData.Captain,
      yearNow
    );
    await Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `RESIDENCY_${data.lastName}_${data.firstName}.docx`);
    });
  };
  const handleGenerateIndigency = async () => {
    setIsPermit(false);
    const doc = await CertificateIndigency(
      data.firstName,
      data.lastName,
      data.middleName,
      getAge(data.birthdate),
      data.civ_status,
      officialData.Captain,
      yearNow,
      data.contacts.purok
    );
    await Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `INDIGENCY_${data.lastName}_${data.firstName}.docx`);
    });
  };

  const handleGeneratePermit = async () => {
    const doc = await BusinessPermit(
      data.firstName,
      data.lastName,
      data.middleName,
      getAge(data.birthdate),
      data.civ_status,
      officialData.Captain,
      yearNow,
      permitNumber,
      validityPermit,
      statusPermit,
      amount,
      CTC,
      CTCIssued,
      OR,
      ORIssued
    );
    await Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `PERMIT_${data.lastName}_${data.firstName}.docx`);
    });
  };

  if (idLoading)
    return (
      <div className='h-screen w-screen flex justify-center align-middle items-center'>
        <MoonLoader />
      </div>
    );
  return (
    <div className='p-4 overflow-auto'>
      {/* TODO Icon */}
      <div className='flex justify-between '>
        <Button
          type='button'
          className='bg-transparent ml-10 '
          onClick={() => router.push('/admin/residents')}
        >
          <BackSVG128 className='w-8 h-8' />
        </Button>
        <div className='flex'>
          <Button
            type='button'
            className='bg-transparent mr-4 '
            onClick={() => openPrint()}
          >
            <SVGPrinter className='w-7 h-7 fill-gray-600' />
          </Button>
          <Button
            type='button'
            className='bg-transparent mr-10 '
            onClick={() => openDelete()}
          >
            <SVGRemove className='w-10 h-10 fill-red-600' />
          </Button>
        </div>
      </div>
      <Modal show={isToPrint} onClose={closePrint} stylesBody='overflow-auto'>
        <div className='  text-white flex flex-col  bg-green-500 rounded-md shadow-sm py-4 px-8 overflow-auto'>
          <div className='grid grid-cols-4 gap-4'>
            <Button
              onClick={() => handleGenerateClearance()}
              className='text-white bg-transparent border border-gray-400 flex flex-col justify-center align-middle items-center p-2 text-center'
            >
              <SVGDocument className='fill-blue-400 h-10 w-10' />
              Clearance
            </Button>
            <Button
              onClick={() => handleGenerateResidency()}
              className='text-white bg-transparent border border-gray-400 flex flex-col justify-center align-middle items-center p-2 text-center'
            >
              <SVGDocument className='fill-lime-500 h-10 w-10' />
              Residency
            </Button>
            <Button
              onClick={() => handleGenerateIndigency()}
              className='text-white bg-transparent border border-gray-400 flex flex-col justify-center align-middle items-center p-2 text-center'
            >
              <SVGDocument className='fill-yellow-400 h-10 w-10' />
              Indigency
            </Button>
            <Button
              onClick={() => setIsPermit(true)}
              className='text-white bg-transparent border border-gray-400 flex flex-col justify-center align-middle items-center p-2 text-center'
            >
              <SVGDocument className='fill-red-400 h-10 w-10' />
              Business Permit
            </Button>
          </div>
          {isPermit ? (
            <div className='mt-2 overflow-auto'>
              <h3> Please fill up business permit</h3>
              <div className='grid grid-cols-2 gap-2 overflow-auto'>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='permitNo'>Permit Number</label>
                  <input
                    className='text-black rounded'
                    type='text'
                    name='permitNo'
                    value={permitNo}
                    onChange={(e) => {
                      setPermitNo(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='validityUntil'>Valid Until</label>
                  <input
                    className='text-black rounded'
                    type='date'
                    name='validityUntil'
                    value={validityUntil}
                    onChange={(e) => {
                      setValidityUntil(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='statusRef'>Status</label>
                  <input
                    className='text-black rounded'
                    type='text'
                    name='statusRef'
                    value={statusRef}
                    onChange={(e) => {
                      setStatusRef(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='amountPaid'>Amount Paid</label>
                  <input
                    className='text-black rounded'
                    type='number'
                    name='amountPaid'
                    value={amountPaid}
                    onChange={(e) => {
                      setAmountPaid(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='amountPaid'>CTC Number</label>
                  <input
                    className='text-black rounded'
                    type='text'
                    name='ctc'
                    value={ctc}
                    onChange={(e) => {
                      setCtc(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='ctcIssued'>Issued On</label>
                  <input
                    className='text-black rounded'
                    type='date'
                    name='ctcIssued'
                    value={ctcIssued}
                    onChange={(e) => {
                      setCtcIssued(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='ctc'>OR Number</label>
                  <input
                    className='text-black rounded'
                    type='text'
                    name='or'
                    value={or}
                    onChange={(e) => {
                      setOr(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <label htmlFor='orIssued'>Issued On</label>
                  <input
                    className='text-black rounded'
                    type='date'
                    name='orIssued'
                    value={orIssued}
                    onChange={(e) => {
                      setOrIssued(e.target.value);
                    }}
                  />
                </div>
                <div className='col-span-2'>
                  <Button
                    disabled={printDisabled}
                    className='disabled:bg-gray-400 text-white'
                    type='button'
                    onClick={() => {
                      handleGeneratePermit();
                    }}
                  >
                    Print Permit
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
      <Modal show={toDelete} onClose={closeDelete}>
        <div className='bg-white flex flex-col justify-center align-middle items-center p-10 h-[65%] rounded-lg'>
          <div className='mb-10 flex flex-col justify-center align-middle text-center'>
            <h2 className='mb-4'>Confirmation to Delete the Resident</h2>
            <h3 className='text-red-600'>
              {data.firstName} {data.middleName} {data.lastName}
            </h3>
          </div>
          <Button
            type='buitton'
            className='bg-red-400 hover:text-white'
            onClick={() => handleDelete(id)}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <div className='p-2 w-full h-full '>
        <ResidentForm
          ResidentFormType='Update'
          objectData={data}
          getObject={(value) => handleProcessMutation(value)}
        />
      </div>
    </div>
  );
};

export default ResidentDetails;
