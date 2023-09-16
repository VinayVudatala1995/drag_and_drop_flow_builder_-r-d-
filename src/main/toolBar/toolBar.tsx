import React,{useContext} from 'react';
import './toolbar.css';
import { engineContext } from "../Manager";
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { useDispatch } from 'react-redux';
import { setSerializeData } from '../../store/canvasstr/canvasstr';
import { store } from '../../store/store';

export const ToolBar = () => {    
    const engine : DiagramEngine = useContext(engineContext);
    const dispatch = useDispatch();
   
    const downloadFile = (myData : any) => {
       
                                       // is an object and I wrote it to file as
                                       // json
      
        // create file in browser
        const fileName = "serailize";
        const json = JSON.stringify(myData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
      
        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
      
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    const serialize = () =>  {
        downloadFile(engine.getModel().serialize());
        dispatch(setSerializeData(engine.getModel().serialize()));
        

        const model = new DiagramModel();
        engine.setModel(model);
    }

    const deserialize = () => {
        const str = store.getState().canvasStrSlice.serializedata;
            engine.getModel().deserializeModel(str,engine);
            engine.repaintCanvas();
    }


    return(
    <div className="toolbar">
        <button onClick={() => serialize()}>Serialize</button> 
        <button onClick={() => deserialize()}>De- Serialize</button> 
    </div>);
}