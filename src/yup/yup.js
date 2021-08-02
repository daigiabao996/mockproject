import * as yup from "yup";

const SignInSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const usernameRegex =
  /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
const RegisterSchema = yup.object({
  firstname: yup.string().required("You must fill your name"),
  lastname: yup.string().required("You must fill your name"),
  username: yup
    .string()
    .matches(
      usernameRegex,
      "Name can only use letters,numbers, minimum length is 8 characters"
    )
    .required("Username is required"),
  password: yup.string().required("Password is required"),
});
const SearchSchema = yup.object({
  search: yup.string(),
});
export { SignInSchema, SearchSchema, RegisterSchema };
