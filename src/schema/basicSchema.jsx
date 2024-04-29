import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("This field is required")
    .required("This field is required"),
  password: yup
    .string()
    .min(5)
    .required("This field is required"),
 
});


export const createBlogSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required").min(5),
})