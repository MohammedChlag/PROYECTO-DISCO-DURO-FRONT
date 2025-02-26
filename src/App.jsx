import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './pages/LayoutPage.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ValidationPage } from './pages/ValidationPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/users/register" element={<RegisterPage />} />
                    <Route
                        path="/users/validation"
                        element={<ValidationPage />}
                    />
                    <Route path="/users/login" element={<LoginPage />} />
                    <Route path="/storage" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
