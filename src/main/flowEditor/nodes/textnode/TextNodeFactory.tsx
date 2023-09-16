import { BaseModel, BaseModelGenerics, GenerateModelEvent, GenerateWidgetEvent} from "@projectstorm/react-canvas-core";
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { TextNodeModel } from "./TextNodeModel";
import { TextNodeWidget } from "./TextNodeWidget";
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NodeType } from "../../../../store/main/mainSlice";





export class TextNodeFactory extends AbstractReactFactory<TextNodeModel,DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<TextNodeModel>): JSX.Element {
        return <TextNodeWidget  engine={this.engine} node={event.model}/> 
    }
    generateModel(event: GenerateModelEvent): TextNodeModel {
        return new TextNodeModel({});
    }  
   
    constructor() {
        super(NodeType.TEXT);
    }

    // generateModel(){
    //     return new TextNodeModel();
    // }
    
    // generateReactWidget(event) {
    //     // event.model is basically what's returned from generateModel()
    //     return <TextNodeWidget  engine={this.engine} node={event.model}/> 
    // }
   



    

}