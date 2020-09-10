import React, { useState, useEffect } from 'react';
import { Edit } from '@material-ui/icons';

import './styles.css';

export default function InputEditable({ title, value, setValue } ){

    const [editable, setEditable] = useState(false);

    useEffect(()=>{
        console.log(title);
        console.log(value);

    }, []);

    return (

        <div className="infoEditableLine">
            <label>{title}</label>
            {editable? <input placeholder={value} onChange={ (e) => setValue(e.target.value)} /> : <input placeholder={value} readOnly/>}
            <Edit onClick={() => setEditable(!editable)} className="editIcon"/>
        </div>
    );

}