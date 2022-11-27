import React, { useState } from 'react';
import InputTextField from '../Fields/InputTextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../Checkbox';
import InputNumberField from '../Fields/InputNumberField';
import Button from '../Button';
import { getAge } from '@/hooks/getAge';
import ChildButtons from './ChildButtons';
import SVGRemove from '@/components/svg/icons8-remove/icons8-remove.svg';
import SVGHeart from '@/components/svg/icons8-heart-health/icons8-heart-health.svg';
import clsx from 'clsx';

const ResidentForm = ({ getObject, objectData, ResidentFormType = '' }) => {
  //#region Document Information for firestore
  const [data, setData] = useState(objectData);
  //#endregion
  //TODO Control for Submit

  //references

  const [isDisable, setDisable] = useState(true);
  /**
   * The handleInputChange function takes an event as an argument, and then sets the state of the data
   * object to the value of the event target.
   */
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //TODO Needs refactoring see if this is available use as a library
  const handleTextChange = (e) => {
    const { name, value } = e;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e;
    setData({
      ...data,
      contacts: {
        ...data.contacts,
        [name]: value,
      },
    });
  };

  const handleHealthCheck = (e) => {
    const { name, checked } = e;
    setData({
      ...data,
      health: {
        ...data.health,
        [name]: checked,
      },
    });
  };

  const handleHealthInput = (e) => {
    const { name, value } = e;
    setData({
      ...data,
      health: {
        ...data.health,
        [name]: value,
      },
    });
  };
  const handleHealthDates = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      health: {
        ...data.health,
        [name]: value,
      },
    });
  };

  const handleBenefChecks = (e) => {
    const { name, checked } = e;
    setData({
      ...data,
      beneficiaries: {
        ...data.beneficiaries,
        [name]: checked,
      },
    });
  };

  const handleFamilyChange = (e) => {
    const { name, value } = e;
    setData({
      ...data,
      family: {
        ...data.family,
        [name]: value,
      },
    });
  };

  const handleChildValues = (e, index) => {
    const { name, value } = e;
    const dataChild = [...data.family.children];
    console.log(dataChild);
    dataChild[index][name] = value;
    setData({
      ...data,
      family: {
        ...data.family,
        children: dataChild,
      },
    });
    console.table(data.family.children);
  };

  // Beneficiary Controls ----------
  const handleBeneficiaryDate = (e, index) => {
    const { name, value } = e.target;
    const dataMember = [...data.beneficiaries._4ps];
    dataMember[index][name] = value;
    console.log(dataMember);
    setData({
      ...data,
      beneficiaries: {
        ...data.beneficiaries,
        _4ps: dataMember,
      },
    });
  };

  const handleBeneficiaryInputs = (e, index) => {
    const { name, value } = e;
    const dataMember = [...data.beneficiaries._4ps];
    dataMember[index][name] = value;
    setData({
      ...data,
      beneficiaries: {
        ...data.beneficiaries,
        _4ps: dataMember,
      },
    });
    console.log(dataMember);
  };

  const validateInput = (evt) => {
    const { name, value } = evt.target;
    if (name === 'gender') {
      if (value === '') {
        setDisable(true);
      }
    }
    if (name === 'civ_status') {
      setDisable(true);
    }
  };
  /**
   * When the button is clicked, create a new object that is a copy of the current data object, but
   * with a new child object added to the children array.
   */
  //This is to add

  const handleBoosterInputs = (e, index) => {
    const { name, value } = e;
    const dataBooster = [...data.health.boosters];
    dataBooster[index][name] = value;
    setData({
      ...data,
      health: {
        ...data.health,
        boosters: dataBooster,
      },
    });
    console.log(dataBooster);
  };

  const handleBoosterDate = (e, index) => {
    const { name, value } = e.target;
    const dataBooster = [...data.health.boosters];
    dataBooster[index][name] = value;
    console.log(dataMember);
    setData({
      ...data,
      health: {
        ...data.health,
        boosters: dataBooster,
      },
    });
  };

  // Button Handler
  //----------- for adding child in children
  const handleAddChildForm = () => {
    setData({
      ...data,
      family: {
        ...data.family,
        children: [
          ...data.family.children,
          { firstName: '', lastName: '', middleName: '', suffix: '' },
        ],
      },
    });
  };

  const handleAdd_4ps = () => {
    console.log('triggered');
    setData({
      ...data,
      beneficiaries: {
        ...data.beneficiaries,
        _4ps: [...data.beneficiaries._4ps, { FullName: '', birthdate: '' }],
      },
    });
  };

  const handleAddBooster = () => {
    setData({
      ...data,
      health: {
        ...data.health,
        boosters: [
          ...data.health.boosters,
          { VaccinationType: '', VaccinationDate: '', VaccinationLocation: '' },
        ],
      },
    });
  };

  // Removing child in --->> children under family members
  const clickRemoveChild = (index) => {
    const allData = [...data.family.children];
    allData.splice(index, 1);
    setData({
      ...data,
      family: {
        ...data.family,
        children: allData,
      },
    });
  };

  const clickRemoveMember = (index) => {
    /* Creating a new array with all the data from the data.beneficiaries._4ps array. */
    const allData = [...data.beneficiaries._4ps];
    allData.splice(index, 1);
    setData({
      ...data,
      beneficiaries: {
        ...data.beneficiaries,
        _4ps: allData,
      },
    });
  };

  const clickRemoveBooster = (index) => {
    /* Creating a new array with all the data from the data.health.boosters array. */
    const allData = [...data.health.boosters];
    allData.splice(index, 1);
    setData({
      ...data,
      health: {
        ...data.health,
        boosters: allData,
      },
    });
  };

  const submitInformation = (evt) => {
    evt.preventDefault();
    getObject(data);
  };
  return (
    <div>
      <form
        className='flex flex-col gap-2 my-5 p-1 '
        onSubmit={submitInformation}
      >
        {/* Personal Information */}
        <div>
          <SectionDivider>Personal Information</SectionDivider>
          <div className='grid grid-cols-3 gap-4 items-center'>
            <InputTextField
              type='text'
              label='First Name'
              name='firstName'
              placeholder='Juan'
              required
              value={data.firstName}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Last Name'
              name='lastName'
              placeholder='Cruz'
              required
              value={data.lastName}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Middle Name'
              name='middleName'
              placeholder='Garcia'
              value={data.middleName}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Suffix'
              name='suffix'
              placeholder='Jr. Sr.'
              value={data.suffix}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Alias'
              name='alias'
              placeholder='Pepe'
              value={data.alias}
              getValue={(value) => handleTextChange(value)}
            />
            <div className='grid grid-flow-row grow'>
              <label htmlFor='gender'>Gender </label>
              <select
                name='gender'
                className='rounded-md'
                value={data.gender}
                onChange={handleInputChange}
                onBlur={validateInput}
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='birthdate'>Birthdate</label>
              <input
                type='date'
                name='birthdate'
                className='rounded-md'
                required
                value={data.birthdate}
                selected={data.birthdate}
                onChange={handleInputChange}
                id=''
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='age'>Age</label>
              <input
                className='rounded-md'
                name='age'
                type='text'
                readOnly
                value={getAge(data?.birthdate)}
              />
            </div>

            <InputTextField
              type='text'
              label='Birth Place'
              name='birthplace'
              required
              placeholder='Caramutan, La Paz'
              value={data.birthplace}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Religion'
              name='religion'
              placeholder='Catholic'
              value={data.religion}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Blood Type'
              name='bloodType'
              placeholder='Type AB'
              value={data.bloodType}
              getValue={(value) => handleTextChange(value)}
            />
            <div className='grid grid-flow-row grow'>
              <label htmlFor='civ_status'>Civilian Status</label>
              <select
                className='rounded-md'
                name='civ_status'
                value={data.civ_status}
                onChange={handleInputChange}
                onBlur={validateInput}
              >
                <option value=''>Status</option>
                <option value='Single'>Single</option>
                <option value='Married'>Married</option>
                <option value='Widow'>Widow</option>
                <option value='Separated'>Separated</option>
              </select>
            </div>
            <InputTextField
              type='text'
              label='Nationality'
              name='nationality'
              placeholder='Filipino'
              required
              value={data.nationality}
              getValue={(value) => handleTextChange(value)}
            />

            <div className='grid grid-flow-row grow'>
              <label htmlFor='education'>Education</label>
              <select
                name='education'
                className='rounded-md'
                value={data.education}
                onChange={handleInputChange}
                id=''
              >
                <option value=''>Educational Attainment</option>
                <option value='College Graduate'>College Graduate</option>
                <option value='College Undergraduate'>
                  College Undergraduate
                </option>
                <option value='Senior High School'>Senior High School</option>
                <option value='Junior High School'>Junior Highschool</option>
                <option value='Elementary'>Elementary</option>
                <option value='Uneducated'>Uneducated</option>
              </select>
            </div>
            <InputTextField
              type='text'
              label='Occupation'
              name='occupation'
              placeholder='Teacher'
              value={data.occupation}
              getValue={(value) => handleTextChange(value)}
            />
          </div>
        </div>
        {/* Contacts Section */}
        <div>
          <SectionDivider>Contact Information</SectionDivider>
          <div className='grid grid-cols-3 gap-4 items-center'>
            <InputTextField
              label='Lot Number'
              type='text'
              name='lot'
              value={data.contacts.lot}
              getValue={(value) => handleContactChange(value)}
            />
            <InputTextField
              label='Street Name'
              type='text'
              name='streetName'
              value={data.contacts.streetName}
              getValue={(value) => handleContactChange(value)}
            />
            <InputTextField
              label='Purok'
              type='text'
              name='purok'
              value={data.contacts.purok}
              getValue={(value) => handleContactChange(value)}
            />
            <div className='grid grid-flow-row grow'>
              <label htmlFor='barangay'>Barangay</label>
              <input
                type='text'
                name='barangay'
                readOnly
                value={data.contacts.barangay}
              />
            </div>
            <div className='grid grid-flow-row grow'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                readOnly
                value={data.contacts.city}
              />
            </div>
            <div className='grid grid-flow-row grow'>
              <label htmlFor='province'>Province</label>
              <input
                type='text'
                name='province'
                readOnly
                value={data.contacts.province}
              />
            </div>
            <InputNumberField
              label='Mobile Number'
              type='tel'
              name='mobile'
              placeholder='0920-123-4567'
              pattern='[0-9]{11}'
              value={data.contacts.mobile}
              getValue={(value) => handleContactChange(value)}
            />
            <InputNumberField
              label='Telephone Number'
              type='tel'
              name='telephone'
              placeholder='092-4565'
              pattern='[0-9]{7}'
              value={data.contacts.telephone}
              getValue={(value) => handleContactChange(value)}
            />
            <InputTextField
              label='Email Address'
              type='email'
              name='email'
              placeholder='juancruz@gmail.com'
              value={data.contacts.email}
              getValue={(value) => handleContactChange(value)}
            />
          </div>
        </div>
        {/*The Family Background */}
        <div>
          <SectionDivider>Family Background</SectionDivider>
          <div>
            <div className='flex justify-between gap-2'>
              <InputTextField
                label="Father's Name"
                type='text'
                name='father'
                className={'grow'}
                value={data.family.father}
                getValue={(value) => handleFamilyChange(value)}
              />
              <InputTextField
                label="Mother's Name"
                type='text'
                name='mother'
                className={'grow'}
                value={data.family.mother}
                getValue={(value) => handleFamilyChange(value)}
              />
              <InputTextField
                label="Spouse's Name"
                type='text'
                name='spouse'
                className={'grow'}
                value={data.family.spouse}
                getValue={(value) => handleFamilyChange(value)}
              />
            </div>

            <div>
              <h5 className='mt-3'>Children</h5>
              <ListContainer>
                {data.family.children?.map((child, index) => (
                  <MapsContainer key={index} className='flex gap-2'>
                    <InputTextField
                      type='text'
                      label='First Name'
                      name='firstName'
                      isRequired={true}
                      value={child.firstName}
                      getValue={(e) => handleChildValues(e, index)}
                    />
                    <InputTextField
                      type='text'
                      label='Last Name'
                      name='lastName'
                      isRequired={true}
                      value={child.lastName}
                      getValue={(e) => handleChildValues(e, index)}
                    />
                    <InputTextField
                      type='text'
                      label='Middle Name'
                      name='middleName'
                      isRequired={false}
                      value={child.middleName}
                      getValue={(e) => handleChildValues(e, index)}
                    />
                    <InputTextField
                      type='text'
                      label='Suffix'
                      name='suffix'
                      isRequired={false}
                      value={child.suffix}
                      getValue={(e) => handleChildValues(e, index)}
                    />
                    <div>
                      <span>Remove</span>
                      <ChildButtons
                        className={'flex border-0 items-center justify-center'}
                        type='button'
                        onClick={() => clickRemoveChild(index)}
                      >
                        <SVGRemove className='fill-red-400 w-6 h-6' />
                      </ChildButtons>
                    </div>
                  </MapsContainer>
                ))}
              </ListContainer>
            </div>
            <ChildButtons
              type='button'
              className='mt-2 '
              onClick={handleAddChildForm}
            >
              <FontAwesomeIcon className='text-3xl' icon={faUserPlus} />
            </ChildButtons>
          </div>
        </div>
        {/* Beneficiary */}
        <div>
          <SectionDivider>Beneficiary Information</SectionDivider>
          <div className='grid grid-cols-3 py-4'>
            <Checkbox
              name='pension'
              checkVal={data.beneficiaries.pension}
              getValue={(value) => handleBenefChecks(value)}
            >
              Pension
            </Checkbox>
          </div>
          <div>
            <h5>4P's Member/s</h5>
            <ListContainer>
              {data.beneficiaries._4ps?.map((member, index) => (
                <MapsContainer key={index} className='flex gap-2'>
                  <InputTextField
                    type='text'
                    label='Full Name'
                    name='FullName'
                    value={member.FullName}
                    getValue={(e) => handleBeneficiaryInputs(e, index)}
                  />
                  <div className='flex flex-col'>
                    <label htmlFor='age'>Age</label>
                    <input
                      name='age'
                      type='text'
                      readOnly
                      value={getAge(member?.birthdate)}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input
                      type='date'
                      name='birthdate'
                      required
                      value={member.birthdate}
                      selected={member.birthdate}
                      onChange={(e) => handleBeneficiaryDate(e, index)}
                      id=''
                    />
                  </div>
                  <div>
                    <span>Remove</span>
                    <ChildButtons
                      className={'flex border-0 items-center justify-center'}
                      type='button'
                      onClick={() => clickRemoveMember(index)}
                    >
                      <SVGRemove className='fill-red-400 w-6 h-6' />
                    </ChildButtons>
                  </div>
                </MapsContainer>
              ))}
            </ListContainer>
          </div>
          <ChildButtons
            className={'mt-2'}
            type='button'
            onClick={handleAdd_4ps}
          >
            <FontAwesomeIcon className='text-3xl' icon={faUserPlus} />
          </ChildButtons>
        </div>
        {/* health */}
        <div>
          <SectionDivider>Health Information</SectionDivider>
          <div className='grid grid-cols-3 py-4 gap-2'>
            <Checkbox
              value='pwd'
              name='pwd'
              checkVal={data.health.pwd}
              getValue={(value) => handleHealthCheck(value)}
            >
              Person With Disability (P.W.D.)
            </Checkbox>
          </div>

          <VaccineContainer className='flex justify-start gap-3'>
            <InputTextField
              label={'Vaccination Type'}
              type='text'
              placeholder='Example Moderna'
              name='Vaccine1Type'
              value={data.health.Vaccine1Type}
              getValue={(value) => handleHealthInput(value)}
            />

            <div className='flex flex-col'>
              <label htmlFor='Vaccine1Date'>Vaccination Date</label>
              <input
                type='date'
                name='Vaccine1Date'
                required
                className='rounded-md'
                value={data.health.Vaccine1Date}
                selected={data.health.Vaccine1Date}
                onChange={handleHealthDates}
              />
            </div>
            <InputTextField
              label='Municipality/ City of Vaccination '
              type='text'
              placeholder='Example La Paz'
              name='Vaccine1Location'
              value={data.health.Vaccine1Location}
              getValue={(value) => handleHealthInput(value)}
            />
          </VaccineContainer>
          <VaccineContainer className='flex justify-start gap-3'>
            <InputTextField
              label={'Vaccination Type'}
              type='text'
              placeholder='Example Moderna'
              name='Vaccine2Type'
              value={data.health.Vaccine2Type}
              getValue={(value) => handleHealthInput(value)}
            />

            <div className='flex flex-col'>
              <label htmlFor='Vaccine2Date'>Vaccination Date</label>
              <input
                type='date'
                name='Vaccine2Date'
                required
                className='rounded-md'
                value={data.health.Vaccine2Date}
                selected={data.health.Vaccine2Date}
                onChange={handleHealthDates}
              />
            </div>
            <InputTextField
              label='Municipality/ City of Vaccination '
              type='text'
              placeholder='Example La Paz'
              name='Vaccine2Location'
              value={data.health.Vaccine2Location}
              getValue={(value) => handleHealthInput(value)}
            />
          </VaccineContainer>
          <div>
            <h5>Boosters</h5>
            <ListContainer>
              {data.health.boosters?.map((booster, index) => (
                <MapsContainer key={index}>
                  <div className='flex flex-col-reverse align-middle mb-2'>
                    <h6>B {index + 1}</h6>
                  </div>
                  <InputTextField
                    type='text'
                    label='Vaccine Type'
                    name='VaccinationType'
                    isRequired={true}
                    value={booster.VaccinationType}
                    getValue={(e) => handleBoosterInputs(e, index)}
                  />
                  <div className='flex flex-col'>
                    <label htmlFor='VaccinationDate'>Vaccination Date</label>
                    <input
                      type='date'
                      name='VaccinationDate'
                      required
                      className='rounded-md'
                      value={booster.VaccinationDate}
                      selected={booster.VaccinationDate}
                      onChange={(e) => handleBoosterDate(e, index)}
                    />
                  </div>
                  <InputTextField
                    type='text'
                    label='Municipality/ City of Vaccination'
                    name='VaccinationLocation'
                    isRequired={true}
                    value={booster.VaccinationLocation}
                    getValue={(e) => handleBoosterInputs(e, index)}
                  />
                  <div>
                    <span>Remove</span>
                    <ChildButtons
                      className={'flex border-0 items-center justify-center'}
                      type='button'
                      onClick={() => clickRemoveBooster(index)}
                    >
                      <SVGRemove className='fill-red-400 w-6 h-6' />
                    </ChildButtons>
                  </div>
                </MapsContainer>
              ))}
            </ListContainer>
          </div>
          <ChildButtons
            className={'mt-2 flex justify-center items-center'}
            type='button'
            onClick={handleAddBooster}
          >
            <SVGHeart className='mr-4' />
            Add Booster
          </ChildButtons>
        </div>
        <div className='mb-2'>
          <SectionDivider className='mb-4'></SectionDivider>
          <div className='flex flex-col justify-center'>
            <Button type='submit'>{ResidentFormType} Resident</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const SectionDivider = ({ className, children }) => {
  return (
    <div className={clsx('flex w-full border-b-2 mb-3', className)}>
      <h4>{children}</h4>
    </div>
  );
};

const ListContainer = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center'>{children}</div>
  );
};

const MapsContainer = ({ children, key }) => {
  return (
    <div key={key} className='flex flex-row justify-start align-middle gap-2 '>
      {children}
    </div>
  );
};

const VaccineContainer = ({ children }) => {
  return (
    <div className='flex justify-center items-center gap-4 mb-2'>
      {children}
    </div>
  );
};

const Sections = ({ children }) => {
  return <div className=''>{children}</div>;
};
export default ResidentForm;
