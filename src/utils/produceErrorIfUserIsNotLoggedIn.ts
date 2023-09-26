import { toast } from 'react-toastify'

const produceError = (userId: string, cb: any) => {
  if (!userId) {
    toast.error('Functionality is reserved for only logged in users . Please login into your account')
    return
  }

  cb()

}

export default produceError