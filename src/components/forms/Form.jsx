export const Form = ({ handleSubmit, children }) => {
    return <form onSubmit={handleSubmit}>{children}</form>;
};
