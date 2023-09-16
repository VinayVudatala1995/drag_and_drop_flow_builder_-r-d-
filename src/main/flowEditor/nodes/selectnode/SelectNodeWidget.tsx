import * as _ from 'lodash';
import { DiagramEngine } from '@projectstorm/react-diagrams'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiSettings } from "react-icons/fi";
import { ActionTypes,  setForm } from "../../../../store/main/mainSlice";
import { engineContext } from '../../../Manager';
import { CustomPortLabel } from '../ports/CustomPortWidget';


export interface SelectNodeProps {
    engine: DiagramEngine,
    node: any
}
const SelectNodeWidget = (props: SelectNodeProps) => {
    const engine = useContext(engineContext)
    const node = props.node;
    const dispatch = useDispatch();    
    const variable = node.getOptions().variable;
    const items = node.getOptions().items;
    const title = node.getOptions().title;
    const isMulti = node.getOptions().isMulti;
   

    const generatePort = (port : any) => {
		return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
	};


    return (
        <div className='node'>
            {_.map(props.node.getInPorts(), generatePort)}
            <div className='content' style={props.node.getOptions().selected ? { border: '1px solid black', } : { border: '1px solid white' }}>
                {props.node.getOptions().selected &&
                    <div className='actions'>
                        {/* <div>Select Node</div> */}
                        <FiSettings height={50} width={50} onClick={() => {
                             dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                        }} />
                    </div>
                }
                {/* <h4 className="title">{node.options.title}</h4> */}
                <h4 className="title">{title}</h4>

                <div className="body">
                    <h1>{variable && variable.name}</h1>
                    <h1>{isMulti && isMulti ? 'Multi' : 'Single'}</h1>
                    {items && items?.map((x: any, index: number) => <button  key={index}>{x.variable}</button>)}
                </div>
            </div>
            {_.map(props.node.getOutPorts(), generatePort)}
        </div>
    )
}

export default SelectNodeWidget