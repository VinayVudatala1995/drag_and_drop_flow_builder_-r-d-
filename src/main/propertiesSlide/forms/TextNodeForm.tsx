
import React, { createRef, useContext, useRef, useState } from "react";
import "./TextNodeForm.css";
import { NodeType, resetForm, selectedNode, TextNodeProps, VariableInterface } from "../../../store/main/mainSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { engineContext } from "../../Manager";
import { getContent } from "../../../htmlreplacement";
import insertTextAtCursor from "insert-text-at-cursor";
import { VariableComponent } from "../components/variableComponents/variableComponent";
import { MultiSelectVariableComponent } from "../components/variableComponents/multiSelectVariableComponent";
import { formProps } from "../../../utils/props";



export const TextForm = (props: formProps) => {
    const dispatch = useDispatch();
    const quillRef: any = createRef();
    const engine: any = useContext(engineContext);
    const selectedNode = engine.getModel().getNode(props.nodeSelected);
    const startNode = engine.getModel().getNodes().find((e: any) => e.getOptions().type == NodeType.START);
    const variables = engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables;
    const newContent = getContent(selectedNode.getOptions().content, variables);
    const [title, setTitle] = useState(selectedNode.getOptions().title) as any;
    const [content, setContent] = useState(newContent) as any;

    const setVariable = (variable: string) => {
        insertTextAtCursor(quillRef.current, ` #${variable}#`);
    }

    const onSave = () => {
        console.log('onSave');
        let newContent = content;
        variables.map((e: VariableInterface) => {
            let result = newContent.replace(`#${e.variable}`, `#${e.id}`);
            newContent = result;
        });

        (engine.getModel().getNode(props.nodeSelected)).getOptions().selected = false;
        (engine.getModel().getNode(props.nodeSelected)).getOptions().title = title;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().content = newContent;
        dispatch(resetForm());
        engine.repaintCanvas();
    }

    return (
        <div className="form">
            <div className="form-row">
                <label className="label">Title: </label>
                <input name="title" onChange={(e) => setTitle(e.target.value)} placeholder={'title'} />
            </div>

            <div className="form-row">
                <label>Body:</label>
                <ReactQuill
                    value={content}
                    ref={quillRef}
                    onChange={e => {
                        setContent(e)
                    }}
                    modules={TextForm.modules}
                    formats={TextForm.formats} />
                {/* <input name="body" onChange={(e) => setContent(e.target.value)} placeholder={'content'} /> */}
            </div>
            <br /><br />
            <MultiSelectVariableComponent callBackFun={setVariable} />

            <button className="form-save" onClick={() => onSave()} >Save</button>
        </div>);
}

TextForm.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        ['link'],
        // [{ 'color': ['#000333'] }, { 'background': [] }],          // dropdown with defaults from theme

    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

TextForm.formats = [
    // "header",
    // "font",
    // "size",
    "bold",
    "italic",
    "underline",
    // "strike",
    "blockquote",
    // "list",
    // "bullet",
    // "indent",
    // "link",
    // "image",
    "color"
];

// TextForm.modules = {
//     toolbar: [
//         [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//         [{ size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' },
//         { 'indent': '-1' }, { 'indent': '+1' }],
//         ['link', 'image', 'video'],
//         ['clean']
//     ],
//     clipboard: {
//         // toggle to add extra line breaks when pasting HTML:
//         matchVisual: false,
//     }
// }