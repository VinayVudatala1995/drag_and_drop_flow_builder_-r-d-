import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { CustomPortModel } from '../ports/customportmodel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { NodeType } from '../../../../store/main/mainSlice';



export interface SelectNodeModelOptions extends BasePositionModelOptions {
	title? : string;
	isMulti?: string;
	items?: any;
	variable?:any;
}

export interface SelectNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: SelectNodeModelOptions;
}


export class SelectNodeModel extends NodeModel<SelectNodeModelGenerics>{
	protected portsIn: CustomPortModel[];
	protected portsOut: CustomPortModel[];

	constructor(isMulti: string, items: any, selections: any,variable? : any,title? : string,);
	constructor(options?: SelectNodeModelOptions);
	constructor(options: any = {}, isMulti?: string, items?: any, variable? : any,title? : string) {
		// if (typeof options === 'string') {
		// 	options = {
		// 		title: 'Select Option',
		// 		isMulti: null,
		// 		items: null,				
		// 		variable : null
		// 	};
		// }
		super({
			type: NodeType.SELECT,
			title: 'Select Option',
			isMulti: null,
			items: null,				
			variable : null,
			...options,
		});
		this.portsOut = [];
		this.portsIn = [];

		this.assignPorts();
	}

	assignPorts() {
		this.addInPort('in', false);
		this.addOutPort('out', false);
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
		this.options.items = event.data.items;
		this.options.isMulti = event.data.isMulti;
		this.options.variable = event.data.variable;
		this.options.title = event.data.title;
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
			title : this.options.title,
			items: this.options.items,
			isMulti: this.options.isMulti,
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




//         }
// }