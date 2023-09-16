import React , {useContext} from 'react'
import { useSelector } from "react-redux";
import {  VariableInterface } from "../../../../../store/main/mainSlice";
import { RootState } from "../../../../../store/store";
import { GoPencil } from "react-icons/go";

import {MdDelete} from "react-icons/md";
import '../VariableForm.css'
import { useDispatch } from "react-redux";
import { ActionTypes, setActionData } from "../../../../../store/variables/variables";
import { variableContext } from '../container/VariableForm';
import { engineContext } from '../../../../Manager';

 interface VariableProps{
    variable : VariableInterface
}

export const Variable =(props : VariableProps) => {
    const dispatch = useDispatch();
    const engine  = useContext(engineContext);
    const nodeId  = (useContext(variableContext)).nodeId;
    const variables = engine.getModel().getNode(nodeId).getOptions().variables;
    const variable : VariableInterface | undefined= variables.find((e : VariableInterface) => e.id == props.variable.id );

    return(
        
        <div>{variable != undefined ?
         <div  className="form-variable" >
                        <div className="variable-name">{variable?.variable}</div>
                     {!variable.isWebHook ?    <div className="variable-actions">
                            <GoPencil className="edit" onClick={() => dispatch(setActionData({actionType : ActionTypes.EDIT,actionData : variable})) } />
                            <MdDelete className="delete" />
                        </div> : 
                        <></>}
                    </div> 
                : <>No Variables</>}

        </div>
    );
}