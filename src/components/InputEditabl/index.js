import React, { useState, useEffect } from 'react';
import { Edit } from '@material-ui/icons';

import './styles.css';

export default function InputEditable({ title, data, setData, objKey }) {

    const [editable, setEditable] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(()=>{
    },[update]);
    
    function handleChange(e) {
        if (objKey) {
            let newData = data;
            newData[objKey] = e.target.value;
            setData(newData);
            setUpdate(!update);
        }
    }

    return (
        <div className="infoEditableLine">
            <label>{title}</label>
            {editable ? <input value={data[objKey]} onChange={(e) => { handleChange(e) }} />
                : <input value="" placeholder={data[objKey]} readOnly />}
            <Edit onClick={() => setEditable(!editable)} className="editIcon" />
        </div>
    );

}