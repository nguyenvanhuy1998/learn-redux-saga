import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/formfields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) {
        return true;
      }
      const parts = value.split(' ') || [];
      const result = parts.filter((x) => Boolean(x)).length >= 2;
      return result;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .required('Please enter age')
    .typeError('Please enter a valid number'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark')
    .typeError('Please enter a valid number'),
  gender: yup
    .string()
    .required('Please select gender')
    .oneOf(['male', 'female'], 'Please select either male or female'),
  city: yup.string().required('Please select city'),
});

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (formValues: Student) => {
    console.log('Submit:', formValues);
  };

  return (
    <Box
      style={{
        maxWidth: '400px',
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ]}
        />
        <SelectField name="city" control={control} label="City" options={cityOptions} />
        <Box
          style={{
            marginTop: '24px',
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
