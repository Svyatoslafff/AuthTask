import { useNavigate } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import type { authInitialValuesType } from '../types/formik';
import { supabase } from '../App';
import toast from 'react-hot-toast';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export default function RegisterPage() {
    const navigate = useNavigate();
    async function handleSubmit(values: authInitialValuesType) {
        const { email, password } = values;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
            },
        });
        console.log(data);
        console.log(error);
        if (error) {
            toast.error(error?.message);
            return;
        }
        toast(() => (
            <div className="flex items-center gap-1">
                <IoMdInformationCircleOutline size={24} />
                <p>Verify email was sent</p>
            </div>
        ));

        navigate('/login');
    }
    return (
        <section className="overlay-container">
            <AuthComponent handleSubmit={handleSubmit} type="register" />
        </section>
    );
}
