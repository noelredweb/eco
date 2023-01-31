import { toast } from "react-toastify";

const showPopupError = (error) => {
  if (!error) {
    return;
  }
  if (error.details) {
    for (let item of error.details) {
      toast.error(item.message.replaceAll("", ""));
    }
  }
  if (error.status === "fail") {
    toast.error(error.msg.replaceAll("", ""));
  }
};

export default showPopupError;
