import { useCallback } from 'react'
import { fetchMe } from '../store/login'
import { useDispatch, useSelector } from 'react-redux';

export function useAuth(){
    const{ account } = useSelector(state => state.auth)
    const dispatch = useDispatch();
   
    const authenticate = useCallback( () => {
       dispatch(fetchMe())
    }, [])
    

    return {
        account,
        authenticate
    }
}