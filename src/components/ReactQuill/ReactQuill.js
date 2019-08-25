import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
// import Quill from './quill';

import './quill.core.css';
import './quill.snow.css';

// https://github.com/quilljs/webpack-example/blob/master/app.js
export default function ReactQuill(props) {
	const quillRef = useRef(null);

	useEffect(() => {
		console.log('quill ref  :: ', quillRef);
		const quill = new Quill(quillRef.current, {
			...props.options,
		});

		console.log('quill', quill);
	});

	return <div ref={quillRef} />;
}
