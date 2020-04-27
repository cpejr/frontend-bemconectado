import React, {useEffect, useState} from 'react'
import { Toolbar } from '@material-ui/core';

export default function Header(props){
    const [highlight0, setHighlight0] = useState();
    const [highlight1, setHighlight1] = useState();
    const [highlight2, setHighlight2] = useState();

    useEffect(() => {
        if (props.currentPage==0){
            console.log(hightlight0);
            setHighlight0(true);
            setHighlight1(false);
            setHighlight2(false);
            console.log(hightlight0);
        }
        if (props.currentPage==1){
            setHighlight0(false);
            setHighlight1(true);
            setHighlight2(false);
        }
        if (props.currentPage==2){
            setHighlight0(false);
            setHighlight1(false);
            setHighlight2(true);
        }
    }, [props.currentPage])

    return (
        <Toolbar className="Toolbar"  >
            <div className="toolInfo">
                BEM CONECTADO
                {highlight0 && (<div className="hightlight"/>)}
            </div>
            <div className="toolInfo">
                O QUE É
                {highlight1 && (<div className="hightlight"/>)}
            </div>
            <div className="toolInfo">
                QUEM SOMOS
                {highlight2 && (<div className="hightlight"/>)}
            </div>
        </Toolbar>
    )
}