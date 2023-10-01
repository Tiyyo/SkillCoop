import { toast } from "react-toastify"

export default {
  success(message: string) {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1500,
      theme: "light",
    })
  },
  error(message: string) {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2500,
      theme: "light",
    })
  },
  info(message: string) {
    toast.info(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1500,
      theme: "light",
    })
  }
}