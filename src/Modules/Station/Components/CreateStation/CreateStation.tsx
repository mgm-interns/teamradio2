import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Redirect, Router } from 'react-router';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';
import { StationServices } from 'Services/Http';
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
            name="name"
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
    const { validStationName, required } = Rules;
    const stationNameValidator = new Validator('Station name', values.name, [
      required,
      validStationName,
    ]);
    errors.name = stationNameValidator.validate();
    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (values: IStationFormValues, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);

export class CreateStation extends Component<any, any> {
  private stationServices: StationServices;

  constructor(props: any) {
    super(props);
    this.stationServices = new StationServices();
  }

  public handleSubmit = (formValues: IStationFormValues) => {
    const name = formValues.name;
    this.stationServices.createStation(name).subscribe(
      (res: object) => {
        console.log(`Success: ${res}`);
      },
      (err: any) => {
        console.log(`Error when create: ${err}`);
      },
    );

    console.log(`Ten ${formValues.name}`);
  };

  public render() {
    return <FormWrapper handleSubmit={this.handleSubmit} />;
  }
}
