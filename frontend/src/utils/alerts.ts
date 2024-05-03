import swal from "sweetalert";

const success = (msg: string) => {
  swal("", msg, "success");
};

const info = (msg: string) => {
  swal("", msg, "info");
};

const error = (msg: string) => {
  swal("", msg, "error");
};

export const alerts = { success, info, error };
