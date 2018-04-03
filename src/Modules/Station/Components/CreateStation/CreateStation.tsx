import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';
import './CreateStation.scss';

interface IStationFormValues {
  name: string;
}

const InnerForm = (props: FormikProps<IStationFormValues>) => {
  const { touched, errors, isSubmitting, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} className="form-wrapper">
      <FormGroup className="input-wrapper">
        <InputGroup>
          <Field
            type="text"
            name="stationName"
            className="transparent-form-control"
            placeholder="Your team station"
          />
        </InputGroup>

        <Button
          color="success"
          block
          disabled={isSubmitting}
          className="button-submit">
          <i className="fa fa-paper-plane-o input--fa" />
        </Button>
      </FormGroup>

      {touched.name &&
        errors.name && (
          <FormFeedback className="text-error">{errors.name}</FormFeedback>
        )}
    </Form>
  );
};

// The type of props FormWrapper receives
interface IFormProps {
  initialStationName?: string;
  handleSubmit: any;
}

const FormWrapper = withFormik<IFormProps, IStationFormValues>({
  mapPropsToValues: props => {
    return {
      name: props.initialStationName || '',
    };
  },

  validate: (values: IStationFormValues) => {
    const errors: FormikErrors<any> = {};
    const { validStationName } = Rules;
    const stationNameValidator = new Validator('Email', values.name, [
      validStationName,
    ]);
    errors.stationName = stationNameValidator.validate();
    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (values: IStationFormValues, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);

export class CreateStation extends Component {
  public handleSubmit = (formValues: IStationFormValues) => {
    console.log(formValues);
  };

  public render() {
    return <FormWrapper handleSubmit={this.handleSubmit} />;
  }
}