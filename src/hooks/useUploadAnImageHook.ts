import { toast } from 'react-toastify'
import { useEffect } from 'react';

import { useUploadAFileRequestMutation } from '@/apis/filesApi';
import compressImage from '@/utils/compressImage';

const useUploadAnImageHook = (cb?: any) => {
  const [uploadAFile, { error: fileUploadError, data: fileUploadSuccess, isLoading: fileUploadLoading }] = useUploadAFileRequestMutation();

  async function storeImage(e: any) {
    if (e.target.files.length === 0) return;

    let compressed = await compressImage(e.target.files[0]);
    if (compressed?.error) {
      toast.error("An error has occurred", { autoClose: 1500 });
      return;
    }

    uploadAFile({ file: compressed });


  }

  useEffect(() => {
    if (!fileUploadSuccess) return;

    toast("Image uploaded successfully");
    cb(fileUploadSuccess)
  }, [fileUploadSuccess]);
  return { storeImage, fileUploadSuccess, fileUploadLoading, fileUploadError }
}

export default useUploadAnImageHook