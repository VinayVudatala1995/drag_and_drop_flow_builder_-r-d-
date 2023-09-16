import { DiagramCanvas } from "./diagram_canvas";
import './flowEditor.css'
import {
    CanvasWidget,
} from '@projectstorm/react-canvas-core';
import { useSelector } from "react-redux";

import { engineContext } from "../Manager";

import { DefaultLinkModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { useContext, useState } from "react";

import { useDispatch } from "react-redux";

import { ImageNodeProps, NodePropsList, NodeType,  TextNodeProps } from "../../store/main/mainSlice";


import { store } from "../../store/store";
import { TextNodeModel } from "./nodes/textnode/TextNodeModel";
import { setDraggerOptionType } from "../../store/nodeOptions/nodeOptionsSlice";
import VariableNodeModel from "./nodes/variablenode/VariableNodeModel";
import { ImageNodeModel } from "./nodes/imagenode/imagenodemodel";
import { ButtonNodeModel } from "./nodes/buttonnode/ButtonNodeModel";
import { WebHookNodeModel } from "./nodes/webhook/WebHookNodeModel";
import { SelectNodeModel } from "./nodes/selectnode/SelectNodeModel";
import { InputNodeModel } from "./nodes/inputnode/InputNodeModel";
import CustomLink from "./link/links/link_widget";


export const FlowEditor = (props: any) => {
    const [update, forceUpdate] = useState(false);
    const dispatch = useDispatch();
    // const engine : DiagramEngine = props.engine;

    const engine = useContext(engineContext)

    const onNodeDrop = (e: any) => {
        const type = store.getState().nodeOptions.draggingNodeType;

        if (type != '') {
            switch (type) {
                case NodeType.TEXT: addTextNode(e);
                    break;
                case NodeType.IMAGE: addImageNode(e);
                    break;
                case NodeType.VARIABLE: addVariableNode(e);
                    break;
                case NodeType.BUTTON: addButtonNode(e);
                    break;
                case NodeType.WEBHOOK: addWebHookNode(e);
                    break;
                case NodeType.SELECT: addSelectNode(e);
                    break;
                case NodeType.INPUT: addInputNode(e);
                    break;
                default:
                    break;
            }
        }
    }

    

    const addTextNode = (e: any) => {

        const modal = engine.getModel();
        var node = new TextNodeModel({ title: 'Title', content: 'Enter Something' });
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        // node.registerListener({
        //     selectionChanged: (event: any) => {
        //         if (event.isSelected) {
        //             nodeSelection(event);
        //         }
        //     }
        // });
        modal.addNode(node);
        const textProps: TextNodeProps = {
            title: 'Hey Dude',
            content: 'Please enter something'
        }
        const nodeprop: NodePropsList = {
            nodeId: node.getID(),
            propeties: textProps
        }
        // dispatch(pushNodeId(node.getID()));
        // dispatch(pushNodes(modal.getNode(node.getID())));
        // dispatch(createnodeProps(nodeprop));
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);
    }
    const addVariableNode = (e: any) => {
        var node = new VariableNodeModel({title : 'title',value : '',variable : '' });
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        const model = engine.getModel();
        model.addNode(node);
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);

    }
    const addButtonNode = (e: any) => {
        var node = new ButtonNodeModel();
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        const model = engine.getModel();
        model.addNode(node);
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);

    }

    const addWebHookNode = (e: any) => {
        var node = new WebHookNodeModel();
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        const model = engine.getModel();
        model.addNode(node);
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);

    }
    const addSelectNode = (e: any) => {
        var node = new SelectNodeModel();
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        const model = engine.getModel();
        model.addNode(node);
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);
    }

    const addImageNode = (e: any) => {

        var node = new ImageNodeModel({ title: 'Title', content: 'Dummy url', url: 'https://picsum.photos/id/237/200/300' });
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        // node.registerListener(
        //     {
        //         selectionChanged: (event: any) => {
        //             if (event.isSelected) {
        //                     nodeSelection(event);
        //             }
        //         }    
        //     }
        // );
        const model = engine.getModel();
        model.addNode(node);

        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);
    }

    const addInputNode = (e: any) => {
        var node = new InputNodeModel();
        const point = engine.getRelativeMousePoint(e);
        node.setPosition(point);
        const model = engine.getModel();
        model.addNode(node);
        dispatch(setDraggerOptionType(''));
        forceUpdate(!update);
    }
    const handleDeleteLink = (link: DefaultLinkModel) => {
        engine.getModel()?.removeLink(link);
        engine?.repaintCanvas();
      };

    return (
        <div className="canvas" onDrop={(e) => onNodeDrop(e)} onDragOver={event => {
            event.preventDefault();
        }}>
            <DiagramCanvas>
                <CanvasWidget engine={engine}  />
            </DiagramCanvas>
        </div>
    );
}