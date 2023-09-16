
import { Action, ActionEvent, InputType } from '@projectstorm/react-canvas-core';
import * as _ from 'lodash';

interface CustomDeleteItemsActionOptions {
	keyCodes?: number[];
}

export class CustomDeleteItemsAction extends Action {
	constructor(options: CustomDeleteItemsActionOptions = {}) {
		options = {
			keyCodes: [46],
			...options
		};
		super({
			type: InputType.KEY_DOWN,
            //ActionEvent<React.KeyboardEvent>
			fire: (event: any) => {
                console.log("CustomDeleteItemsAction ==>",event.event.keyCode);
				if (options.keyCodes.indexOf(event.event.keyCode) !== -1) {
					const selectedEntities = this.engine.getModel().getSelectedEntities();
					if (selectedEntities.length > 0) {
						const confirm = window.confirm('Are you sure you want to delete?');

						if (confirm) {
							_.forEach(selectedEntities, (model) => {
								// only delete items which are not locked
								if (!model.isLocked()) {
									model.remove();
								}
							});
							this.engine.repaintCanvas();
						}
					}
				}
			}
		});
	}
}