import React, { useState, useEffect } from 'react';
import { Edit } from '@material-ui/icons';

import './styles.css';

export default function InputEditable({ title, value, setValue, objKey }) {

    const [editable, setEditable] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(()=>{
    },[update]);
    
    function handleChange(e) {
        if (objKey) {
            let newData = value;
            newData[objKey] = e.target.value;
            setValue(newData);
            setUpdate(!update);
        }
    }

    return (
        <div className="infoEditableLine">
            <label>{title}</label>
            {editable ? <input value={value[objKey]} onChange={(e) => { handleChange(e) }} />
                : <input value="" placeholder={value[objKey]} readOnly />}
            <Edit onClick={() => setEditable(!editable)} className="editIcon" />
        </div>
    );

}