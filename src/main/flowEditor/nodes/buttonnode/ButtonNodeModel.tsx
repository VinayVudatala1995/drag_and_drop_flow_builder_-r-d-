import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { CustomPortModel } from '../ports/customportmodel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { NodeType } from '../../../../store/main/mainSlice';
import { ButtonInterface } from '../../../../store/button/buttonSlice';



export interface ButtonNodeModelOptions extends BasePositionModelOptions {
	title?: string;
	question?: string;
	buttons: ButtonInterface[];
	variable? :  any;
}

export interface ButtonNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: ButtonNodeModelOptions;
}


export class ButtonNodeModel extends NodeModel<ButtonNodeModelGenerics>{
	protected portsIn: CustomPortModel[];
	protected portsOut: CustomPortModel[];


	constructor(title: string,question:string, buttons: any);
	constructor(options?: ButtonNodeModelOptions);
	constructor(options: any = {}, title?: string, buttons: ButtonInterface[] = [],question?:string,variable?:any) {
		if (typeof options === 'string') {
			options = {
				title: title,
				buttons : buttons,
				question : 'Please enter your question?'
			};
		}
		super({
			type: NodeType.BUTTON,
			question : 'Please enter your question?',
			buttons : buttons,
			variable : null,
			...options
		});

		this.portsOut = [];
		this.portsIn = [];
		this.assignPorts();
	}

	assignPorts() {
		this.addInPort('in', false);
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
			alignment: PortModelAlignment.LEFT,
			buttonsObj: {}
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
			alignment: PortModelAlignment.RIGHT,
			buttonsObj: {}
		});
		if (!after) {
			this.portsOut.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.title = event.data.title;
		this.options.buttons = event.data.buttons;
		this.options.question = event.data.question;
		this.options.variable = event.data.variable;
		this.portsIn = _.map(event.data.portsInOrder, (id) => {
			return this.getPortFromID(id);
		}) as CustomPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, (id) => {
			return this.getPortFromID(id);
		}) as CustomPortModel[];
	}

	serialize(): any {
		return {
			...super.serialize(),
			title: this.options.title,
			buttons: this.options.buttons,
			question: this.options.question,
			variable : this.options.variable,
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


