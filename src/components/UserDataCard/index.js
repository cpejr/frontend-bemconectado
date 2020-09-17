import React, {useContext} from "react";

import { Save } from '@material-ui/icons';
import InputEditable from "./InputEditable";
import "./styles.css";

import { LoginContext } from '../../contexts/LoginContext';
import api from "../../services/api";

export default function UserDataCard({
    mainTitle,
    description,
    genVector, //Needs to be a vector that cointains pairs of names and keys of user data.
    data,
    previousData,
    setData,
}) {
    
    const { token } = useContext(LoginContext);

    // const response = await api.get('/verify', config)
    

    async function handleSaveData(){

        let body = new FormData();

        function addToData(key, value) {
            if (value !== undefined && value !== ''){
                body.append(key, value)
            }
        }

        genVector.forEach(item => {
            addToData(item.objKey, data[item.objKey]);
        })

        alert('DEU CERTO?')
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
        console.log(data._id);
        const response = await api.put(`/ong/${data._id}`, body, config);
        
    }

    return (
        <div className="cardInfo">

            <div className="userProfile">
                <div className="titleRow">
                    <h2>{mainTitle}</h2>
                    <div className="saveButton">
                        <Save className="save" onClick={(e) => handleSaveData()}/>
                    </div>
                </div>
                <p>{description}</p>
            </div>

            <div className="infoEditable">
                <form>
                    {
                        genVector.map((dataElement) => {
                            return (
                                <InputEditable
                                    title={dataElement.title}
                                    data={data}
                                    previousData={previousData}
                                    setData={setData}
                                    objKey={dataElement.objKey}
                                    key={dataElement.objKey}
                                />
                            )
                        })
                    }
                </form>
            </div>
        </div>
    )
}