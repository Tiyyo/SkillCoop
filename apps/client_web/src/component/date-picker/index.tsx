import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import dateHandler from "../../utils/date.handler";

interface InputDateProps {
  updateState?: (e: any) => void;
  actionType?: string;
  label?: string;
  defaultValue?: string;
}


function InputDate({ updateState, label, defaultValue }: InputDateProps) {
const today = new Date();
const options = {
  title: "Select a date",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  minDate: new Date(dateHandler.getTodayFormatedForInput()),
  theme: {
    background: "bg-base-light",
    todayBtn: "bg-primary-800",
    clearBtn: "bg-base border border-primary-500",
    icons: "",
    text: "text-primary-1100",
    input: "w-full",
    inputIcon: "text-primary-600 ",
    selected: "bg-primary-800",
    disabledText: "text-gray-200",
  },
  icons: {
    prev: "",
    next: "",
  },
  datepickerClassNames: "top-12 left-1/2 -translate-x-1/2 ",
  defaultDate: new Date(defaultValue || today),
  language: "en",
};

  const [show, setShow] = useState<boolean>(false);

  const getDateFormatedLikeInputDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day}`;
  };

    const handleChange = (selectedDate: Date) => {
    const formatDate = getDateFormatedLikeInputDate(selectedDate);
    if (updateState) {
      updateState(formatDate);
      return;
    }
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };
  return (
    <div className="relative w-full">
      <p
        className="block py-2 text-md font-semibold text-primary-1100"
      >
        {label}
      </p>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
}

export default InputDate;
