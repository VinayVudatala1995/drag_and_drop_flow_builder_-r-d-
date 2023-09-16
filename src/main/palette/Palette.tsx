import React , {useContext} from 'react';
import { useDispatch , } from 'react-redux';
import { NodeType } from '../../store/main/mainSlice';
import { setDraggerOptionType } from '../../store/nodeOptions/nodeOptionsSlice';
import './Palette.css';
import { engineContext } from "../Manager";
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';

export const Palette = () => {
    const dispatch = useDispatch();
    const engine : DiagramEngine = useContext(engineContext);

    // const addItem = (e: any, type: String) => {
    //     dispatch(setDraggerOptionType(type));
    // }

    const setDragItem = (type : NodeType) => {
        dispatch(setDraggerOptionType(type));
    }

    return (
        <>
            <div className="node-option-row">
                <div draggable className="node-option"
                    
                    onDragStart={(e) => setDragItem(NodeType.TEXT)}>
                    Text
                </div>
                <div draggable className="node-option"
                  
                  onDragStart={(e) => setDragItem(NodeType.IMAGE)}>Image
                </div>
                
            </div>
            <div className="node-option-row">
            <div draggable className="node-option"
                    onDragStart={(e) => setDragItem(NodeType.WEBHOOK)}
                   >
                    WebHook
                </div>
                <div draggable className="node-option"
                    
                    onDragStart={(e) => setDragItem(NodeType.BUTTON)}>
                    Button
                </div>
               
            </div>
            <div className="node-option-row">
            <div draggable className="node-option"
                    onDragStart={(e) => setDragItem(NodeType.SELECT)}
                   >
                  Select
                </div>
                <div draggable className="node-option"
                    onDragStart={(e) => setDragItem(NodeType.INPUT)}
                >
                    Input
                </div>
            </div>
            
        </>
    );
}