import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState   = {
    draggingNodeType : '' 
}


const nodeOptionsSlice =  createSlice({
    name : 'nodeOptions',
    initialState,
    reducers : {
        setDraggerOptionType : (state,action) => {
            state.draggingNodeType = action?.payload
        },
     }
})


export const {setDraggerOptionType} = nodeOptionsSlice.actions;
export const NodeOptionsSelector = (state: RootState) => state.nodeOptions;
export default nodeOptionsSlice.reducer;