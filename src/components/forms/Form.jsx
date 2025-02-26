export const Form = ({ handleSubmit, children, className }) => {
    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
        </form>
    );
};
