export const Form = ({ handleSubmit, children, className }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full max-w-md bg-white p-3 border border-cyan-300 rounded-lg shadow-md space-y-2 ${className}`}
        >
            {children}
        </form>
    );
};
