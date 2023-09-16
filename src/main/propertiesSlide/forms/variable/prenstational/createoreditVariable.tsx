
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { useState, useContext} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {  Variable, VariableInterface } from '../../../../../store/main/mainSlice';
import { RootState } from '../../../../../store/store';
import { ActionTypes, addVariable, reset, setActionType, updateVariable } from '../../../../../store/variables/variables';
import { engineContext } from '../../../../Manager';
import { variableContext } from '../container/VariableForm';
import { v4 as uuidv4 } from 'uuid';
import '../VariableForm.css'

export const CreateOrEditVariable = () => {
const dispatch = useDispatch();
const engine : any= useContext(engineContext);
const nodeId = (useContext(variableContext)).nodeId;

const actionType : ActionTypes = useSelector((state : RootState) => state.variableSlice.actionType);
const actionData : VariableInterface  | undefined= useSelector((state : RootState) => state.variableSlice.actionData);

const [Variable, setVariable] = useState(actionData != undefined ? actionData.variable : '');
const [Value, setValue] = useState(actionData != undefined ? actionData.value : '');

const createVaraible = () => {
    const variablesNames = Variable.split(',');
    const valuesName = Value.split(',');            
            variablesNames.map((e : any,index : any) => {
                    const newvariable : VariableInterface = {
                        id : uuidv4(),
                        variable: variablesNames[index],
                        value: valuesName[index] == undefined ? '' : valuesName[index],
                        isWebHook : false
                    };
                    const variables = (engine.getModel().getNode(nodeId)).getOptions().variables;                        
                    const varia = [...variables,newvariable];
                   ( engine.getModel().getNode(nodeId)).getOptions().variables = varia
                     dispatch(addVariable(newvariable));
                });
            setVariable('');            
            setValue('');
            dispatch(reset());
            engine.repaintCanvas();
}
const editVariable = () => {
    const oldVariable : VariableInterface ={
                    id : actionData?.id,
                    variable : Variable,
                    value : Value,
                    isWebHook : false
                }
                const variables = (engine.getModel().getNode(nodeId)).getOptions().variables;
                const ind = (variables.findIndex((e : VariableInterface) => e.id == oldVariable.id ));  
                const varia = [...variables];          
                varia.splice(ind,1,oldVariable);
                (engine.getModel().getNode(nodeId)).getOptions().variables = varia;
                dispatch(updateVariable(oldVariable));
                setVariable('');
                setValue('');
                dispatch(reset());
                engine.repaintCanvas();
}
return(
<div className="variable-from">
<input className="form-input"  value={Variable} onChange={(e) => setVariable(e.target.value)} placeholder={'Variable name'} />
<input className="form-input"  value={Value} onChange={(e) => setValue(e.target.value)} placeholder={'Value'} />

<button onClick={() => {
    switch (actionType) {
        case ActionTypes.CREATE:        
            createVaraible();
            break;
        case ActionTypes.EDIT:
        editVariable();
        break;        
    }


}}> {actionType == ActionTypes.CREATE ? 'Add' : 'Update' }</button>
</div>);

}

