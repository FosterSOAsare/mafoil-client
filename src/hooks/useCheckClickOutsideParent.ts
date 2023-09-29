import React, { useEffect } from 'react'

const useCheckClickOutsideParent = ({ parentRef, setShow }: { parentRef: any, setShow: any }) => {
  useEffect(() => {
    function checkClick(e: any) {
      let parent = parentRef?.current
      let target = e.target;
      // if click is outside close drop down with the useState hook it has
      setShow(parent.contains(target))
    }

    if (!parentRef?.current) return

    window.addEventListener("click", checkClick);

    return () => {
      window.removeEventListener("click", checkClick);
    }
  }, [parentRef])
}

export default useCheckClickOutsideParent