import {
	
	DefaultLinkModel
} from '@projectstorm/react-diagrams';


export class MyLinkMOdel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'advanced',
			width: 4,
             curvyness:40
		});
	}
	performanceTune() {
		return false;
	}
}