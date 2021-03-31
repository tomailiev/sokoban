import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(e) {
        return { hasError: true };
    }

    componentDidCatch(e, eInfo) {
        console.log(e);
        console.log(eInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Error occured.</div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;