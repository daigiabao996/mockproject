import * as yup from "yup";

const SignInSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const RegisterSchema = yup.object({
  firstname: yup.string().required("You must fill your name"),
  lastname: yup.string().required("You must fill your name"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const SearchSchema = yup.object({
  search: yup.string(),
});
export { SignInSchema, SearchSchema, RegisterSchema };
