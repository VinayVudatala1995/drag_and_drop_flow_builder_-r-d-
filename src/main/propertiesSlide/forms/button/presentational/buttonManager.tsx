import '../buttonForm.css';
import { useSelector } from "react-redux"
import { ActionTypes, reset, setActionType } from "../../../../../store/button/buttonSlice"
import { RootState } from "../../../../../store/store"
import { CreateOrEditButton } from './CreateOrEditButton';
import { useDispatch } from 'react-redux';

export const ButtonManager = () => {
    const actionType : ActionTypes = useSelector((state : RootState) => state.buttonSlice.actionType);
    const dispatch = useDispatch();
    const handleClick = () => {
        if(actionType == ActionTypes.NONE){
            dispatch(setActionType(ActionTypes.CREATE));
        }
        else{
            dispatch(reset());
        }
    }

    return(

        <div className="add-buttons">
            <div>
                <div className='button'>
                <button  onClick={ () => handleClick()}>{actionType == ActionTypes.NONE ? 'Create' : 'Cancel'}</button>
                    </div></div>
            {
                (actionType == ActionTypes.CREATE || actionType == ActionTypes.EDIT) ?
                
                <CreateOrEditButton/>
                
                : <></>
            }
        </div>
    );
}