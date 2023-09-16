import { DiagramEngine } from '@projectstorm/react-diagrams';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { resetButtonForm } from '../../store/button/buttonSlice';
import { ActionTypes, MainState, NodeType, resetForm, VariableInterface } from '../../store/main/mainSlice';
import { RootState } from '../../store/store';
import { engineContext } from '../Manager';
import { ButtonForm } from './forms/button/container/buttonForm';
import { ImageForm } from './forms/ImageNodeForm';
import InputNodeForm from './forms/InputNodeForm';
import SelectNodeForm from './forms/select/select';
import { TextForm } from './forms/TextNodeForm';
import { VariableForm } from './forms/variable/container/VariableForm';
import { WebHookForm } from './forms/webhook/webhookForm';
import { IoIosArrowForward } from "react-icons/io";

// export interface SlidingPanelProps {
//   engine: DiagramEngine;
// }

export const PropertiesSlide = (props: any) => {
    console.log('Properties SLide');
    const engine = useContext(engineContext)
    const dispatch = useDispatch();
    const mainSlice: MainState = useSelector((state: RootState) => state.mainSlice);
    const actionType = mainSlice.actionType;
    const selectednodeId = mainSlice.nodeId;
    const selectedNode = engine.getModel().getNode(selectednodeId);
    const isopen = actionType === ActionTypes.EDIT ? true : false;
    //  const [isopen,setPropertiesSlide] = useState(actionType === ActionTypes.EDIT ? true : false);
    console.log('prpoerties slide');


    const getForm = (type: string) => {

        switch (type) {
            case NodeType.TEXT:
                
                return <TextForm nodeSelected={selectednodeId}  />

            case NodeType.IMAGE:                
                return <ImageForm nodeSelected={selectednodeId}  />
            case NodeType.START:
                const propsVariable: VariableInterface[] = selectedNode.getOptions().variables;
                return <VariableForm variables={propsVariable} saveForm={onSaveForm} nodeId={selectednodeId} />

            case NodeType.BUTTON:
                return <ButtonForm nodeId={selectednodeId} />
            case NodeType.WEBHOOK:
                return <WebHookForm  nodeSelected={selectednodeId}/>;
            case NodeType.SELECT:
                return <SelectNodeForm nodeSelected={selectednodeId} />
            case NodeType.INPUT:
                return <InputNodeForm nodeId={selectednodeId} />
            default: console.log("default");
        }
    }

    const onSaveForm = (type: string, properties: any) => {


        // switch (type) {
        //     case NodeType.TEXT:
        //        

        //         engine.repaintCanvas();
        //         break;
        //     case NodeType.IMAGE:
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().selected = false;
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().title = properties.title;
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().content = properties.content;
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().url = properties.url;
        //         dispatch(setActionType('none'))
        //         dispatch(unSelectNode());
        //         engine.repaintCanvas();
        //         break;
        //     case NodeType.START:
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().selected = false;
        //         ((engine.getModel().getNode(selectednode.options.id))).getOptions().variables = properties.variables;

        //         dispatch(setActionType('none'))
        //         dispatch(unSelectNode());
        //         engine.repaintCanvas();
        //         break; 
        //     default: console.log("default");

        // }

    }

    const closeForm = () => {
      //  setPropertiesSlide(false);
        if (NodeType.BUTTON) {
            dispatch(resetButtonForm());
        }
        dispatch(resetForm());
    }

    return (
        <>
            <SlidingPane
                isOpen={isopen}
                title={ isopen ? `${selectedNode.getOptions().type} Properties` : ''}
                from="right"
                width="400px"
                
                closeIcon = {<IoIosArrowForward size='4x' onClick={() => {closeForm() }} />}
                onRequestClose={() => {
                    closeForm()
                }}>   
          {isopen ? getForm(selectedNode.getOptions().type) : <></>}                

            </SlidingPane>
            
        </>
    );
}

