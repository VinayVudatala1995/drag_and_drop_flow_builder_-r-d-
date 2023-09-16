import { ActionTypes, ButtonInterface, setActionData } from "../../../../../store/button/buttonSlice";
import { GoPencil } from "react-icons/go";
import {MdDelete} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
 interface ButtonProps {
    button : ButtonInterface
 }

export const Button = (props : ButtonProps) => {
    const buttons : ButtonInterface[] = useSelector((state : RootState) => state.buttonSlice.buttons);;
    const button : ButtonInterface | undefined = buttons.find((e : ButtonInterface) => e.id == props.button.id);
    const dispatch = useDispatch();
    
    return(
        <div>{button != undefined ?
            <div  className="form-variable" >
                           <div className="variable-name">{button?.label}</div>
                         <div className="variable-actions">
                               <GoPencil className="edit" onClick={() => dispatch(setActionData({actionType : ActionTypes.EDIT,actionData : button})) } />
                               <MdDelete className="delete" />
                           </div> 
                       </div> 
                   : <>No Variables</>}
   
           </div>
    );
}