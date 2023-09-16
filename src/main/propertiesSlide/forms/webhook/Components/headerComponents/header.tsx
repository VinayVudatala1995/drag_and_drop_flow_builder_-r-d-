import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';
import { ParamInterface, deleteParam, setParamActionData, HeaderInterface, setHeaderActionData, deleteHeader } from '../../../../../../store/webhook/webhook';
import '../../webhookForm.css'
import { GoPencil } from "react-icons/go";
import {MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';

interface headerPropsInterface{
    header : HeaderInterface
}

export const Header = (props : headerPropsInterface) => {
    const headers : HeaderInterface[] =  useSelector((state : RootState) => state.webhookSlice.headers);
    const header : HeaderInterface  = headers.find((e : HeaderInterface) =>e.id == props.header.id );
    const dispatch = useDispatch();

    return( 
        
    
    <div className="param">
            <div className="param-param">
                <label>Key : {header.key}</label>
            </div>
            <div className="param-value">
            <label>Value : {header.value}</label>
            </div>
            <div className="param-actions">
            <GoPencil className="edit" onClick={() => dispatch(setHeaderActionData(header))}/>
            <MdDelete className="delete"  onClick={() => dispatch(deleteHeader(header))}/>
            </div>
        </div>
    
    
        
    );
}