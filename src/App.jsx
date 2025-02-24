import './App.css';
import { LandingPage } from './pages/LandingPage.jsx';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './pages/LayoutPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ValidationPage } from './pages/ValidationPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';

function App() {
    return (
        <>
            <LandingPage />
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/storage" element={<HomePage />} />
                    <Route path="/users/register" element={<RegisterPage />} />
                    <Route
                        path="/users/validation"
                        element={<ValidationPage />}
                    />
                    <Route path="/users/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
