import React, { useState } from 'react';

import MarkAnnotation from './marker.drawing';

function ReactAnnotations() {
	const [markers, setMarkers] = useState([]);

	const onAddMarker = (marker) => {
		console.log('onAddMarker :: ', marker, markers);
		setMarkers([...markers, marker]);
	};

	const onUpdateMarker = (marker, e) => {
		const foundMarkerIndex = markers.findIndex((v) => v.id === marker.id);
		console.group('Wrapper :: onUpdateMarker');
		console.log('e :: ', e);
		console.log('foundMarkerIndex :: ', foundMarkerIndex);
		console.log('markers[foundMarkerIndex] :: ', markers[foundMarkerIndex]);
		console.log('updated marker :: ', marker);

		console.groupEnd();

		markers[foundMarkerIndex] = marker;
		setMarkers([...markers]);
	};

	return (
		<MarkAnnotation
			onAddMarker={onAddMarker}
			markers={markers}
			onUpdateMarker={onUpdateMarker}
		/>
	);
}

export default ReactAnnotations;
