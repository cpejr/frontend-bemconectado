import React, { useState, useEffect } from 'react';
import { Edit, RotateLeft } from '@material-ui/icons';

import './styles.css';
import { useMediaQuery } from '@material-ui/core';

export default function InputEditable({ title, data, setData, objKey, previousData }) {

    const [editable, setEditable] = useState(false);
    const nullState = "";

    function handleChange(e) {
        if (objKey) {
            let newData = {...data};
            newData[objKey] = e.target.value;
            setData(newData);
        }
    }

    function resetData() {
        if (objKey && previousData && previousData[objKey]) {
            let newData = {...data};
            newData[objKey] = previousData[objKey];
            setData(newData);
            setEditable(!editable);
        } else {
            if (!previousData[objKey]) {
                let newData = {...data};
                newData[objKey] = "";
                setData(newData);
            }
            setEditable(!editable);
        }
    }

    return (
        <div className="infoEditableLine">
            <label className="infoEditableTitle">{title}</label>
            <div className="infoEditableContent">
                {editable ?
                    <input value={data[objKey]} onChange={(e) => { handleChange(e) }} />
                    :
                    <input value={nullState} placeholder={data[objKey]} readOnly />
                }
                {editable ?
                    <RotateLeft onClick={resetData} className="editIcon" />
                    :
                    <Edit onClick={(e) => setEditable(!editable)} className="editIcon" />
                }
            </div>
        </div>
    );

}