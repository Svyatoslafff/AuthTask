import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';
import AppBar from './components/AppBar';

import { createClient, type Session } from '@supabase/supabase-js';
// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import AuthRoute from './routes/AuthRoute';
import SendResetPasswordPage from './pages/SendResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import PhotosPage from './pages/PhotosPage';
import TasksPage from './pages/TasksPage';

export const supabase = createClient(
    'https://pupaucyyifxxorgpfxvq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cGF1Y3l5aWZ4eG9yZ3BmeHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTgwNTYsImV4cCI6MjA2Mjg3NDA1Nn0.Ndu3CdOI85DEI6L2dxOfu1Wr9gz2hhi6kis1RzjbuTU'
);

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    // const [redirectTo, setRedirectTo] = useState('/dashboard');
    // setRedirectTo(location.pathname);

    useEffect(() => {
        if (location.pathname === '/') navigate('/dashboard');
    }, []);

    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session: newSession } }) => {
            setSession(newSession);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<AppBar />}>
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute session={session} redirectTo="/login">
                            <HomePage
                                session={session}
                                setSession={setSession}
                            />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="photos"
                    element={
                        <PrivateRoute session={session} redirectTo="/login">
                            <PhotosPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="tasks"
                    element={
                        <PrivateRoute session={session} redirectTo="/login">
                            <TasksPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <AuthRoute session={session} redirectTo="/dashboard">
                            <LoginPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <AuthRoute session={session} redirectTo="/dashboard">
                            <RegisterPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path="send-reset-password-email"
                    element={
                        <AuthRoute session={session} redirectTo="/dashboard">
                            <SendResetPasswordPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path="change-password"
                    element={
                        // add restricted route
                        // <PrivateRoute session={session} redirectTo="/dashboard">
                        <ChangePasswordPage />
                        // </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
