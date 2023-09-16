import * as _ from 'lodash';
import { useDispatch } from "react-redux";
import { NodeWidgetProps } from "../../../../utils/props";
import { CustomPortLabel } from "../ports/CustomPortWidget";
import { FiSettings } from "react-icons/fi";
import './WebHookNodeWidget.css';
import { ActionTypes, setForm } from "../../../../store/main/mainSlice";
import { HeaderInterface, ParamInterface } from '../../../../store/webhook/webhook';




export const WebHookWidget = (props: NodeWidgetProps) => {
    const dispatch = useDispatch();
    console.log(props.node);


    const generatePort = (port: any) => {
        return <CustomPortLabel engine={props.engine} port={port} key={port.getID()} />;
    };
    return (
        <div className='node'>
            {_.map(props.node.getInPorts(), generatePort)}
            <div className='content' style={props.node.options.selected ? { border: '1px solid black', } : { border: '1px solid white', }}>

                <div>
                    {props.node.options.selected ?
                        <div className='actions'>
                            <FiSettings height={25} width={25} onClick={() => {
                                dispatch(setForm({ actionType: ActionTypes.EDIT, nodeId: props.node.getID() }))
                            }} />

                        </div> :
                        <div>
                        </div>}
                </div>
                <h4 className="title">{props.node.getOptions().title}</h4>
                <div className="body">
                    {props.node.getOptions().url != undefined ? <div>{`Url : ${props.node.getOptions().url} `}<br /></div> : <></>}
                    {props.node.getOptions().requestType != undefined ? <div>{`RequestType : ${props.node.getOptions().requestType.value} `}<br /></div> : <></>}
                    {props.node.getOptions().queryparams != undefined ? <div>
                        {props.node.getOptions().queryparams.map((param: ParamInterface) => {

                            return <div className="param">
                                <div className="param-param">
                                    <label>Param : {param.param}</label>
                                </div>
                                <div className="param-value">
                                    <label>Value : {param.value}</label>
                                </div>
                            </div>
                        })}
                        <br />
                    </div> : <></>}
                    {props.node.getOptions().headers != undefined ? <div>
                        {props.node.getOptions().headers.map((header: HeaderInterface) => {

                            return <div className="param">
                                <div className="param-param">
                                    <label>key : {header.key}</label>
                                </div>
                                <div className="param-value">
                                    <label>Value : {header.value}</label>
                                </div>
                            </div>
                        })}
                        <br />
                    </div> : <></>}
                    {props.node.getOptions().variable != undefined ? <div>


                        <div className="param">
                            <div className="param-param">
                                <label>variable : {props.node.getOptions().variable.variable}</label>
                            </div>
                            <div className="param-value">
                                <label>Value : {props.node.getOptions().variable.value}</label>
                            </div>
                        </div>
                        <br />

                    </div> : <></>}
                </div>

            </div>
            {_.map(props.node.getOutPorts(), generatePort)}
        </div>

        // <S.Node
        // 	data-default-node-name={this.props.node.getOptions().name}
        // 	selected={this.props.node.isSelected()}
        // 	background={'#000000'}
        // >
        // 	<S.Title>
        // 		<S.TitleName>{this.props.node.getOptions().name}</S.TitleName>
        // 	</S.Title>
        // 	<S.Ports>
        // 		<S.PortsContainer>{_.map(this.props.node.getInPorts(), this.generatePort)}</S.PortsContainer>
        // 		<S.PortsContainer>{_.map(this.props.node.getOutPorts(), this.generatePort)}</S.PortsContainer>
        // 	</S.Ports>
        // </S.Node>
    );
}

