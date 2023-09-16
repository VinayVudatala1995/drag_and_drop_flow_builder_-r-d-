import React from 'react';

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { useDispatch } from 'react-redux';
import './VariableNodeWidget.css';
import { FiSettings } from "react-icons/fi";
import { setForm, ActionTypes} from '../../../../store/main/mainSlice';

export interface VariableNodeProps {
    engine: DiagramEngine,
    node: any

}

const VariableNodeWidget = (props: VariableNodeProps) => {
    const node : any = props.node;
    const dispatch = useDispatch();    

    return (
        
         
            <div className='node'>            
            <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>
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
                <h4 className="title"> Set Variable</h4>
                {/* <div className="body" dangerouslySetInnerHTML={{ __html: node.options.content }}>
              
                </div> */}           
            </div>           
</div>
        
    )
}

export default VariableNodeWidget

