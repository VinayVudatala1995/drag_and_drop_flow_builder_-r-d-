import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import InputNodeWidget from './InputNodeWidget';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { NodeType } from '../../../../store/main/mainSlice';
import { InputNodeModel } from './InputNodeModel';



export class InputNodeFactory extends AbstractReactFactory<InputNodeModel, DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<InputNodeModel>): JSX.Element {
        return <InputNodeWidget engine={this.engine} node={event.model} />
    }
    generateModel(event: GenerateModelEvent): InputNodeModel {
        return new InputNodeModel();

    }

    constructor() {
        super(NodeType.INPUT);
    }


}