import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { CustomPortModel } from '../ports/customportmodel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { NodeType, VariableInterface } from '../../../../store/main/mainSlice';
import variables from '../../../../store/variables/variables';
import { UrlType } from '../../../../utils/props';
import { HeaderInterface, ParamInterface } from '../../../../store/webhook/webhook';



export interface WebHookNodeModelOptions extends BasePositionModelOptions {   
	title? : string,
	url? : string,
	requestType? : string,
	queryparams? : ParamInterface[],
	headers? : object,
	body? : object,
	variable? :VariableInterface,
	response? : any,
}

export interface WebHookNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: WebHookNodeModelOptions;
}


export class WebHookNodeModel extends NodeModel<WebHookNodeModelGenerics>{
    protected portsIn: CustomPortModel[];
	protected portsOut: CustomPortModel[];
    constructor( title? : string ,url? : string,requestType? : string,queryparams? : ParamInterface[] ,headers? : object,body? : object,Variable? :VariableInterface,response? : any);
    constructor(options?: WebHookNodeModelOptions);
    constructor(options: any = {} , title? :string,url? : string , queryparams? :  ParamInterface[], headers? : object,body? : object,Variable? :VariableInterface,response? : any,requestType? : string,) {
		if (typeof options === 'string') {
			options = {		
				
			};
		}
		
		super({
			type: NodeType.WEBHOOK,
			title : 'WebHook',
			url : '',
			requestType : '',
			queryparams : [],
			headers : [],
			body : {},
			variable : {},
			response : {},
			...options
		});
		this.portsOut = [];
		this.portsIn = [];
        this.assignPorts();
	}

assignPorts() {
this.addInPort('in',false);
this.addOutPort('out',false);
}

	doClone(lookupTable: {}, clone: any): void {
		clone.portsIn = [];
		clone.portsOut = [];
		super.doClone(lookupTable, clone);
	}

    removePort(port: CustomPortModel): void {
		super.removePort(port);
		if (port.getOptions().in) {
			this.portsIn.splice(this.portsIn.indexOf(port), 1);
		} else {
			this.portsOut.splice(this.portsOut.indexOf(port), 1);
		}
	}

    
	addPort<T extends CustomPortModel>(port: T): T {
		super.addPort(port);
		if (port.getOptions().in) {
			if (this.portsIn.indexOf(port) === -1) {
				this.portsIn.push(port);
			}
		} else {
			if (this.portsOut.indexOf(port) === -1) {
				this.portsOut.push(port);
			}
		}
		return port;
	}

	addInPort(label: string, after = true): CustomPortModel {
		const p = new CustomPortModel({
			in: true,
			name: label,
			label: label,
			alignment: PortModelAlignment.LEFT
		});
		if (!after) {
			this.portsIn.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	addOutPort(label: string, after = true): CustomPortModel {
		const p = new CustomPortModel({
			in: false,
			name: label,
			label: label,
			alignment: PortModelAlignment.RIGHT
		});
		if (!after) {
			this.portsOut.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.title = event.data.title;
		this.options.url = event.data.url;
		this.options.requestType = event.data.requestType;
		this.options.queryparams = event.data.queryparams;
		this.options.headers = event.data.headers;
		this.options.body = event.data.body;
		this.options.variable = event.data.Variable;
		this.portsIn = _.map(event.data.portsInOrder, (id) => {
			return this.getPortFromID(id);
		}) as CustomPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, (id) => {
			return this.getPortFromID(id);
		}) as CustomPortModel[];
	}

	// title? : string,
	// url? : string,
	// requestType? : string,
	// queryparams? : ParamInterface[],
	// headers? : object,
	// body? : object,
	// Variable? :VariableInterface,
	serialize(): any {
		return {
			...super.serialize(),
			title : this.options.title,
			url : this.options.url,
			requestType : this.options.requestType,
			queryparams : this.options.queryparams,
			headers : this.options.headers,
			body : this.options.body,
			Variable : this.options.variable,
			portsInOrder: _.map(this.portsIn, (port) => {
				return port.getID();
			}),
			portsOutOrder: _.map(this.portsOut, (port) => {
				return port.getID();
			})
		};
	}

	getInPorts(): CustomPortModel[] {
		return this.portsIn;
	}

	getOutPorts(): CustomPortModel[] {
		return this.portsOut;
	}

}
