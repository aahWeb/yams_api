import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../store/me";
import { changeloggedIn } from "../store/auth";

// Hook qui permet de gérer la création d'un champ input voir dans le composant Form pour une implémentation
const useMe = () => {
    const { user } = useSelector((s) => s.me)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMe())
    }, [])

    useEffect(() =>{
        if( Object.keys(user || {}).length > 0)
            dispatch(changeloggedIn(true))
    }, [user])

    return {
       user
    };
};

useMe.propTypes = {
    
};

export default useMe;