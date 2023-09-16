import React, { Component } from 'react';
import VariableNodeWidget from './VariableNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { BaseModel, BaseModelGenerics, GenerateModelEvent, GenerateWidgetEvent} from "@projectstorm/react-canvas-core";
import VariableNodeModel from './VariableNodeModel';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NodeType } from '../../../../store/main/mainSlice';




export class VariableNodeFactory extends AbstractReactFactory<VariableNodeModel,DiagramEngine> {
    
    generateReactWidget(event: GenerateWidgetEvent<VariableNodeModel>): JSX.Element {
        return <  VariableNodeWidget engine={this.engine} node={event.model}/> 
    }
    generateModel(event: GenerateModelEvent): VariableNodeModel {
        return new VariableNodeModel({});
    }  
    constructor(){
        super(NodeType.VARIABLE)
    }
}

export default VariableNodeFactory