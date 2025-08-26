// import * as yup from "yup";
// import useAsynchronous from "./useAsynchronous";

// export default function useValidation(account) {
//   const schema = yup.object().shape({
//     email: yup
//       .string()
//       .email("فرمت ایمیل صحیح نمی باشد")
//       .required("ایمیل باید وارد شود"),
//     password: yup
//       .string()
//       .min(4, "رمز عبور باید حداقل چهار حرف باشد")
//       .required("رمز عبور باید وارد شود"),
//   });

//   const newSchema = schema;

//   const { data, error } = useAsynchronous(
//     newSchema.validate.bind(schema),
//     account,
//     {
//       abortEarly: false,
//     }
//   );

//   console.log(data);
  
  
//   return { data, error };
// }
