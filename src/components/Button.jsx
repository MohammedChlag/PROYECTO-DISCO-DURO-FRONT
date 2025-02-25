import PropTypes from 'prop-types';

export const Button = ({ id, handleClick, children }) => {
    return (
        <button id={id} onClick={handleClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
};
