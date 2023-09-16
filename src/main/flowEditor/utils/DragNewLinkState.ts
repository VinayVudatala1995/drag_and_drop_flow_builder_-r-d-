import {
	AbstractDisplacementState,
	AbstractDisplacementStateEvent,
	Action,
	ActionEvent,
	InputType
} from '@projectstorm/react-canvas-core';

import { MouseEvent } from 'react';
import { PortModel, LinkModel, DiagramEngine, DragNewLinkStateOptions, DefaultPortModel } from '@projectstorm/react-diagrams';
import { CustomPortModel } from '../nodes/ports/customportmodel';

export class DragNewLinkState extends AbstractDisplacementState<DiagramEngine> {
	port: PortModel;
	link: LinkModel;
	config: DragNewLinkStateOptions;

	constructor(options: DragNewLinkStateOptions = {}) {
		super({ name: 'drag-new-link' });

		this.config = {
			allowLooseLinks: true,
			allowLinksFromLockedPorts: false,
			...options
		};

		this.registerAction(
			new Action({

				type: InputType.MOUSE_DOWN,
				//ActionEvent<MouseEvent, PortModel>
				fire: (event: any) => {

					this.port = this.engine.getMouseElement(event.event) as PortModel;
					var linkCnt = Object.keys(this.port.links).length;

					console.log('Drag ===>MOUSE_DOWN', this.port);


					if (!this.config.allowLinksFromLockedPorts && this.port.isLocked()) {
						this.eject();
						return;
					}

					if (this.port instanceof CustomPortModel) {
						if (this.port.getOptions().in) {
							alert('Create links in output port only.');
							this.eject();
							return;
						}
					}

					if (linkCnt != 0) {
						alert('Allow only one output port link.');
						this.eject();
						return;
					}

					this.link = this.port.createLinkModel();
					// if no link is given, just eject the state
					if (!this.link) {
						this.eject();
						return;
					}

					this.link.setSelected(true);
					this.link.setSourcePort(this.port);
					this.engine.getModel().addLink(this.link);
					this.port.reportPosition();
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.MOUSE_UP,
				// /ActionEvent<MouseEvent>
				fire: (event: any) => {
					const model = this.engine.getMouseElement(event.event);
					console.log('Drag ===> MOUSE_UP', model);
					// check to see if we connected to a new port
					if (model instanceof PortModel) {
						if (this.port.canLinkToPort(model)) {
							this.link.setTargetPort(model);
							model.reportPosition();
							this.engine.repaintCanvas();
							return;
						}
					}

					if (this.isNearbySourcePort(event.event) || !this.config.allowLooseLinks) {
						this.link.remove();
						this.engine.repaintCanvas();
					}
				}
			})
		);
	}

	/**
	 * Checks whether the mouse event appears to happen in proximity of the link's source port
	 * @param event
	 */
	isNearbySourcePort({ clientX, clientY }: MouseEvent): boolean {
		const sourcePort = this.link.getSourcePort();
		const sourcePortPosition = this.link.getSourcePort().getPosition();

		return (
			clientX >= sourcePortPosition.x &&
			clientX <= sourcePortPosition.x + sourcePort.width &&
			(clientY >= sourcePortPosition.y && clientY <= sourcePortPosition.y + sourcePort.height)
		);
	}

	/**
	 * Calculates the link's far-end point position on mouse move.
	 * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
	 * as the possible engine offset
	 */
	fireMouseMoved(event: AbstractDisplacementStateEvent): any {
		const portPos = this.port.getPosition();
		const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
		const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
		const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
		const initialXRelative = this.initialXRelative / zoomLevelPercentage;
		const initialYRelative = this.initialYRelative / zoomLevelPercentage;
		const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
		const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;

		this.link.getLastPoint().setPosition(linkNextX, linkNextY);
		this.engine.repaintCanvas();
	}
}