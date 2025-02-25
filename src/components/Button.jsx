export const Button = ({ id, type, loading, children }) => {
    return (
        <button id={id} type={type} disabled={loading}>
            {children}
        </button>
    );
};
