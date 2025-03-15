import React, { useState } from 'react'

function InputBox({name,type, id, value, placeholder, icon, onChange}) {
    const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className='relative w-[100%] mb-4 bg-grey-400'>
        <i className={"fa-solid fa-" + icon}></i>

        <input 
            name = {name}
            type = {type === "password" ? passwordVisible ? "text" : "password" :type}
            placeholder= {placeholder}
            defaultValue={value}
            id={id}
            icon = {icon}
            onChange = {onChange}
            className='input-box'
        />

        {
            type === "password" ?
            <i class={"fa-solid fa-eye" + (!passwordVisible ? "-slash": "")+ " input-icon left-[auto] right-4 cursor-pointer"} onClick={() => setPasswordVisible(currentVal => !currentVal)}></i>

            : <></>
        }
    </div>
  )
}

export default InputBox