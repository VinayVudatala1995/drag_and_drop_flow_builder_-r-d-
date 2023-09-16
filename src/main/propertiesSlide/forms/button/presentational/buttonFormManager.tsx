import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ButtonInterface, resetButtonForm } from "../../../../../store/button/buttonSlice";
import { resetForm, VariableInterface } from "../../../../../store/main/mainSlice";
import { store } from "../../../../../store/store";
import { engineContext } from "../../../../Manager";
import { VariableComponent } from "../../../components/variableComponents/variableComponent";
import { buttonContext } from "../container/buttonForm";
import { ButtonManager } from "./buttonManager";
import { ButtonText } from "./buttonText";
import { Buttons } from "./butttons";


export const ButtonFormManager = () => {
    const engine = useContext(engineContext);
    const buttonProps = useContext(buttonContext);
    let variable : VariableInterface = engine.getModel().getNode(buttonProps.nodeId).getOptions().variable;
    const dispatch= useDispatch();
   
   
     const  onSave =  () =>    {        
        const buttonSLiceState = store.getState().buttonSlice;
        const question = buttonSLiceState.question;
        const buttons = buttonSLiceState.buttons;
        engine.getModel().getNode(buttonProps.nodeId).getOptions().selected = false;
        engine.getModel().getNode(buttonProps.nodeId).getOptions().question = question;
        engine.getModel().getNode(buttonProps.nodeId).getOptions().buttons = buttons;
        engine.getModel().getNode(buttonProps.nodeId).getOptions().variable = variable;
        addOutPorts(buttons,engine.getModel().getNode(buttonProps.nodeId));         
        dispatch(resetButtonForm());
        dispatch(resetForm());
        engine.repaintCanvas();
        
    }

    const addOutPorts = (buttonsList : ButtonInterface[],node : any) =>  {
      
        if(buttonsList != undefined){
            const outPorts = node.getOutPorts();           
                buttonsList.map((e : ButtonInterface,index) => {
                 const port =   outPorts.find((elemnt : any) => elemnt.getOptions().buttonsObj.id == e.id )
                 if(port == undefined){
                    node.addOutPort(`out${index + 1}`, false);
                 }
                })          
          }      
    }

    const addVariale =(variba : VariableInterface) => {
        variable = variba;
    }

    return(<>
    <Buttons/>
    <hr/>
    <ButtonText/>
    <hr/>
    <ButtonManager/>
    <hr/>
    <VariableComponent variable={variable}  callBackFun={addVariale}/>
    <button onClick={() => onSave()}>Save</button>
    </>);
}
