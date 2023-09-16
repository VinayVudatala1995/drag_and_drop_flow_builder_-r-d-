
import { useContext, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { resetForm } from "../../../../store/main/mainSlice";
import { store } from "../../../../store/store";
import { resetWebHookSlice, setWebHookData } from "../../../../store/webhook/webhook";
import { formProps } from "../../../../utils/props";
import { engineContext } from "../../../Manager";
import { ResponseKeysManager } from "./Components/ResponseKeys/ResponseKeysManager";
import { WebHookRequestManager } from "./Components/webHookRequestManager";
import { WebHookUrl } from "./Components/webHookUrl";
import './webhookForm.css';



export const WebHookForm = (props : formProps) => {
    const engine = useContext(engineContext);
    const url =  engine.getModel().getNode(props.nodeSelected).getOptions().url ;
    const requestType =     engine.getModel().getNode(props.nodeSelected).getOptions().requestType ;
     const queryparams=   engine.getModel().getNode(props.nodeSelected).getOptions().queryparams ;
     const  headers =  engine.getModel().getNode(props.nodeSelected).getOptions().headers ;
     const variable=   engine.getModel().getNode(props.nodeSelected).getOptions().variable ;
     const body =   engine.getModel().getNode(props.nodeSelected).getOptions().body;
     const response =   engine.getModel().getNode(props.nodeSelected).getOptions().response;
    const dispatch= useDispatch();
    useLayoutEffect((

    ) => {
        // state.url = payload.url;
        // state.requestType = payload.requestType;
        // state.params = payload.params;     state.headers =payload.headers;
        // state.varibaleAssigned = payload.variable;
        // state.response = payload.response;
dispatch(setWebHookData({url : url , requestType : requestType , params : queryparams , headers : headers,variable : variable,response : response}))


    }, [url,requestType,queryparams,headers,variable,body]);

    const onSave = () => {
        const url = store.getState().webhookSlice.url;
        const requestType = store.getState().webhookSlice.requestType;
        const params = store.getState().webhookSlice.params;
        const headers = store.getState().webhookSlice.headers;
        const variable = store.getState().webhookSlice.varibaleAssigned;
        const response = store.getState().webhookSlice.response;
        
        // url? : string,
        // requestType? : string,
        // queryparams? : ParamInterface[],
        // headers? : object,
        // body? : object,
        // Variable? :VariableInterface,
engine.getModel().getNode(props.nodeSelected).getOptions().selected = false;
        engine.getModel().getNode(props.nodeSelected).getOptions().url = url;
        engine.getModel().getNode(props.nodeSelected).getOptions().requestType = requestType;
        engine.getModel().getNode(props.nodeSelected).getOptions().queryparams = params;
        engine.getModel().getNode(props.nodeSelected).getOptions().headers = headers;
        engine.getModel().getNode(props.nodeSelected).getOptions().variable = variable;
        engine.getModel().getNode(props.nodeSelected).getOptions().body = null;
        engine.getModel().getNode(props.nodeSelected).getOptions().response = response;
        engine.repaintCanvas();
        dispatch(resetWebHookSlice());
        dispatch(resetForm());
    }

    

    return(
        <div >
            <WebHookUrl/> 
            <WebHookRequestManager/>
            <br/>
            <ResponseKeysManager/>
            <br/>
            <button className="button" onClick={() => onSave()}>Save</button>
            <br/>
        </div>
    );
}