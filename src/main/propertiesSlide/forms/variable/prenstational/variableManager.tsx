import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import  { ActionTypes, reset, setActionType } from "../../../../../store/variables/variables";
import { CreateOrEditVariable } from "./createoreditVariable";
import { Variables } from "./variables";
import '../VariableForm.css';
import { useDispatch } from "react-redux";
import { resetForm } from "../../../../../store/main/mainSlice";


export const VariableManager = () =>{
    const actionType : ActionTypes = useSelector((state : RootState) => state.variableSlice.actionType);
    const dispatch = useDispatch();

    const handleActionTypes =() =>{    
           
            if(actionType == ActionTypes.NONE){
                dispatch(setActionType(ActionTypes.CREATE));
            }
        else{
            dispatch(reset());            
        }
    }

    return(
        <div>
           <Variables/>
           <hr/>
           <button className="createVariableButton" onClick={() => handleActionTypes()}>{actionType == ActionTypes.NONE ?'Create Variable' : 'Cancel' }</button>
           {actionType == ActionTypes.NONE ?  <div></div> : <CreateOrEditVariable /> }
            <hr/>
            <button  onClick={() => dispatch(resetForm())}>Save</button>
        </div>
    );
}
