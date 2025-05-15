// import { useNavigate } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import type { authInitialValuesType } from '../types/formik';
// import type { LoginPageProps } from '../types/props';
import { supabase } from '../App';
import { toast } from 'react-hot-toast';

// const loginStyles = {};

export default function LoginPage() {
    // const navigate = useNavigate();
    async function handleSubmit(values: authInitialValuesType) {
        const { email, password } = values;
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error(error?.message);
            return;
        }
        toast.success('Succesfully logged in!');
    }
    return (
        <section className="overlay-container">
            <AuthComponent handleSubmit={handleSubmit} type="login" />
        </section>
    );
}
