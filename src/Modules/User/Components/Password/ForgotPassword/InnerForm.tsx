import { LoadingIndicator } from 'Components/LoadingIndicator';
import { Field, Form, FormikProps } from 'formik';
import * as React from 'react';
import { Fragment } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

export interface IFormValues {
  email: string;
}

export interface IFormProps {
  success: boolean;
  serverError: string;
}

export const InnerForm = (props: IFormProps & FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting, success } = props;
  return (
    <Fragment>
      {!success ? (
        <Fragment>
          <h1>Forgot password?</h1>
          <p className="text-muted">
            Please enter the email address registered on your account.
          </p>
          <Form>
            <FormGroup>
              <InputGroup>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your email"
                />
                {touched.email &&
                  errors.email && <FormFeedback>{errors.email}</FormFeedback>}
              </InputGroup>
            </FormGroup>
            {isSubmitting ? (
              <div className="d-flex justify-content-center">
                <LoadingIndicator />
              </div>
            ) : (
              <Button color="success" block disabled={isSubmitting}>
                Reset password
              </Button>
            )}
          </Form>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Email Sent</h1>
          <p>
            An email with instructions on how to reset your password has been
            sent to your email. Check your spam or junk folder if you don’t see
            the email in your inbox.
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};
