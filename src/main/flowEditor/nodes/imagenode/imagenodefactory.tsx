
import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import { ImageNodeModel } from './imagenodemodel';
import { ImageNodeWidget } from './imagenodewidget';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import { NodeType } from '../../../../store/main/mainSlice';



export class ImageNodeFactory extends AbstractReactFactory<ImageNodeModel,DiagramEngine>{
    generateReactWidget(event: GenerateWidgetEvent<ImageNodeModel>): JSX.Element {
        return  <ImageNodeWidget  engine={this.engine}  node = {event.model}/>
    }
    generateModel(event: GenerateModelEvent): ImageNodeModel {
        return new ImageNodeModel({});
        
    }

    constructor(){
        super(NodeType.IMAGE);
    }


}