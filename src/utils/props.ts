import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export interface NodeWidgetProps{
    node: any;
	engine: DiagramEngine;
}


export interface formProps {
    nodeSelected: string,    
}

export enum UrlType{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE ="DELETE"
}
