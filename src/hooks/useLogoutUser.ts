import { useDispatch } from 'react-redux';

import { useLazyLogoutRequestQuery } from '@/apis/authApi';
import { logout } from '@/slices/user.slice';
import { clearCart } from '@/slices/cart.slice';
import { clearWishlist } from '@/slices/wishlist.slice';
import { deleteCookie } from '@/utils/cookie';
import { useRouter } from 'next/router';
import { clearNotifications } from '@/slices/notifications.slice';

const useLogoutUser = () => {
  const dispatch = useDispatch();

  const [logoutRequest] = useLazyLogoutRequestQuery();

  function logoutUser() {
    try {
      logoutRequest();
      deleteCookie('access_token')

      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearWishlist());
      dispatch(clearNotifications())
    } catch (e) {
      console.log(e);
    }
  }
  return logoutUser
}

export default useLogoutUser