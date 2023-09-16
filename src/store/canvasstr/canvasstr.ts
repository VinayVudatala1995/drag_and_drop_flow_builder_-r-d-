
import { createSlice } from "@reduxjs/toolkit";

export enum ActionTypes {
    NONE, CREATE, EDIT
}

export interface MainState {
    actionType : ActionTypes,
    serializedata : any
    
}

const initialState  : MainState = {
    actionType : ActionTypes.NONE,
    serializedata : {}
}


const canvasStrSlice =  createSlice({
    name : 'canvasStrSlice',
    initialState,
    reducers : {
        setSerializeData : (state,action) => {
            state.serializedata = action?.payload
        },
        
     }
})


export const {setSerializeData} = canvasStrSlice.actions;
export default canvasStrSlice.reducer;