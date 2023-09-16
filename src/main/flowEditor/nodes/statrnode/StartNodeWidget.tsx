import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import React from "react";
import * as _ from 'lodash';
import './StartNodeWidget.css'
import { CustomPortLabel, generatePort } from "../ports/CustomPortWidget";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { ActionTypes, setForm } from "../../../../store/main/mainSlice";
import { NodeWidgetProps } from "../../../../utils/props";

export const Startnodewidget = (props : NodeWidgetProps) => {
    const dispatch = useDispatch();

    const generatePort = (port : any) => {
		return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
	};

    return(
        <div className="node">
            
            <div className="content" style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>
            <div>
            {props.node.options.selected ?
                        <div className='actions'>
                            <FiSettings height={25} width={25} onClick={() => {
                                 dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                            }} />
                            {/* <AiFillDelete height={25} width={25}/> */}
                        </div> :
                        <div >
                        </div>}
            </div>
            <h4 className="title">Start</h4>
            <div className="body">
                    <p>Start</p>
            </div>
            </div>
            {_.map(props.node.getOutPorts(), generatePort)}
         
            
        </div>
    );
}