import  {
	DefaultLinkFactory
} from '@projectstorm/react-diagrams';


import {AdvancedLinkWidgetRA,AdvancedLinkModel } from './index';


export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}

	generateReactWidget(event:any): JSX.Element {
		return <AdvancedLinkWidgetRA link={event.model} diagramEngine={this.engine} />;
	}
}