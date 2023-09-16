import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ActionTypes, setParamActionType } from "../../../../../../store/webhook/webhook";
import { QueryParams } from "./queryparams";
import { QueryParamForm } from "./queryparamsForm";


export const QueryParam = () => {
    const actionType = useSelector((state : RootState) => state.webhookSlice.paramActionType);
    const dispatch= useDispatch();

    const handleClick = () => {
        if(actionType != ActionTypes.NONE){
            dispatch(setParamActionType(ActionTypes.NONE));
        }
        else{
            
            dispatch(setParamActionType(ActionTypes.CREATE))
        }
    }

    return(
    <div className="queryParam">
    <hr/>
    <label>List of Params : </label>
    <br/>
    <QueryParams/>
    <br/>
    <button className="button" onClick={() => handleClick()}>{actionType != ActionTypes.NONE ? 'Cancel' : 'Add Param'}</button>
        {actionType != ActionTypes.NONE ? <QueryParamForm/> : <></>}
    </div>
    );
}