import { Button } from '@mui/material';
import type { UserStatisticsProps } from '../types/props';
import normalizeStringDate from '../utils/normalizeStringDate';

export default function UserStatistics({
    user,
    session,
    handleLogoutClick,
}: UserStatisticsProps) {
    return (
        <div className="overlay w-[450px]">
            <h1>User</h1>
            <ul className="flex flex-col gap-4">
                <li>
                    <p>
                        <span className="font-bold">Email:</span> {user.email}
                    </p>
                </li>
                <li>
                    <p>
                        <span className="font-bold">Created at:</span>{' '}
                        {normalizeStringDate(user.created_at)}
                    </p>
                </li>
                <li>
                    <p>
                        <span className="font-bold">ID:</span> {user.id}
                    </p>
                </li>
            </ul>
            {session && (
                <Button
                    className="w-full"
                    variant="outlined"
                    onClick={handleLogoutClick}
                >
                    Logout
                </Button>
            )}
        </div>
    );
}
