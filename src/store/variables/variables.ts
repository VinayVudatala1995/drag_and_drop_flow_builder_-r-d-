
import { createSlice } from "@reduxjs/toolkit";
import { VariableInterface } from "../main/mainSlice";

import { RootState } from "../store";

export enum ActionTypes {
    NONE, CREATE, EDIT
}

export interface MainState {
    actionType : ActionTypes,
    actionData : VariableInterface | undefined
    variables : VariableInterface[]
}

const initialState  : MainState = {
    actionType : ActionTypes.NONE,
    actionData : undefined,
    variables : []
}


const variableSlice =  createSlice({
    name : 'variableslice',
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
        addVariable : (state,action) => {
            state.variables.push (action?.payload);
        },
        updateVariable : (state,{payload}) => {
            const ind = state.variables.findIndex((e : VariableInterface) => e.id == payload.id );
            state.variables.splice(ind,1,payload);
        }
     }
})


export const {setActionType,setActionData,reset,addVariable,updateVariable} = variableSlice.actions;
export default variableSlice.reducer;