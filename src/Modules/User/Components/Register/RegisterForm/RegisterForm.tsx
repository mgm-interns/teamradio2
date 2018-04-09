import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers/index';
import { RegisteredUser } from 'Models/User';
import * as React from 'react';
import { Component } from 'react';
import { UserServices } from 'Services/Http/index';
import { FormValues, IFormProps, InnerForm } from './InnerForm';

interface IState extends IFormProps {} // tslint:disable-line

interface IProps {} // tslint:disable-line

export class RegisterForm extends Component<IProps, IState> {
  private userServices: UserServices;
  private initialValues: FormValues;

  constructor(props: IProps) {
    super(props);

    this.initialValues = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.state = {
      success: false,
      serverError: '',
    };

    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public showFormAlertError(err: string) {
    this.setState({
      serverError: err,
    });
  }

  public showFormAlerSuccess() {
    this.setState({ success: true });
  }

  public clearFormAlert() {
    this.setState({
      serverError: '',
      success: false,
    });
  }

  public handleEmptyUsernameFormValues(values: FormValues) {
    if (!values.username) {
      values.username = undefined;
    }
  }

  public handleSubmit(values: FormValues, formikActions: FormikActions<any>) {
    this.clearFormAlert();
    this.handleEmptyUsernameFormValues(values);
    this.register(values, formikActions);
  }

  public register(values: FormValues, formikActions: FormikActions<any>) {
    const { setSubmitting, resetForm } = formikActions;
    this.userServices.register(values).subscribe(
      (res: RegisteredUser) => {
        this.showFormAlerSuccess();
        setSubmitting(false);
        resetForm();
      },
      (err: string) => {
        this.showFormAlertError(err);
        setSubmitting(false);
      },
    );
  }

  public validate(values: FormValues) {
    const errors: FormikErrors<any> = {};
    const { name, username, email, password, confirmPassword } = values;
    const {
      required,
      validEmail,
      validUsername,
      validDisplayName,
      maxLength15,
      minLength6,
      matchPassword,
    } = Rules;
    const displayNameValidator = new Validator('Display name', name, [
      required,
      validDisplayName,
      maxLength15,
    ]);
    const usernameValidator = new Validator('Username', username, [
      validUsername,
    ]);
    const emailValidator = new Validator('Email', email, [
      required,
      validEmail,
    ]);
    const passwordValidator = new Validator('Password', password, [
      required,
      minLength6,
    ]);
    const confirmPasswordValidator = new Validator(
      'Confirm password',
      confirmPassword,
      [required, matchPassword(password)],
    );

    errors.name = displayNameValidator.validate();
    errors.username = usernameValidator.validate();
    errors.email = emailValidator.validate();
    errors.password = passwordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  public render() {
    const { success, serverError } = this.state;
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => (
          <InnerForm
            {...formikProps}
            success={success}
            serverError={serverError}
          />
        )}
        validate={this.validate}
      />
    );
  }
}