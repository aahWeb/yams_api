import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../store/me";
import { changeloggedIn } from "../store/auth";

/**
 * HOC ( composant de haut niveau ) 
 * Hooks permettant de vérifier si après rechargement de la page l'utilisateur est encore connecté
 * - la méthode fetchMe fait une requête sur l'API avec le credentials si celui-ci existe ( cookie créé dans le navigateur), alors la connexion n'échoue pas et on met à true loggeIn 
 * 
 */
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

export default useMe;