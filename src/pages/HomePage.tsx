import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../App';
import type { User } from '@supabase/supabase-js';
import UserStatistics from '../components/UserStatistics';

export default function HomePage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUserInfo() {
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                toast.error(error.message);
            } else {
                console.log(data);
                setUser(data.user);
            }
        }
        getUserInfo();
    }, []);
    if (!user) return null;
    return (
        <section className="overlay-container">
            <UserStatistics user={user} />
        </section>
    );
}
