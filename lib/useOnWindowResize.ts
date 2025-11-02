import { useEffect } from "react"

export const useOnWindowResize = (callback: () => void) => {
  useEffect(() => {
    const handleResize = () => {
      callback()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [callback])
}
