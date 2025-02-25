//importar con forms.css y crearlo
const Form = ({ className, hadleSubmit, children }) => {
    return (
        <form className={className} onSubmit={hadleSubmit}>
            {children}
        </form>
    );
};

export default Form;
