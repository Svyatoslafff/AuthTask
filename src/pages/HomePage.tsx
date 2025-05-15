import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../App';
import type { User } from '@supabase/supabase-js';
import UserStatistics from '../components/UserStatistics';
import type { HomePageProps } from '../types/props';

export default function HomePage({ session, setSession }: HomePageProps) {
    const [user, setUser] = useState<User | null>(null);

    async function handleLogoutClick() {
        try {
            await supabase.auth.signOut();
            toast.success('Succesfully logged out');
            setSession(null);
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    useEffect(() => {
        async function getUserInfo() {
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                toast.error(error.message);
            } else {
                setUser(data.user);
            }
        }
        getUserInfo();
    }, []);
    if (!user) return null;
    return (
        <section className="overlay-container">
            <UserStatistics
                session={session}
                user={user}
                handleLogoutClick={handleLogoutClick}
            />
        </section>
    );
}
