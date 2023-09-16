import  {
	DefaultLinkFactory
} from '@projectstorm/react-diagrams';
import { MyLinkMOdel } from './link_model';
import MyLinkWidget from './link_widget';





export class MyLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): MyLinkMOdel {
		return new MyLinkMOdel();
	}

	generateReactWidget(event:any): JSX.Element {
		return <MyLinkWidget link={event.model} onDelete={() => {}} />;
	}
}