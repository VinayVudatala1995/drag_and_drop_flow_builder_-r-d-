import React, { useContext, useEffect, useState } from 'react'
import { engineContext } from '../../Manager';
import './TextNodeForm.css';
import { v4 as uuidv4 } from 'uuid';
// import Switch from "react-switch";
import { useSelector } from 'react-redux';
import { NodeType, resetForm, VariableInterface } from '../../../store/main/mainSlice';
import { VariableComponent } from '../components/variableComponents/variableComponent';
import { useDispatch } from 'react-redux';
interface InputFormProps {
    nodeId: string
}

const InputNodeForm = (props: InputFormProps) => {
const dispatch = useDispatch();
    const engine = useContext(engineContext);
    const node = engine.getModel().getNode(props.nodeId);
    const [replyType, setType] = useState('');    
    const [variable, setVariable] = useState(node.getOptions().variable ?node.getOptions().variable : null);
    const [title, setTitle] = useState(node.getOptions().title != null?node.getOptions().title  : '' );
    const [question, setQuestion] = useState(node.getOptions().question != null?node.getOptions().question  : '');
    const [alertData, setAlertdata] = useState( node.getOptions().alertData != null ?node.getOptions().alertData : { checkBox: false, retryCount: '', alert: '' })
    // const selectednode = engine.getModel().getNode(props.nodeId);

  

    
    

    const saveToNode = () => {
        
        // variable? : any;
        
        
        
        engine.getModel().getNode(props.nodeId).getOptions().title = title;
        engine.getModel().getNode(props.nodeId).getOptions().replyType = replyType;
        engine.getModel().getNode(props.nodeId).getOptions().variable = variable;
        engine.getModel().getNode(props.nodeId).getOptions().question = question;
        engine.getModel().getNode(props.nodeId).getOptions().alertData = alertData;
        dispatch(resetForm());
        engine.repaintCanvas()
    }
   

    const handleCheckBox = () => {
        setAlertdata({ ...alertData, checkBox: !alertData.checkBox, retryCount: '', alert: '' })
    }
    const handleVariable = (variable: VariableInterface) => {
        setVariable(  variable);
    }


    
    return (
        <>
            <br />
            <div>
                <input type='text' name='Title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <textarea  name='Question' placeholder='Question' className='text-area' value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <hr />
            <div>
                <label>Reply Type: </label>
                <select name="Reply type" value={replyType} onChange={(e) => { setType(e.target.value) }}>
                    {/* <option>* Select Option *</option> */}
                    <option value='Name'>Text</option>
                    <option value='PhoneNumber'>Phone Number</option>
                    <option value='E-Mail'>E-Mail</option>
                    <option value='Date'>Date</option>
                </select>
            </div>
            <div>
                <input type='checkBox' checked={alertData.checkBox} onChange={() => handleCheckBox()}></input><label>Enable Retry</label>
                {alertData.checkBox && <><div>
                    <label>Retry count:</label>
                    <input type='text' name='retry-count' placeholder='RetryCount' value={alertData.retryCount} onChange={(e) => setAlertdata({ ...alertData, retryCount: e.target.value })} /></div>
                    <div>
                        <label>Alert Message: </label>
                        <textarea name='alert' placeholder='Alert Message' className='text-area' value={alertData.alert} onChange={(e) => setAlertdata({ ...alertData, alert: e.target.value })} />
                    </div></>}
            </div>
            <hr />
            <VariableComponent variable={variable} callBackFun={handleVariable} />
            <hr />
            <button onClick={() => saveToNode()} className='button'>Save</button>
        </>
    )
}

export default InputNodeForm