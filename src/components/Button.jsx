export const Button = ({ id, type, handleClick, loading, children }) => {
    return (
        <button id={id} onClick={handleClick} type={type} disabled={loading}>
            {children}
        </button>
    );
};
