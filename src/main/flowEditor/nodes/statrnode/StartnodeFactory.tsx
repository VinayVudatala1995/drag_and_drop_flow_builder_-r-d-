
import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import { NodeType } from '../../../../store/main/mainSlice';

import { StartNodeModel } from './Startnodemodel';
import { Startnodewidget } from './StartNodeWidget';



export class StartNodeFactory extends AbstractReactFactory<StartNodeModel,DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<StartNodeModel>): JSX.Element {
        return  <Startnodewidget  engine={this.engine}  node = {event.model}/>;
    }
    generateModel(event: GenerateModelEvent): StartNodeModel {
        return new StartNodeModel();
        
    }

    constructor(){
        super(NodeType.START);
    }


}