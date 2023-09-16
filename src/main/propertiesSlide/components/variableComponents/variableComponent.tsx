import './varibleComponent.css';
import { useContext, useState } from "react";
import { NodeType, VariableInterface } from "../../../../store/main/mainSlice";
import { engineContext } from "../../../Manager";
import { v4 as uuidv4 } from 'uuid';

interface VariableComponentInterface {
    variable: any,
    callBackFun: Function,
}

export const VariableComponent = (props: VariableComponentInterface) => {
    const engine = useContext(engineContext);
    const [displayVariable, setDisplayVariables] = useState(false);
    const [add, setAddVariable] = useState(false);
    const startNode = engine.getModel().getNodes().find((e: any) => e.getOptions().type == NodeType.START);
    const variables = engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables;
    const [selectedVariabel, setSelectedVariable] = useState(props.variable != null ? props.variable : null);
    const [variable, setVariable] = useState('');

    const addVariable = () => {
        const newVariable: VariableInterface = {
            id: uuidv4(),
            variable: variable,
            value: '',
            isWebHook: false,
        }
        const variables = engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables;
        const newVaraibles = [...variables, newVariable];
        engine.getModel().getNode(startNode != undefined ? startNode?.getID() : '').getOptions().variables = newVaraibles;
        setVariable('');
        setAddVariable(!add);
    }

    return (
        <div className='variable'>
            <div className='button'>   <button onClick={() => setDisplayVariables(!displayVariable)}>{displayVariable ? 'Hide' : ' Variables'}</button></div>
            {
                displayVariable ?
                    <>
                        {variables.length > 0 ? variables.map((e: any, index: number) => {
                            return <div>
                                <button key={index} style={selectedVariabel?.id === e.id ? { border: '1px solid black', backgroundColor: '#ffffff' } : { border: '1px solid white', backgroundColor: '#ffffff' }} onClick={(event) => {
                                    setSelectedVariable(e);
                                    props.callBackFun(e);
                                }}> {e.variable}</button>
                            </div>
                        }) : <div> No Variables </div>}

                        <div>
                            <button onClick={() => setAddVariable(!add)}>{add ? 'Cancel' : 'Add Variable'}</button>
                            {add ?
                                <>
                                    <input value={variable} onChange={(e) => setVariable(e.target.value)} placeholder='Please enter Variable Name' />
                                    <button onClick={() => addVariable()}>Add</button>
                                </>
                                : <></>}
                        </div>
                    </>


                    : <></>
            }

        </div>
    );
}