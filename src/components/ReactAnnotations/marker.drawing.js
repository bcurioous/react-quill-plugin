import React from 'react';

let currentTop;

function onRecordPositionStart(e, addMarker) {
	console.log('onRecordPositionStart :: ', e.clientX, e.clientY);
	currentTop = {
		x: e.clientX,
		y: e.clientY,
		width: 0,
		height: 0,
		id:
			'_' +
			Math.random()
				.toString(36)
				.substr(2, 9),
	};
	addMarker({ ...currentTop });
}

function onRecordMovement(e, onUpdateMarker) {
	if (!currentTop) {
		return;
	}

	currentTop = {
		...currentTop,
		width: Math.abs(e.clientX - currentTop.x),
		height: Math.abs(currentTop.y - e.clientY),
	};

	onUpdateMarker(currentTop, e);
}

function onRecordPositionEnd(e) {
	console.log('onRecordPositionEnd :: ', e);
	currentTop = undefined;
}

// https://dzone.com/articles/css-position-relative-vs-position-absolute
function drawRect(rect) {
	// #parent {
	//   position: relative;
	//   width: 500px;
	//   height: 400px;
	//   background-color: #fafafa;
	//   border: solid 3px #9e70ba;
	//   font-size: 24px;
	//   text-align: center;
	// }
	// #child {
	//   position: absolute;
	//   right: 40px;
	//   top: 100px;
	//   width: 200px;
	//   height: 200px;
	//   background-color: #fafafa;
	//   border: solid 3px #78e382;
	//   font-size: 24px;
	//   text-align: center;
	// }
	return {
		position: 'absolute',
		left: rect.x,
		top: rect.y,
		width: rect.width,
		height: rect.height,
		backgroundColor: 'red',
		border: 'solid 3px #ff7347',
		fontSize: '24px',
		textAlign: 'center',
	};
}

function Markers({ markers = [] }) {
	console.log('Markers render :: ', markers);
	return (
		<>
			{markers.map((marker, i) => (
				<div key={i} style={drawRect(marker)} />
			))}
		</>
	);
}

window.addEventListener('mouseup', onRecordPositionEnd);

function MarkAnnotation(props) {
	console.log('MarkAnnotation render :: ');

	return (
		<>
			<div
				style={{
					width: 500,
					height: 500,
					backgroundColor: '#ff000024',
					position: 'relative',
					border: 'solid 3px #9e70ba',
				}}
				onMouseDown={(e) => onRecordPositionStart(e, props.onAddMarker)}
				onMouseMove={(e) => onRecordMovement(e, props.onUpdateMarker)}
				// onMouseUp={(e) => onRecordPositionEnd(e, props.onUpdateMarker)}
			/>
			<Markers markers={props.markers} />
		</>
	);
}

export default MarkAnnotation;
