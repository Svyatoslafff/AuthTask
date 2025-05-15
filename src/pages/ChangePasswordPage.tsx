import ChangePasswordForm from '../components/ChangePasswordForm';
import type { passwordInitialValues } from '../types/formik';
import { supabase } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
    const navigate = useNavigate();

    async function handleSubmit({ password }: passwordInitialValues) {
        try {
            await supabase.auth.updateUser({ password });
            toast.success('Password succesfully reset');
            navigate('/login');
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    return (
        <section className="overlay-container">
            <ChangePasswordForm handleSubmit={handleSubmit} />
        </section>
    );
}
