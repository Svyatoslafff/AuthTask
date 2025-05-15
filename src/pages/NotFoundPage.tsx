export default function NotFoundPage() {
    return (
        <div className="overlay-container">
            <div className="overlay gap-2">
                <h1>Error 404</h1>
                <p>Page not found!</p>
                <a className="text-blue-500" href="/dashboard">
                    To home page
                </a>
            </div>
        </div>
    );
}
