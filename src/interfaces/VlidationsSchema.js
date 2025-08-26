import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("فرمت ایمیل صحیح نمی باشد")
    .required("ایمیل باید وارد شود"),
  password: yup
    .string()
    .min(4, "رمز عبور باید حداقل چهار حرف باشد")
    .required("رمز عبور باید وارد شود"),
});
