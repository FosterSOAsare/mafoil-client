import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


import { useLazyCheckoutCartRequestQuery } from '@/apis/cartApi'
import { clearCart } from '@/slices/cart.slice'
import { setData, useUserSlice } from '@/slices/user.slice'

const useCheckoutCart = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(useUserSlice)


  const [checkoutCart, { data, error, isLoading }]: any = useLazyCheckoutCartRequestQuery()
  async function checkOut() {
    checkoutCart()
  }

  useEffect(() => {
    if (!data) return
    toast.success('Order has been successfully added', { autoClose: 1500 })
    console.log(data)
    setTimeout(() => {
      dispatch(clearCart())
      dispatch(setData({ balance: user?.balance - data?.total }))
    }, 2000)
  }, [data])

  useEffect(() => {
    if (!error) return
    let err = error?.data?.error;
    toast.error(err || 'An error occurred while placing order', { autoClose: 1500 })
  }, [error])

  return { checkOut, isLoading }
}

export default useCheckoutCart