import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';
import { ActionTypes, addHeader, HeaderInterface, updateHeader } from '../../../../../../store/webhook/webhook';
import '../../webhookForm.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export const HeaderForm = () => {
    const actionType = useSelector((state : RootState) => state.webhookSlice.headerActionType);
    const actionData : HeaderInterface = useSelector((state : RootState) => state.webhookSlice.headerActionData);
    const [key,setKey] = useState( actionData != null ? actionData.key : '');
    const [value,setValue] = useState(actionData != null ? actionData.value :'');
    const dispatch = useDispatch();
    const handleClick = () => {
        if(actionType == ActionTypes.CREATE){
            dispatch(addHeader({id : uuidv4() ,key : key,value : value}));
        }
        else{
            const newParam : HeaderInterface = {
                id : actionData.id ,
                key : key,
                value : value
            }
            dispatch(updateHeader(newParam));
        }
        
        setKey('');
        setValue('');
    }
    return(

        <div className="headerForm">
        <label>Please Fill Header object details</label>
        <hr/>
        <br/>
        <label>key : </label>
        <input value={key} onChange={(e) => setKey(e.target.value)} />
        <br/>
        <label>value : </label>
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        <br/>
        <br/>
        <button className='button' onClick={() => handleClick()}>{actionType == ActionTypes.CREATE ? 'Add' : 'Update'}</button>  
        </div>
    );
}