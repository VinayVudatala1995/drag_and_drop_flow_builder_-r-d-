import {
	DefaultLinkWidget
} from '@projectstorm/react-diagrams';
import { LinkWidget, PointModel } from '@projectstorm/react-diagrams-core';

import { MouseEvent } from 'react';
import { parsePath, roundCommands, roundCorners } from 'svg-round-corners';

export class AdvancedLinkWidgetRA extends DefaultLinkWidget {
	generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
		console.log("===>",this.props.link.getOptions());
		return (
			<CustomLinkArrowWidget
				key={point.getID()}
				point={point as any}
				previousPoint={previousPoint as any}
				colorSelected={this.props.link.getOptions().selectedColor}
				color={this.props.link.getOptions().color}
			/>
		);
	}

	render() {
		//ensure id is present for all points on the path
		this.props.link.getOptions().width=2.5;
		// this.props.link.getOptions().curvyness=70;
		var points = this.props.link.getPoints();
		var paths = [];
		this.refPaths = [];

		//draw the multiple anchors and complex line instead
		for (let j = 0; j < points.length - 1; j++) {
		
			paths.push(
				this.generateLink(this.props.link.getSVGPath(),
					//LinkWidget.generateLinePath(points[j], points[j + 1]),
					{
						'data-linkid': this.props.link.getID(),
						'data-point': j,
						onMouseDown: (event: MouseEvent) => {
							this.addPointToLink(event, j + 1);
						}
					},
					j
				)
			);
		}

		//render the circles
		for (let i = 1; i < points.length - 1; i++) {
			paths.push(this.generatePoint(points[i]));
		}

		if (this.props.link.getTargetPort() !== null) {
			paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
		} else {

			paths.push(this.generatePoint(points[points.length - 1]));
		}

		return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
	}

}
const CustomLinkArrowWidget = (props: any) => {
	const { point, previousPoint } = props;

	var angle =
		90 +
		(Math.atan2(
			point.getPosition().y - previousPoint.getPosition().y,
			point.getPosition().x - previousPoint.getPosition().x
		) *
			180) /
		Math.PI;

	//translate(50, -10),
	
	if(angle <80){
		angle=angle+angle/3;
	}
	if(angle <50){
		angle=angle+angle/2;
	}

	if(angle <40){
		angle=angle+angle/1;
	}

	if(angle >100){
		angle=angle-angle/5;
	}
	return (
		<g className="arrow" transform={'translate(' + point.getPosition().x + ', ' + point.getPosition().y + ')'}>
			<g style={{ transform: 'rotate(' + angle + 'deg)' }}>
				<g transform={'translate(0, -3)'}>
					<polygon
						points="0,0 10,20 -10,20"
						fill={props.color}
						data-id={point.getID()}
						data-linkid={point.getLink().getID()}
					/>
				</g>
			</g>
		</g>
	);
}
