import React, { useMemo } from 'react'
import { cartItemType } from '@/slices/cart.slice';
import { productType } from '@/types/product.type';

const useGetCartSubTotal = ({ cart }: { cart: cartItemType[] }) => {
  const subTotal = useMemo(() => {
    if (cart?.length === 0) return 0
    let itemTotalPrices = cart.map((item: cartItemType) => {
      return item.price * item.count;
    });
    return itemTotalPrices.reduce((total: number, itemTotal: number) => total + itemTotal, 0);
  }, [cart]);
  return subTotal
}

export default useGetCartSubTotal