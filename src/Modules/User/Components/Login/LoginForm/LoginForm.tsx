import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers';
import { RegisteredUser, UnauthorizedUser } from 'Models';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import { HttpServices } from 'Services/Http/HttpServices';
import { IServerError } from 'Services/Http/HttpServices/IServerError';
import { FormValues, IFormProps, InnerForm } from './InnerForm';

interface IState extends IFormProps {}

interface IProps {
  updateUserInfo?: (user: RegisteredUser) => void;
  getUserInfo?: () => void;
}

export class LoginForm extends BaseComponent<IProps, IState> {
  private static validate(values: FormValues) {
    const errors: FormikErrors<any> = {};
    const { username, password } = values;
    const { required } = Rules;
    const usernameValidator = new Validator('Username or Email', username, [
      required,
    ]);
    const passwordValidator = new Validator('Password', password, [required]);

    errors.username = usernameValidator.validate();
    errors.password = passwordValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  @Inject('UserServices') private userServices: UserServices;
  private readonly initialValues: FormValues;

  constructor(props: IProps) {
    super(props);

    this.initialValues = {
      username: '',
      password: '',
    };

    this.state = {
      success: false,
      serverError: '',
    };

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

  public handleSubmit(
    values: FormValues,
    { setSubmitting, resetForm }: FormikActions<any>,
  ) {
    this.clearFormAlert();
    const { username, password } = values;
    const user = new UnauthorizedUser(username, password);

    this.userServices.login(user).subscribe(
      () => {
        this.showFormAlerSuccess();
        setSubmitting(false);
        resetForm();
        this.props.getUserInfo();
      },
      (err: IServerError) => {
        let errorMessage = HttpServices.getServerErrorMessage(err);
        errorMessage = this.handleErrorMessageFromServer(errorMessage);
        this.showError(errorMessage);
        this.showFormAlertError(errorMessage);
        setSubmitting(false);
      },
    );
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
        validate={LoginForm.validate}
      />
    );
  }

  private handleErrorMessageFromServer = (err: string) => {
    if (err === 'Bad credentials') {
      return 'Username or password is incorrect';
    } else {
      return err;
    }
  };
}
