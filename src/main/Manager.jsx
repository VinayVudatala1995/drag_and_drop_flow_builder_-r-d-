import React, { createContext } from 'react'
import createEngine, { DiagramModel, DefaultNodeModel ,DefaultDiagramState, DiagramEngine} from "@projectstorm/react-diagrams";
import { StartNodeFactory } from './flowEditor/nodes/statrnode/StartnodeFactory';
import { TextNodeFactory } from './flowEditor/nodes/textnode/TextNodeFactory';
import { ImageNodeFactory } from './flowEditor/nodes/imagenode/imagenodefactory';
import VariableNodeFactory from './flowEditor/nodes/variablenode/VariableNodeFactory';
import ButtonNodeFactory from './flowEditor/nodes/buttonnode/ButtonNodeFactory';
import { StartNodeModel } from './flowEditor/nodes/statrnode/Startnodemodel';
import { Palette } from './palette/Palette';
import { FlowEditor } from './flowEditor/flowEditor';
import { PropertiesSlide } from './propertiesSlide/PropertiesSlide';
import './main.css';
import { CustomPortFactory } from './flowEditor/nodes/ports/CustomPortFactory';
import { ToolBar } from './toolBar/toolBar';
import { WebHookNodeModel } from './flowEditor/nodes/webhook/WebHookNodeModel';
import { WebHookNodeFactory } from './flowEditor/nodes/webhook/WebHookNodeFactory';
import { SelectNodeFactory } from './flowEditor/nodes/selectnode/SelectNodeFactory';
// import { AdvancedLinkFactory, ArrowHeadFactory } from './flowEditor/link';
import { CustomDeleteItemsAction, DragNewLinkState } from './flowEditor/utils';
import { InputNodeFactory } from './flowEditor/nodes/inputnode/InputNodeFactory';
import { MyLinkFactory } from './flowEditor/link/links/link_factory';
import { AdvancedLinkFactory, ArrowHeadFactory } from './flowEditor/link';

// export const engineContext = createContext({})
export const engineContext  = createContext();
export const Manager = () => {
    const engine = createEngine({ registerDefaultDeleteItemsAction: false });
    engine.setMaxNumberPointsPerLink(0);
    engine.getNodeFactories().registerFactory(new SelectNodeFactory()); 
    engine.getNodeFactories().registerFactory(new WebHookNodeFactory()); 
    engine.getNodeFactories().registerFactory(new StartNodeFactory()); 
    engine.getNodeFactories().registerFactory(new TextNodeFactory());
    engine.getNodeFactories().registerFactory(new ImageNodeFactory());
    engine.getNodeFactories().registerFactory(new VariableNodeFactory());
    engine.getNodeFactories().registerFactory(new ButtonNodeFactory());
    engine.getNodeFactories().registerFactory(new InputNodeFactory());
    engine.getPortFactories().registerFactory(new CustomPortFactory());
    engine.getLinkFactories().registerFactory(new ArrowHeadFactory());
    engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

    engine.getActionEventBus().registerAction(

        new CustomDeleteItemsAction()

    );
    
    const modal = new DiagramModel();  
    var node = new StartNodeModel();
    node.setPosition(25,20);     
    modal.addNode(node);
    
    // const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    // const port1 = node1.addOutPort('Out');
    // node1.setPosition(100, 100);

    // const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    // const port2 = node2.addInPort('In');
    // node2.setPosition(400, 100);

    // modal.addAll(node1, node2);

    // Create a custom link
    
    
    engine.setModel(modal);
    engine.getModel().setZoomLevel(75);

    const state = engine.getStateMachine().getCurrentState();

    if (state instanceof DefaultDiagramState) {

        state.dragNewLink.config.allowLooseLinks = false;

     //   state.dragNewLink=new DragNewLinkState({ allowLooseLinks: false });

    }

    return (
        <engineContext.Provider value={engine}>
        <div>
            <ToolBar/>
        </div>
        <div className="main-div">       
            <div className="node-options">
                <Palette />
            </div>
                <FlowEditor />
                <PropertiesSlide />            
        </div>
        </engineContext.Provider>
    )
}
