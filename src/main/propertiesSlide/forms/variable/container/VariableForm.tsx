
import { DiagramEngine } from '@projectstorm/react-diagrams';
import React,{ createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

import { VariableInterface } from '../../../../../store/main/mainSlice';
import { RootState } from '../../../../../store/store';
import { engineContext } from '../../../../Manager';
import { VariableManager } from '../prenstational/variableManager';


interface VariableFormProps{
    variables : VariableInterface[],
    saveForm : any,
    nodeId : string
}
const defaultfrom : VariableFormProps = {
    variables : [],
    saveForm : undefined,
    nodeId : ''
}
export const variableContext = createContext(defaultfrom);
export const VariableForm = (props : VariableFormProps ) =>{
    
    
    return(
        <variableContext.Provider  value = {props}>
        <VariableManager/>
        </variableContext.Provider>
    );
}

