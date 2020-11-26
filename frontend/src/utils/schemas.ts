import * as Yup from "yup";

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required().max(120).min(3),
  email: Yup.string().required().email(),
  contact_number: Yup.string()
    .required()
    .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/), // (xx) xxxxx-xxxx
});

export const SignUpInitialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birth_date: "",
  contact_number: "",
};

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required().max(120).min(3),
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
      "Password must contain upper and lowercase letters and numbers."
    ), // Minimum eight characters, letter upper and lower case and numbers.
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords does not match."),
  birth_date: Yup.string()
    .required()
    .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/), // yyyy-mm-dd
  contact_number: Yup.string()
    .required()
    .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/), // (xx) xxxxx-xxxx
});

export const SignInInitialState = {
  email: "",
  password: "",
};

export const SignInSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
      "Password must contain upper and lowercase letters and numbers."
    ), // Minimum eight characters, letter upper and lower case and numbers.
});
