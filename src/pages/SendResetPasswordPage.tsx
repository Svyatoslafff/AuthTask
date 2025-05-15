import SendPassResEmailForm from '../components/SendPassResEmailForm';
import { supabase } from '../App';
import { useNavigate } from 'react-router-dom';
import type { emailInitialValues } from '../types/formik';
import toast from 'react-hot-toast';

export default function SendResetPasswordPage() {
    const navigate = useNavigate();
    async function handleSubmit({ email }: emailInitialValues) {
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/change-password`,
            });
            toast.success('Email succesfully sent');
            navigate('/login');
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    return (
        <section className="overlay-container">
            <SendPassResEmailForm handleSubmit={handleSubmit} />
        </section>
    );
}
