import React, { useState, useEffect } from 'react';
import { Edit } from '@material-ui/icons';

import './styles.css';

export default function InputEditable({ title, value, setValue } ){

    const [editable, setEditable] = useState(false);

    function handleChange(e){
        setValue(e.target.value);
    }

    return (

        <div className="infoEditableLine">
            <label>{title}</label>
            {editable? <input value={value} onChange={(e) => {handleChange(e)}}  /> 
            : <input value="" placeholder={value} readOnly/>}
            <Edit onClick={() => setEditable(!editable)} className="editIcon"/>
        </div>
    );

}