
import { createContext, useContext, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonData } from "../../../../../store/button/buttonSlice";
import { engineContext } from "../../../../Manager";
import { ButtonFormManager } from "../presentational/buttonFormManager";

interface ButtonFormProps{
    nodeId : string
}
const defaultfrom : ButtonFormProps = {
    nodeId : ''
}
export const buttonContext = createContext(defaultfrom);
export const ButtonForm = (props : ButtonFormProps) => {
    const dispatch = useDispatch();
    const engine  = useContext(engineContext);
    const question :string = ( engine.getModel().getNode(props.nodeId)).getOptions().question;
     const buttons: any[] =( engine.getModel().getNode(props.nodeId)).getOptions().buttons;
    
     useLayoutEffect(() => {
        
        dispatch(setButtonData({question : question, buttons : buttons}));
     },[question,buttons]);
     
     
    return(
        <> 
        <buttonContext.Provider value={props}>    
        <ButtonFormManager/>
        </buttonContext.Provider>
        </>
    );
}