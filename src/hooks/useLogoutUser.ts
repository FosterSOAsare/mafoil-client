import React from 'react'
import { useDispatch } from 'react-redux';

import { useLazyLogoutRequestQuery } from '@/apis/authApi';
import { logout } from '@/slices/user.slice';

const useLogoutUser = () => {
  const dispatch = useDispatch();

  const [logoutRequest] = useLazyLogoutRequestQuery();

  function logoutUser() {
    try {
      logoutRequest();
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  }
  return logoutUser
}

export default useLogoutUser