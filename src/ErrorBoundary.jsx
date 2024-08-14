import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = hasError: false;
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info){
    // typically you would log this to something like New Relic
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Something went wrong</h2>
          <Link to="/">Go back to the homepage</Link>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


