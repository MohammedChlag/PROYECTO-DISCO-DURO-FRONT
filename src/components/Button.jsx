import PropTypes from 'prop-types';

export const Button = ({ children }) => {
    return <button>Button</button>;
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
};
