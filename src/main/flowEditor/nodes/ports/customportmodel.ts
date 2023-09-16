
import {
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { AbstractModelFactory, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import ArrowHeadModel from '../../link/ArrowHeadModel';
import { MyLinkMOdel } from '../../link/links/link_model';



export interface CustomPortModelOptions extends PortModelOptions {
	label?: string;
	in?: boolean;
	type?: string;
	buttonsObj?: any
}

export interface CustomPortModelGenrics extends PortModelGenerics {
	OPTIONS: CustomPortModelOptions;

}

export class CustomPortModel extends PortModel<CustomPortModelGenrics>{
	constructor(isIn: boolean, name?: string, label?: string, buttonsObj?: any);
	constructor(options: CustomPortModelOptions);
	constructor(options: CustomPortModelOptions | boolean, name?: string, label?: string, buttonsObj?: any) {
		if (!!name) {
			options = {
				in: !!options,
				name: name,
				label: label,
				buttonsObj: buttonsObj
			};
		}
		options = options as CustomPortModelOptions;
		super({
			label: options.label || options.name,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'custom',
			...options
		});
	}


	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.in = event.data.in;
		this.options.label = event.data.label;
		 this.options.buttonsObj = event.data.buttonsObj
	}

	serialize() {
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label,
			buttonsObj:this.options.buttonsObj
		};
	}

	canLinkToPort(port: PortModel): boolean {
		
		if (!(port instanceof CustomPortModel)) {
			return true;
			//return this.options.in !== port.getOptions().in;
		}
		if (this.options.in === port.getOptions().in) return false;
		const out = this.options.in ? port : this; // one of the ports is necessarily out
		const outLinks = Object.values(out.getLinks()); // gets all links attached to this out port
		if (outLinks.length > 1) return false;
		return true;
	}

	createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
		//  let link = super.createLinkModel();
		let link = new MyLinkMOdel();
		if (!link && factory) {
			return factory.generateModel({});
		}
		return link || new DefaultLinkModel();
	}
}


