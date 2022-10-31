import React, { useState } from 'react';
import moment from 'moment/moment';
import InputTextField from '../Fields/InputTextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../Checkbox';
import InputNumberField from '../Fields/InputNumberField';

const ResidentForm = ({ getObject, objectData }) => {
  //#region Document Information for firestore
  const [data, setData] = useState(objectData);
  //#endregion
  //TODO Control for Submit
  console.log(data);
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
  const submitInformation = (evt) => {
    evt.preventDefault();
    getObject(data);
  };
  return (
    <div>
      <form className='flex flex-col gap-2 my-5 ' onSubmit={submitInformation}>
        {/* Personal Information */}
        <div>
          Personal Information
          <div className='grid grid-cols-3 gap-4 items-center'>
            <InputTextField
              type='text'
              label='First Name'
              name='firstName'
              pattern='[a-zA-Z]'
              placeholder='Juan'
              required
              value={data.firstName}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Last Name'
              name='lastName'
              pattern='[a-zA-Z]'
              placeholder='Cruz'
              required
              value={data.lastName}
              getValue={(value) => handleTextChange(value)}
            />
            <InputTextField
              type='text'
              label='Middle Name'
              name='middleName'
              pattern='[a-zA-Z]'
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
              <select
                name='gender'
                value={data.gender}
                onChange={handleInputChange}
                onBlur={validateInput}
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className='grid grid-flow-row grow'>
              <label htmlFor='dob'>Birth Date</label>
              <input
                type='date'
                name='dob'
                required
                selected={data.birthdate}
                onChange={handleInputChange}
                id=''
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
              <select
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
              <select
                name='education'
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
          <h3>Contact Information</h3>
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
              name='mobile'
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
          <h3>Family Background</h3>
          <div className='grid grid-cols-3 gap-4 items-center'>
            <InputTextField
              label="Father's Name"
              type='text'
              name='father'
              value={data.family.father}
              getValue={(value) => handleFamilyChange(value)}
            />
            <InputTextField
              label="Mother's Name"
              type='text'
              name='mother'
              value={data.family.mother}
              getValue={(value) => handleFamilyChange(value)}
            />
            <InputTextField
              label="Spouse's Name"
              type='text'
              name='spouse'
              value={data.family.spouse}
              getValue={(value) => handleFamilyChange(value)}
            />
            <h4>Children</h4>
            <div
              className={`grid items-center justify-items-center col-span-3`}
            >
              {data.family.children?.map((child, index) => (
                <div key={index} className='grid grid-cols-6'>
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
                  <div className='col-span-2'>
                    <button
                      type='button'
                      onClick={() => clickRemoveChild(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <ul>
                {data.family.children.map((child, index) => (
                  <li key={index}>{child.firstName}</li>
                ))}
              </ul>
              <button
                type='button'
                className='w-full h-10 border cursor-pointer hover:bg-sky-50 focus:bg-sky-200 rounded-lg'
                onClick={handleAddChildForm}
              >
                <FontAwesomeIcon className='text-3xl' icon={faUserPlus} />
              </button>
            </div>
          </div>
        </div>
        {/* Beneficiary */}
        <div>
          <h3>Beneficiaries</h3>
          <div className='grid grid-cols-3 py-4'>
            <Checkbox
              name='_4ps'
              checkVal={data.beneficiaries._4ps}
              getValue={(value) => handleBenefChecks(value)}
            >
              4PS
            </Checkbox>
            <Checkbox
              name='pension'
              checkVal={data.beneficiaries.pension}
              getValue={(value) => handleBenefChecks(value)}
            >
              Pension
            </Checkbox>
          </div>
        </div>
        {/* health */}
        <div>
          <h3>Health</h3>
          <div className='grid grid-cols-3 py-4 gap-2'>
            <Checkbox
              value='pwd'
              name='pwd'
              checkVal={data.health.pwd}
              getValue={(value) => handleHealthCheck(value)}
            >
              Person With Disability (P.W.D.)
            </Checkbox>
            <Checkbox
              value='covid-19'
              name='covidvax'
              checkVal={data.health.covidvax}
              getValue={(value) => handleHealthCheck(value)}
            >
              Covid-19 Vax
            </Checkbox>
          </div>
        </div>
        <button type='submit'>Add Resident</button>
      </form>
    </div>
  );
};

export default ResidentForm;
