import insertTextAtCursor from "insert-text-at-cursor";
import React, { createRef, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContent } from "../../../htmlreplacement";
import {  ImageNodeProps, NodeType, resetForm, VariableInterface } from "../../../store/main/mainSlice";
import { formProps } from "../../../utils/props";
import { engineContext } from "../../Manager";
import { MultiSelectVariableComponent } from "../components/variableComponents/multiSelectVariableComponent";
import { VariableComponent } from "../components/variableComponents/variableComponent";





export const ImageForm = (props: formProps) => {
    const dispatch = useDispatch();
    const engine: any = useContext(engineContext);
    const selectedNode = engine.getModel().getNode(props.nodeSelected);
    const startNode = engine.getModel().getNodes().find((e: any) => e.getOptions().type == NodeType.START);
    const variables = engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables;
    const inputRef: any = createRef();
    const newContent = getContent(selectedNode.getOptions().content, variables);
    const [title, setTitle] = useState(selectedNode.getOptions().title) as any;
    const [content, setContent] = useState(newContent) as any;
    const [url, setUrl] = useState(selectedNode.getOptions().url) as any;
    
    

    const onSave = () => {
        let newContent = content;
        variables.map((e: VariableInterface) => {
            let result = newContent.replace(`#${e.variable}`, `#${e.id}`);
            newContent = result;
        });             

        (engine.getModel().getNode(props.nodeSelected)).getOptions().selected = false;
        (engine.getModel().getNode(props.nodeSelected)).getOptions().title = title;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().content = newContent;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().url = url;
        dispatch(resetForm());
        engine.repaintCanvas();      
}


    const hanldeVariable = (variable : string) => {
        insertTextAtCursor(inputRef.current, ` #${variable}#`);
    }

    
    return (
        <div className="form">      

            <div className="form-row">
                <label className="label">Title: </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Enter Title'} />
            </div>
            <div className="form-row">
                <label className="label">body: </label>
                <input ref={inputRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder={'Enter Title'} />
            </div>

            <div className="form-row">
                <label>url:</label>
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={'Enter Title'} />
            </div>
            <MultiSelectVariableComponent  callBackFun={hanldeVariable}/> 
            <button className="form-save" onClick={(e) => { onSave() }} >Save</button>
        </div>);
}