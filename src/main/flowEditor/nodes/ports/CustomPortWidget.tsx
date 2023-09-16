import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { CustomPortModel } from './customportmodel';
import styled from '@emotion/styled';

export const generatePort = (port : any,props : any) => {
	return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
};

export interface CustomPortLabelProps {
	port: CustomPortModel;
	engine: DiagramEngine;
}

namespace S {
	export const PortLabel = styled.div`
		display: flex;
    flex-direction:column
		margin-top: 1px;
		align-items: center;
	`;

	export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

	export const Port = styled.div`
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 0.1);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`;


	

	// export const Port = styled.div`
    //     height: 20px;
    //     width: 20px;
    //     border: 3px solid #ffffff;
    //     background-color: #78889B;
    //     border-radius: 50%;
    //     display: inline-block;
    //     z-index: 10;
	// 	&:hover {
	// 		background: #718090;
	// 	}
	// `;
}

export class CustomPortLabel extends React.Component<CustomPortLabelProps> {
	render() {
		const port = (
			<PortWidget engine={this.props.engine} port={this.props.port}>
				<S.Port />
			</PortWidget>
		);
		const label = <S.Label>{this.props.port.getOptions().label}</S.Label>;

		return (
			<S.PortLabel>
				{this.props.port.getOptions().in ? port : label}
				{this.props.port.getOptions().in ? label : port}
			</S.PortLabel>
		);
	}
}
