
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import update from 'immutability-helper';
import { createSlice, current } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
import { ImageNodeModel } from "../../main/flowEditor/nodes/imagenode/imagenodemodel";
import { TextNodeModel } from "../../main/flowEditor/nodes/textnode/TextNodeModel";
export interface MainState {
    nodeId: string,
    actionType: ActionTypes,  
    
}

export interface selectedNode {
    nodeId: String,
    type: String,
    nodeProperties: any
}

export interface NodePropsList {
    nodeId: String,
    propeties: any
}

export interface NodesList {
    node: ImageNodeModel | TextNodeModel | DefaultNodeModel
}

export interface NodeList {
    nodeId: String,
}

export interface TextNodeProps {
    title: String,
    content: String,

}
export interface VariableProps {
    variable: string,
    value: string
}

export interface ImageNodeProps {
    title: String,
    url: String,
    content: String
}

export interface Variable{
    variableName : String,
    variableValue : String
}

// export interface ButtonProps {

// }
export enum NodeType {
    START = 'Start',
    TEXT = 'Text',
    IMAGE = 'Image',
    VARIABLE = 'Variable',
    BUTTON = 'Button',
    WEBHOOK = 'Webhook',
    SELECT = 'Select',
    INPUT = 'Input'
}
export enum ActionTypes {
    NONE,  EDIT
}

export interface VariableInterface {
    id : any,
    variable : string,
    value : string,
    isWebHook : boolean

}

const initialState: MainState = {    
    nodeId: '',
    actionType: ActionTypes.NONE,
}


const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        
        setForm : (state ,{payload}) => {
            state.actionType = payload.actionType;            
            state.nodeId = payload.nodeId;
        },
        resetForm : (state ) => {
            state.actionType = ActionTypes.NONE;
            state.nodeId = '';
        }       
      
                    
    }
})


export const { setForm,resetForm} = mainSlice.actions;
export default mainSlice.reducer;
