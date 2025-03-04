import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutPublic } from './components/LayoutPublic/LayoutPublic.jsx';
import { LayoutPrivate } from './components/LayoutPrivate/LayoutPrivate.jsx';

// Páginas Publicas
import { LandingPage } from './pages/LandingPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ValidationPage } from './pages/ValidationPage.jsx';
// Páginas Privadas
import { HomePage } from './pages/HomePage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
// Página 404
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { UsersListPage } from './pages/UsersListPage.jsx';
import { SharedLinkPage } from './pages/SharedLinkPage.jsx';
import { DownloadPage } from './pages/DownloadPage.jsx';

import { RecoveryPassCodePage } from './pages/RecoveryPassCodePage.jsx';
import { RecoveryEmailPage } from './pages/RecoveryEmailPage.jsx';
import { AssessmentsPage } from './pages/AssessmentsPage.jsx';

function App() {
    return (
        <>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<LayoutPublic />}>
                    <Route index element={<LandingPage />} />
                    <Route path='/assessments' element={<AssessmentsPage />} />
                    <Route path="/users">
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                            path="validation/:registrationCode"
                            element={<ValidationPage />}
                        />
                        <Route
                            path="recovery-email"
                            element={<RecoveryEmailPage />}
                        />
                        <Route
                            path="recovery"
                            element={<RecoveryPassCodePage />}
                        />
                    </Route>
                    <Route
                        path="/storage/share/link/:shareToken"
                        element={<SharedLinkPage />}
                    />
                    <Route
                        path="/storage/share/download/:shareToken"
                        element={<DownloadPage />}
                    />
                </Route>

                {/* Rutas Privadas */}
                <Route element={<LayoutPrivate />}>
                    <Route path="/storage" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/aboutUs" element={<AboutPage />} />
                    <Route
                        path="/assessmentsUse"
                        // element={<AssessmentsPage />}
                    />
                    <Route path="/admin/users" element={<UsersListPage />} />
                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
