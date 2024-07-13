import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField } from 'components/formfields';
import { Student } from 'models';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
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
        <InputField name="city" control={control} label="City" />
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
