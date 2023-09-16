import * as React from 'react';
import * as _ from 'lodash';
import './TextNodeWidget.css'
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { TextNodeModel, TextNodeModelOptions } from './TextNodeModel';
import { CustomPortLabel } from '../ports/CustomPortWidget';
import { FiSettings } from "react-icons/fi";
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { ActionTypes, NodeType, setForm } from '../../../../store/main/mainSlice';
import { NodeWidgetProps } from '../../../../utils/props';
import { getContent } from '../../../../htmlreplacement';
import { engineContext } from '../../../Manager';



export const TextNodeWidget =  (props : NodeWidgetProps) => {
    const engine = React.useContext(engineContext);
    const dispatch = useDispatch();
    const startNode = engine.getModel().getNodes().find((e : any) => e.getOptions().type == NodeType.START);
    const variables = engine.getModel().getNode( startNode != undefined ?  startNode?.getID() : '').getOptions().variables;
    const content = props.node.getOptions().content;
	const newConten = getContent(content,variables);
    const generatePort = (port : any) => {
		return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
	};    
		return (
                    <div className='node'>
            {_.map(props.node.getInPorts(), generatePort)}
            <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>
            
            <div>
                    {props.node.options.selected ?
                        <div className='actions'>
                            <FiSettings height={25} width={25} onClick={() => {
                               dispatch(setForm({actionType : ActionTypes.EDIT , nodeId : props.node.getID()}))
                            }} />
                            
                        </div> :
                        <div >
                        </div>}
                </div>
                <h4 className="title">{props.node.options.title}</h4>
                <div className="body">
                { parse(newConten) }
                </div>              

            </div>
            {_.map(props.node.getOutPorts(), generatePort)}

        </div>
            
			// <S.Node
			// 	data-default-node-name={this.props.node.getOptions().name}
			// 	selected={this.props.node.isSelected()}
			// 	background={'#000000'}
			// >
			// 	<S.Title>
			// 		<S.TitleName>{this.props.node.getOptions().name}</S.TitleName>
			// 	</S.Title>
			// 	<S.Ports>
			// 		<S.PortsContainer>{_.map(this.props.node.getInPorts(), this.generatePort)}</S.PortsContainer>
			// 		<S.PortsContainer>{_.map(this.props.node.getOutPorts(), this.generatePort)}</S.PortsContainer>
			// 	</S.Ports>
			// </S.Node>
		);
	}



