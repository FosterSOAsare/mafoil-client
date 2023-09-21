import { useUserSlice } from '@/slices/user.slice'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useProduceErrorIfUserIsNotLoggedIn = (id: string, cb: any) => {
  // const user_id = useMemo(() => {
  //   return id
  // }, [id])
  // if (user_id) {
  //   toast.error('Fucntionality is reserved fro logged in users . Please login into your account')
  //   return
  // }
  // cb()
}

export default useProduceErrorIfUserIsNotLoggedIn