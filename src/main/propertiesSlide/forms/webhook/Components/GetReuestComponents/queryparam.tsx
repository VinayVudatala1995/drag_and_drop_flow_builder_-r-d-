import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';
import { ParamInterface, deleteParam, setParamActionData } from '../../../../../../store/webhook/webhook';
import '../../webhookForm.css'
import { GoPencil } from "react-icons/go";
import {MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';

interface queryParamInterface{
    param : ParamInterface
}

export const QueryParam = (props : queryParamInterface) => {
    const querparams : ParamInterface[] =  useSelector((state : RootState) => state.webhookSlice.params);
    const param : ParamInterface  = querparams.find((e : ParamInterface) =>e.id == props.param.id );
    const dispatch = useDispatch();

    return( 
        
    
    <div className="param">
            <div className="param-param">
                <label>Param : {param.param}</label>
            </div>
            <div className="param-value">
            <label>Value : {param.value}</label>
            </div>
            <div className="param-actions">
            <GoPencil className="edit" onClick={() => dispatch(setParamActionData(param))}/>
            <MdDelete className="delete"  onClick={() => dispatch(deleteParam(param))}/>
            </div>
        </div>
    
    
        
    );
}