import React from "react";
import {NodeType} from '../store/main/mainSlice'

export const SlideForm = (props) => {
    let title = '';
    let body = '';
    const node = props.formdata.node;

    switch (props.formdata.type) {
        case NodeType.TEXT:
            return (
                <div className="form">
                    <div className="form-row">
                        <label className='form-row-label'> Tilte:</label>
                        <input onChange={(e) => {
                            title = e.target.value;

                        }} className='form-row-input' placeholder="Enter Title" />
                    </div>
                    <div className="form-row">
                        <label className='form-row-label'> Body:</label>
                        <input onChange={(e) => {
                            body = e.target.value;
                        }} className='form-row-input' placeholder="Enter Body" />
                    </div>
                    <button className="form-save" onClick={(e) => {
                        props.saveForm(node, title, body);
                    }}>Save</button>
                </div>);
        case NodeType.IMAGE:    
        return (
            <div className="form">
                <div className="form-row">
                    <label className='form-row-label'> Tilte:</label>
                    <input onChange={(e) => {
                        title = e.target.value;

                    }} className='form-row-input' placeholder="Enter Title" />
                </div>
                <div className="form-row">
                    <label className='form-row-label'> Url:</label>
                    <input onChange={(e) => {
                        body = e.target.value;
                    }} className='form-row-input' placeholder="Enter Body" />
                </div>
                <button className="form-save" onClick={(e) => {
                    props.saveForm(node,props.formdata, title, body);
                }}>Save</button>
            </div>);
        default:
            break;
    }


}