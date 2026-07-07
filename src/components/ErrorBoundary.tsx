import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

/**
 * Catches render-time errors in the subtree and shows a fallback UI instead
 * of unmounting the whole app. Error boundaries must be class components.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error("Unhandled UI error", error, info);
	}

	private handleReset = () => {
		this.setState({ hasError: false });
	};

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div role='alert' className='error-boundary'>
					<h2>Something went wrong.</h2>
					<button type='button' onClick={this.handleReset}>
						Try again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
