/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon May 31 2021 15:48:05 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2021 and beyond
*/

import { Component } from 'react';
import PropTypes from 'prop-types';

// css
import styles from './ErrorBoundary.module.sass';

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: '', errorType: '', errorInfo: '' };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		const errorType = error.stack.split(':')[0];
		return { hasError: true, error, errorType };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// console.log({ error, errorInfo });
		this.setState({ errorInfo });
	}

	render() {
		if (this.state.hasError) {
			// custom fallback UI
			return (
				<div className={styles.fallback_ui_root}>
					{this.state.error && this.state.errorInfo && (
						<>
							<button
								className={styles.btn_reload}
								onClick={() => window.location.reload()}
							>
								Fixed this error? Reload Page
							</button>
							<div className={styles.error_wrapper}>
								<h1 className={styles.heading}>
									{`${this.state.errorType}: ${this.state.error.message}`}
								</h1>
								<pre className={styles.pre}>
									{this.state.errorInfo.componentStack
										.toString()
										.replace('\n', '')}
								</pre>
							</div>
						</>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default ErrorBoundary;
