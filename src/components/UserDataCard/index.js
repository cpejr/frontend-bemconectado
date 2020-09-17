import React from "react";

import { Save } from '@material-ui/icons';
import InputEditable from "./InputEditable";
import "./styles.css";

export default function UserDataCard({
    mainTitle,
    description,
    genVector, //Needs to be a vector that cointains pairs of names and keys of user data.
    data,
    previousData,
    setData,
}) {

    return (
        <div className="cardInfo">

            <div className="userProfile">
                <div className="titleRow">
                    <h2>{mainTitle}</h2>
                    <Save/>
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