import { BaseModel, BaseModelGenerics, GenerateModelEvent, GenerateWidgetEvent} from "@projectstorm/react-canvas-core";
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NodeType } from "../../../../store/main/mainSlice";
import { WebHookNodeModel } from "./WebHookNodeModel";
import { WebHookWidget } from "./WebHookNodeWidget";





export class WebHookNodeFactory extends AbstractReactFactory<WebHookNodeModel,DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<WebHookNodeModel>): JSX.Element {
        return <WebHookWidget  engine={this.engine} node={event.model}/> 
    }
    generateModel(event: GenerateModelEvent): WebHookNodeModel {
        return new WebHookNodeModel();
    }  
   
    constructor() {
        super(NodeType.WEBHOOK);
    }

 
}