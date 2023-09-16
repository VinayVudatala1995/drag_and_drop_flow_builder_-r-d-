import { DiagramEngine } from "@projectstorm/react-diagrams";
import { stat } from "fs";
import React , {useContext} from "react"
import { useSelector } from "react-redux";
import { VariableInterface } from "../../../../../store/main/mainSlice";
import { RootState } from "../../../../../store/store";
import { ActionTypes } from "../../../../../store/variables/variables";
import { engineContext } from "../../../../Manager";
import { variableContext } from "../container/VariableForm";
import { Variable } from "./variable";

export const Variables =() => {
    const variable : VariableInterface[] = useSelector((state : RootState) => state.variableSlice.variables);
    const engine  = useContext(engineContext);
    const nodeId  = (useContext(variableContext)).nodeId;
    const variables = engine.getModel().getNode(nodeId).getOptions().variables;
   
    return(        
        <div>{variables.length > 0 ?
            variables.map((element : VariableInterface  ) => {
            return <Variable key={element.id}  variable={element}/> 
        })
        : <>No Variables</>}

        </div>
    );
}