import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button } from "@material-ui/core";
import TextError from "./TextError";

interface formType {
  firstname: string;
  lastname: string;
  email: string;
  password: string | null;
  confirm_password: string | null;
}

const initialValues: formType = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm_password: "",
};

const onSubmit = (values: formType, onSubmitProps: any) => {
  console.log(values);
  alert("From submitted Successfully");
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Required")
    .max(20, "Password should be maximun of 20 characters")
    .min(6, "Password must be atleast of 6 characters"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Password is not matching"),
});

const SignupForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form className="form">
            <h1>Sign Up</h1>
            <Grid container spacing={3} justify="center">
              <Grid item sm={4} xs={5}>
                <Field
                  name="firstname"
                  as={TextField}
                  label="First Name"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="firstname" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item sm={4} xs={5}>
                <Field
                  className="sField"
                  name="lastname"
                  as={TextField}
                  label="Last Name"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="lastname" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item sm={8} xs={10}>
                <Field
                  name="email"
                  as={TextField}
                  label="E-mail"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="email" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item sm={8} xs={10}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="password" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item sm={8} xs={10}>
                <Field
                  name="confirm_password"
                  as={TextField}
                  label="Confirm Password"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="confirm_password"
                      component={TextError}
                    />
                  }
                  fullWidth
                />
              </Grid>
              <br />
              <Grid item sm={5} xs={8}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  size="large"
                  fullWidth
                >
                  <span className="submitBtn">Submit</span>
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
