import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import SelectNodeWidget from './SelectNodeWidget';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { NodeType } from '../../../../store/main/mainSlice';
import { SelectNodeModel } from './SelectNodeModel';



export class SelectNodeFactory extends AbstractReactFactory<SelectNodeModel, DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<SelectNodeModel>): JSX.Element {
        return <SelectNodeWidget engine={this.engine} node={event.model} />
    }
    generateModel(event: GenerateModelEvent): SelectNodeModel {
        return new SelectNodeModel();

    }

    constructor() {
        super(NodeType.SELECT);
    }


}