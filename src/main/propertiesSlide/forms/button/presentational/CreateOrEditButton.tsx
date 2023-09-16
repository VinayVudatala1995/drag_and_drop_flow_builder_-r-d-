import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ActionTypes, addButton, ButtonInterface, reset, updateButton } from "../../../../../store/button/buttonSlice";
import { RootState } from "../../../../../store/store";
import { engineContext } from "../../../../Manager";
import { buttonContext } from "../container/buttonForm";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
export const CreateOrEditButton = () => {
    const actionType = useSelector((state : RootState) => state.buttonSlice.actionType);
    const actionData : ButtonInterface | undefined = useSelector((state : RootState) => state.buttonSlice.actionData);
   const buttons : ButtonInterface[] = useSelector((state : RootState) => state.buttonSlice.buttons);
    const [label, setLabel] = useState(actionData != undefined ? actionData.label : '');
const [Value, setValue] = useState(actionData != undefined ? actionData.value : '');
const dispatch = useDispatch();
    
const createButton = () => {    
                    const newButton : ButtonInterface = {
                        id : uuidv4(),
                        label: label,
                        value: Value,
                    };                   
            dispatch(addButton(newButton));                
            setLabel('');            
            setValue('');
            dispatch(reset());
}

const editButton = () => {
    const buttonid = actionData != undefined  ? actionData?.id : '';
        const oldButton : ButtonInterface = {            
                        id : buttonid,
                        label : label,
                        value : Value,    
                    }
                    dispatch(updateButton(oldButton));
                    setLabel('');
                    setValue('');
                    dispatch(reset());
    
}
 
return(
    <div className="variable-from">
        <div>
            
        </div>
<input className="form-input"  value={label} onChange={(e) => setLabel(e.target.value)} placeholder={'label'} />
<input className="form-input"  value={Value} onChange={(e) => setValue(e.target.value)} placeholder={'Value'} />

<button onClick={() => {
    switch (actionType) {
        case ActionTypes.CREATE:        
        createButton();
            break;
        case ActionTypes.EDIT:
            editButton();
        break;        
    }


}}> {actionType == ActionTypes.CREATE ? 'Add' : 'Update' }</button>
</div>
    );
}