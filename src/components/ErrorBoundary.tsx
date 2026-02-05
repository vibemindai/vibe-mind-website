import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
          <div className="text-center max-w-md space-y-4">
            <h1 className="text-3xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
