
import { createSlice, current } from "@reduxjs/toolkit";
import { stat } from "fs";
import { VariableInterface } from "../main/mainSlice";

import { RootState } from "../store";

export enum ActionTypes {
    NONE, CREATE, EDIT
}

export interface ButtonInterface{
    id : string,
    value : string,
    label : string
}

export interface MainState {
    actionType : ActionTypes,
    actionData : ButtonInterface | undefined,
    question : string,
    buttons : ButtonInterface[]
}

const initialState  : MainState = {
    actionType : ActionTypes.NONE,
    actionData : undefined,
    question : '',
    buttons : []
}


const buttonSlice =  createSlice({
    name : 'buttonSlice',
    initialState,
    reducers : {
        setActionType : (state,action) => {
            state.actionType = action?.payload
        },
        setActionData : (state,action) =>{
            state.actionType =action?.payload.actionType;
            state.actionData =action?.payload.actionData;
        },
        reset : (state) => {
            state.actionType = ActionTypes.NONE;
            state.actionData = undefined;            
        },
        setQuestion : (state,{payload}) => {
            
            state.question = payload;
        },
        setButtonData : (state,{payload}) => {
            state.question = payload.question;
            state.buttons = payload.buttons;
        },
        addButton : (state,action) => {
            state.buttons.push(action?.payload);
            
        },
        updateButton : (state,{payload}) => {
            const ind = state.buttons.findIndex((e : ButtonInterface) => e.id == payload.id );
            state.buttons.splice(ind,1,payload);
        },
        resetButtonForm : (state) => {
            state.actionType = ActionTypes.NONE;
            state.actionData = undefined;  
            state.question = '';
            state.buttons = [];
        }
     }
})


export const {setActionType,setActionData,reset,addButton,updateButton,setButtonData,setQuestion,resetButtonForm} = buttonSlice.actions;
export default buttonSlice.reducer;