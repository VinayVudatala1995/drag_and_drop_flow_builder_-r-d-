import React, { useContext, useEffect, useLayoutEffect } from 'react';
import * as _ from 'lodash';
import { ActionTypes, setForm } from '../../../../store/main/mainSlice';
import { useDispatch } from 'react-redux';
import './ButtonNodeWidget.css';
import { CustomPortLabel } from '../ports/CustomPortWidget';
import { NodeWidgetProps } from '../../../../utils/props';
import { engineContext } from '../../../Manager';
import { FiSettings } from "react-icons/fi";
import { ButtonInterface } from '../../../../store/button/buttonSlice';


// if (buttonsList != undefined) {
//     for (let i = a; i < buttonsList?.length; i++) {
//         props.node.addOutPort(`out${i + 1}`, false);
//     }
//     a = buttonsList?.length;
//     props.engine.repaintCanvas();
// }


const ButtonNodeWidget = (props: NodeWidgetProps) => {

    const dispatch = useDispatch();
    const engine = useContext(engineContext)
    const node = props.node;
    const buttonsList: any = engine.getModel().getNode(node.options.id).getOptions()?.buttons; 
      
        

    const generatePort = (port: any) => {
        return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
    };

    
   
    return (
        <>
            <div className='node'>
                <>
                    {_.map(props.node.getInPorts(), generatePort)}
                    <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>
                    {props.node.options.selected ?
                        <div className='actions'>
                            <FiSettings  width={25} onClick={() => {
                                dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                            }} />
                            
                        </div> :
                        <div>
                        </div>}
                        
                        <div  >
                        <h4 className="title">Button</h4>   
                            <div className="body">
                            
                                {props.node.options.question}
                            </div>
                        {
                        (props.node.getOutPorts()?.length === buttonsList?.length) && buttonsList?.map((x: any, index: number) => {
                            const ports = props.node.getOutPorts();
                            const port = ports[index];
                            port.getOptions().buttonsObj = x;
                            return <>
                            <hr/>
                            <div className='button' key={index}>                                
                                <div className="body" >{x.label}</div>
                                <CustomPortLabel key={index} engine={props.engine} port={port} />
                            </div>
                            </>
                        })}
                        </div>
                    </div>

                </>
            </div>
        </>
    )
}

export default ButtonNodeWidget