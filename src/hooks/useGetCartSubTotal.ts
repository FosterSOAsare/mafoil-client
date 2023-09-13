import React, { useMemo } from 'react'
import { cartItemType } from '@/slices/cart.slice';
import { productType } from '@/types/product.type';

const useGetCartSubTotal = ({ cart, products }: { cart: cartItemType[], products: productType[] }) => {
  const subTotal = useMemo(() => {
    if (cart?.length === 0 || products?.length === 0) return 0
    let itemTotalPrices = cart.map((item: cartItemType) => {
      let product = products.find((p: productType) => item.id === p.id);
      if (!product) return 0;
      return product.price * item.count;
    });
    return itemTotalPrices.reduce((total: number, itemTotal: number) => total + itemTotal, 0);
  }, [cart, products]);
  return subTotal
}

export default useGetCartSubTotal