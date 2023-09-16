import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes, addParam, ParamInterface, updateParam } from '../../../../../../store/webhook/webhook';
import { v4 as uuidv4 } from 'uuid';
import '../../webhookForm.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';

export const QueryParamForm = () => {
    const actionData : ParamInterface = useSelector((state : RootState) => state.webhookSlice.paramactionData);
    const actionType :ActionTypes  = useSelector((state : RootState) => state.webhookSlice.paramActionType); 
    const [param,setParam] = useState( actionData != null ? actionData.param : '');
    const [value,setValue] = useState(actionData != null ? actionData.value :'');
    const dispatch = useDispatch();
    
    const handleClick = () => {
        if(actionType == ActionTypes.CREATE){
            dispatch(addParam({id : uuidv4() ,param : param,value : value}));
        }
        else{
            const newParam : ParamInterface = {
                id : actionData.id ,
                param : param,
                value : value
            }
            dispatch(updateParam(newParam));
        }
        
        setParam('');
        setValue('');
    }

    return(
        <div className="queryparamForm">
        <label>Please fill param details</label>
        <hr/>
        <br/>
        <label>param : </label>
        <input  value={param} onChange={(e) => setParam(e.target.value.trim())}/>
        <br/>
        <label>value : </label>
        <input value={value} onChange={(e) => setValue(e.target.value.trim())}/>
        <br/>
        <br/>
        <button className='button' onClick={() => handleClick()}>{actionType == ActionTypes.CREATE ? 'Add' : 'Update'}</button>  
        </div>
    );
}