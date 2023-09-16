import { DiagramEngine } from '@projectstorm/react-diagrams'
import React, { useContext } from 'react'
import * as _ from 'lodash';
import { engineContext } from '../../../Manager';
import { FiSettings } from "react-icons/fi";
import { CustomPortLabel } from '../ports/CustomPortWidget';
import { useDispatch } from 'react-redux';
import { ActionTypes, setForm } from "../../../../store/main/mainSlice";


export interface InputNodeProps {
    engine: DiagramEngine,
    node: any

}
const InputNodeWidget = (props: InputNodeProps) => {

    const engine = useContext(engineContext);
    const node = props.node
    const dispatch = useDispatch();
    const variable = engine.getModel().getNode(node?.getID()).getOptions().variable;
    const question = engine.getModel().getNode(node?.getID()).getOptions().question;
    const replyType = engine.getModel().getNode(node?.getID()).getOptions().replyType;
    const alertData = engine.getModel().getNode(node?.getID()).getOptions().alertData;
    const generatePort = (port: any) => {
        return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
    };

    return (
        <div className='node'>
            {_.map(props.node.getInPorts(), generatePort)}
            <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white' }}>
                {props.node.options.selected &&
                    <div className='actions'>
                        <FiSettings height={50} width={50} onClick={() => {
                            
                            dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                        }} />
                    </div>
                }
                <h4 className="title">{node.getOptions().title != null ? node.getOptions().titl : 'Input Node'}</h4>
                {question && <p>Question: {question}</p>}
                {replyType && <p> Reply Type: {replyType}</p>}
                {variable && <p>Variable: {variable.variable}</p>}
                {alertData?.checkBox && <p>Retry Enabled: {alertData?.checkBox ? 'true' : 'false'}</p>}
                {alertData?.retryCount && <p>Retry Count: {alertData?.retryCount}</p>}
                {alertData?.alert && <p>Alert message: {alertData?.alert}</p>}
            </div>
            <div className='ports-out'>
                {_.map(props.node.getOutPorts(), generatePort)}
            </div>
        </div>
    )
}

export default InputNodeWidget