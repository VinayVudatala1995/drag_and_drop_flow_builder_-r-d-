import '../../webhookForm.css'
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ActionTypes, ResponseKeyInterface, setVariable } from '../../../../../../store/webhook/webhook';
import { useContext, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { engineContext } from '../../../../../Manager';
import { NodeType, VariableInterface } from '../../../../../../store/main/mainSlice';
import { useDispatch } from 'react-redux';

export const ResponseKeysManager = () => {
    const engine = useContext(engineContext);
    const responseKeys : ResponseKeyInterface[] = useSelector((state : RootState) => state.webhookSlice.responseKeys);
    const startNode = engine.getModel().getNodes().find((e: any) => e.getOptions().type == NodeType.START);
    const variables :VariableInterface[] = engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables;
    const [selectedVariabel, setSelectedVariable] = useState( null);
    const [value,setValue] =useState(null);
    const [actionTypes,setActionTypes] = useState(ActionTypes.NONE);
    const dispatch = useDispatch();



    const handleSet = () => {
       
        const newObj  : VariableInterface = {
            ...selectedVariabel,
            isWebHook : true,
            value : value.label
        }
        let indexof = variables.findIndex((e : VariableInterface) => e.id == selectedVariabel.id );
        variables.splice(indexof,1,newObj);
        engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables = [...variables];
    dispatch(setVariable(newObj));
        
    }

    return(       
       <>
       {responseKeys.length > 0 ? <div>
        <br/>
        <button className="button" onClick={() => {setActionTypes(ActionTypes.CREATE)}}>Set Variable</button>
        <br/>
        {
            actionTypes != ActionTypes.NONE ?
            <div>
                <CreatableSelect className="webhook-select" value={value} isClearable options={responseKeys}  onChange={(e : any) => setValue(e)}/>
               <br/>
                {variables.map((e: any, index: number) => {
                            return <div key={index}>
                                <button  style={selectedVariabel?.id === e.id ? { border: '1px solid black', backgroundColor: '#ffffff' } : { border: '1px solid white', backgroundColor: '#ffffff' }} onClick={(event) => {
                                    setSelectedVariable(e);
                                }}> {e.variable}</button>
                            </div>
                        })
                    }
                <br/>
                <button className="button" onClick={() => handleSet()}>'Set' </button>
            </div>
            : <></>
        }
         </div> : <></>}
       </>
    );
}