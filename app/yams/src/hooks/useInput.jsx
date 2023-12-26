import { useState } from "react";
import PropTypes from 'prop-types';

// Hook qui permet de gérer la création d'un champ input voir dans le composant Form pour une implémentation
const useInput = ({ initialValue }) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: e => {
                const { value } = e.target;
                setValue(value);
            }
        }
    };
};

useInput.propTypes = {
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};