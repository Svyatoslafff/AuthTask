import { useState, type ChangeEvent } from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import type { passwordInitialValues } from '../types/formik';
import { supabase } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        password: '',
        repeatPassword: '',
    });
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    async function handleSubmit({ password }: passwordInitialValues) {
        try {
            await supabase.auth.updateUser({ password });
            navigate('/login');
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    function handlePassChange(
        evt: ChangeEvent<HTMLInputElement>,
        type: 'pass' | 'repeat'
    ) {
        const { value } = evt.target;
        setPasswords(prev => {
            const updatedPasswords =
                type === 'pass'
                    ? { ...prev, password: value }
                    : { ...prev, repeatPassword: value };
            setIsPasswordMatch(
                updatedPasswords.password === updatedPasswords.repeatPassword &&
                    !!updatedPasswords.password &&
                    !!updatedPasswords.repeatPassword
            );
            return updatedPasswords;
        });
    }

    return (
        <section className="overlay-container">
            <ChangePasswordForm
                handleSubmit={handleSubmit}
                isPasswordMatch={isPasswordMatch}
                handlePassChange={handlePassChange}
                passwords={passwords}
            />
        </section>
    );
}
