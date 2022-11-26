import React from 'react'

const SelectField = ({className, value, name, label, optionsList=[], }) => {
  return (
    <div>
        <select name={name} id="">
            <option value="">{optionsList[0]}</option>
            {optionsList.map((item) => {
                //TODO Iteration
                // iterate starting from item[1] then render
            })}
        </select>
    </div>
  )
}

export default SelectField