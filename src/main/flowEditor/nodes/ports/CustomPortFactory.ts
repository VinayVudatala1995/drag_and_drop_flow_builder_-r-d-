	import { CustomPortModel } from './customportmodel';
	import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
	import { DiagramEngine } from '@projectstorm/react-diagrams-core';

	export class CustomPortFactory extends AbstractModelFactory<CustomPortModel, DiagramEngine> {
		constructor() {
			super('custom');
		}

		generateModel(): CustomPortModel {
			return new CustomPortModel({
				name: 'custom'
			});
		}

		

	}