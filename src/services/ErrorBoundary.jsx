import React from 'react';
import { Button } from '../components/Button.jsx';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Tremendo! Conseguiste un Error inesperado.</h1>
                    <p>Pero, como siempre, puedes volver en solo un click!</p>
                    <Button onclick={() => window.location.reload()}>
                        Recargar
                    </Button>
                </div>
            );
        }
    }
}
export default ErrorBoundary;
