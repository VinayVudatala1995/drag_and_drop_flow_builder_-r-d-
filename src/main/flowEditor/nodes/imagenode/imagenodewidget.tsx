import './imagenodewidget.css';
import * as _ from 'lodash';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import { useDispatch, useSelector } from 'react-redux';
import { FiSettings } from "react-icons/fi";
import { ActionTypes,  NodeType,  setForm } from '../../../../store/main/mainSlice';
import { CustomPortLabel } from '../ports/CustomPortWidget';
import { NodeWidgetProps } from '../../../../utils/props';
import { getContent } from '../../../../htmlreplacement';
import { useContext } from 'react';
import { engineContext } from '../../../Manager';


export const ImageNodeWidget = (props: NodeWidgetProps) => {
    const engine = useContext(engineContext);
    const node = props.node;
    const dispatch = useDispatch();    
    const startNode = engine.getModel().getNodes().find((e : any) => e.getOptions().type == NodeType.START);
    const variables = engine.getModel().getNode( startNode != undefined ?  startNode?.getID() : '').getOptions().variables;
    const content = props.node.getOptions().content;
    const newContent = getContent(content,variables);
    const generatePort = (port : any) => {
		return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
	};  
    return (
        <div className='node'>
            <div className='portsContainer'>{_.map(props.node.getInPorts(), generatePort)}</div>           
            <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>
            {props.node.options.selected ?
                        <div className='actions'>
                            <FiSettings height={25} width={25} onClick={() => {
                           dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                            }} />
                            {/* <AiFillDelete height={25} width={25}/> */}
                        </div> :
                        <div >
                        </div>}
                <h4 className="title">{node.options.title}</h4>
               
                <div className="body">
                <div>{newContent}</div>
                <img  src={node.options.url}      alt="car"/>
                </div>

                <div>
                   
                </div>

            </div>
            <div className='portsContainer'>{_.map(props.node.getOutPorts(), generatePort)}</div>           

        </div>
        


    );
}


// <>{
//             <div className={props.node.options.selected ? 'image-node-selected' : 'image-node-unselected'}>
//                 {props.node.options.selected &&
//                     <div>
//                         {/* <button className='' onClick={() => dispatch(setDraggerOptionType(NodeType.IMAGE))} >Settings</button> */}
//                         <button className='' onClick={() => {
//                             dispatch(setActionType('edit'))
//                             dispatch(selectNode(props.node))
//                         }} >Settings</button>
//                         <button className=''>Delete</button>
//                     </div>}
//                 <div className='header'>
//                     <h6>{props.node.options.selected ? node.options.title : props.node.options.title}</h6>
//                 </div>
//                 <div className='body'>
//                     <div>
//                         <div>{node.options.content}</div>
//                         
//                     </div>
//                 </div>
//             </div>
//             // :
//             // <div className='image-node-unselected'>
//             //   <div className='header'>
//             //     <h6>{props.node.options.title}</h6>
//             //   </div>
//             //   <div className='body'>
//             //     <div>
//             //       <div>{widgetProp?.propeties.content}</div>
//             //       <img
//             //         src={widgetProp?.propeties.url}
//             //         alt="car"
//             //       />
//             //     </div>
//             //   </div>
//             // </div>
//         } </>