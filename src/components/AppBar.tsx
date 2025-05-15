import { Outlet } from 'react-router-dom';

export default function AppBar() {
    return (
        <>
            <header className="flex h-20 w-full relative justify-end p-6 ">
                <a
                    href="/dashboard"
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-max w-max"
                >
                    <h1 className="text-4xl font-bold">Logo</h1>
                </a>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
