import { useDispatch } from 'react-redux';

import { useLazyLogoutRequestQuery } from '@/apis/authApi';
import { logout } from '@/slices/user.slice';
import { clearCart } from '@/slices/cart.slice';
import { clearWishlist } from '@/slices/wishlist.slice';

const useLogoutUser = () => {
  const dispatch = useDispatch();

  const [logoutRequest] = useLazyLogoutRequestQuery();

  function logoutUser() {
    try {
      logoutRequest();
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearWishlist())
    } catch (e) {
      console.log(e);
    }
  }
  return logoutUser
}

export default useLogoutUser