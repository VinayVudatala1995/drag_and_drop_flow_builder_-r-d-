import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { CustomPortModel } from '../ports/customportmodel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { NodeType } from '../../../../store/main/mainSlice';




export interface ImageNodeModelOptions extends BasePositionModelOptions {
	name?: string;
	title?: string;
	content?: string;
	url?: string;
	
}

export interface ImageNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: ImageNodeModelOptions;
}


export class ImageNodeModel extends NodeModel<ImageNodeModelGenerics>{
	protected portsIn: CustomPortModel[];
	protected portsOut: CustomPortModel[];

	constructor(name: string, title: string, content: string, url: string);
	constructor(options?: ImageNodeModelOptions);

	constructor(options: any = {}, content?: string, title?: string, url?: string) {
		if (typeof options === 'string') {
			options = {
				name: options,
				title: title,
				content: content,
				url: url
			};
		}
		super({
			type: NodeType.IMAGE,
			name: 'Image',
			...options
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
		this.options.name = event.data.name;
		this.options.content = event.data.content;
		this.options.title = event.data.title;
		this.options.url = event.data.url;
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
			name: this.options.name,
			content: this.options.content,
			title: this.options.title,
			url: this.options.url,
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


