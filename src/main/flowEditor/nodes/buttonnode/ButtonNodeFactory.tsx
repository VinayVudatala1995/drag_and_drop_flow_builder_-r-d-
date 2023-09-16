import React, { Component } from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { BaseModel, BaseModelGenerics, GenerateModelEvent, GenerateWidgetEvent} from "@projectstorm/react-canvas-core";
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

import ButtonNodeWidget from './ButtonNodeWidget';

import { NodeType } from '../../../../store/main/mainSlice';
import { ButtonNodeModel } from './ButtonNodeModel';



export class ButtonNodeFactory extends AbstractReactFactory<ButtonNodeModel,DiagramEngine> {
    
    generateReactWidget(event: GenerateWidgetEvent<ButtonNodeModel>): JSX.Element {
        return <  ButtonNodeWidget engine={this.engine} node={event.model}/> 
    }
    generateModel(event: GenerateModelEvent): ButtonNodeModel {
        return new ButtonNodeModel();
    }  
    constructor(){
        super(NodeType.BUTTON)
    }
}

export default ButtonNodeFactory