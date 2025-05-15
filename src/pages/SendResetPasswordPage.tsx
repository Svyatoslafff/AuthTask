import SendPassResEmailForm from '../components/SendPassResEmailForm';
import { supabase } from '../App';
import { useNavigate } from 'react-router-dom';
import type { emailInitialValues } from '../types/formik';

export default function SendResetPasswordPage() {
    const navigate = useNavigate();
    async function handleSubmit({ email }: emailInitialValues) {
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/change-password`,
        });
        navigate('/login');
    }

    return (
        <section className="overlay-container">
            <SendPassResEmailForm handleSubmit={handleSubmit} />
        </section>
    );
}
