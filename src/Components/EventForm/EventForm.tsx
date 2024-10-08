import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import './index.css';
import { Field, Form, Formik, FieldProps } from 'formik';
import { useMemo } from 'react';
import { Appointment } from '../../types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HexColorPicker } from 'react-colorful';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  event: Yup.string()
    .required('Event is required')
    .max(30, 'Event must be at most 30 characters'),
  status: Yup.string(),
  start: Yup.date().min(new Date(), 'Start time cannot be in the past'),
  end: Yup.date().min(Yup.ref('start'), 'End time must be after start time'),
  color: Yup.string().required('Color is required'),
});

interface EventFormProps {
  appointment: Appointment;
  onSubmit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

interface FormValues extends Appointment {
  start: Date;
  end: Date;
  color: string;
}

export default function EventForm({
  appointment,
  onSubmit,
  onDelete,
  onClose,
}: EventFormProps) {
  const label = appointment?.id ? 'Update' : 'Create';

  const initialValues: FormValues = useMemo(
    () => ({
      ...appointment,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      color: appointment.color || '#ffffff',
    }),
    [appointment],
  );

  const handleDelete = () => {
    if (appointment.id !== undefined) {
      onDelete(appointment.id.toString());
    }
  };

  return (
    <Box boxShadow={'2xl'} padding="5" rounded="xl" bg="white" width="100%">
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          const updatedAppointment = {
            ...values,
            start: values.start,
            end: values.end,
            color: values.color,
          };
          onSubmit(updatedAppointment);
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Flex justifyContent={'space-between'} alignItems="center">
              <Box>
                <Text fontSize="4xl" mb={4}>
                  {label} an appointment
                </Text>
              </Box>
              <Flex gap={2}>
                <IconButton
                  aria-label="Close"
                  icon={<CloseIcon />}
                  onClick={onClose}
                  colorScheme="gray"
                  variant="outline"
                />
              </Flex>
            </Flex>
            <Field name="event">
              {({ field }: FieldProps<string>) => (
                <FormControl isInvalid={!!errors.event && touched.event}>
                  <FormLabel>Event</FormLabel>
                  <Input {...field} value={field.value || ''} />
                  {errors.event && touched.event && (
                    <Text color="red.500">{errors.event}</Text>
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="status">
              {({ field }: FieldProps<string>) => (
                <FormControl isInvalid={!!errors.status && touched.status}>
                  <FormLabel>Status</FormLabel>
                  <Select {...field}>
                    <option value="CI">Checked In</option>
                    <option value="P">Pending</option>
                  </Select>
                  {errors.status && touched.status && (
                    <Text color="red.500">{errors.status}</Text>
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="color">
              {({ field }: FieldProps<string>) => (
                <FormControl isInvalid={!!errors.color && touched.color}>
                  <FormLabel>Color</FormLabel>
                  <Box>
                    <HexColorPicker
                      color={field.value || '#ffffff'}
                      onChange={color => setFieldValue('color', color)}
                      className="custom-colorpicker"
                    />
                  </Box>
                  <Box mt={2}>
                    <Text>Selected Color:</Text>
                    <Box
                      width="35px"
                      height="35px"
                      bg={field.value || '#ffffff'}
                      borderRadius="md"
                      border="1px solid #ccc"
                    />
                  </Box>
                  {errors.color && touched.color && (
                    <Text color="red.500">{errors.color}</Text>
                  )}
                </FormControl>
              )}
            </Field>
            <Flex gap={4} mt={4} display={'flex'} flexDirection={'column'}>
              <Flex flexBasis={'50%'}>
                <FormControl isInvalid={!!errors.start && !!touched.start}>
                  <FormLabel>Start Time</FormLabel>
                  <DatePicker
                    selected={values.start}
                    onChange={date => setFieldValue('start', date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="custom-datepicker"
                  />
                  {errors.start && touched.start && (
                    <Text color="red.500">{errors.start as string}</Text>
                  )}
                </FormControl>
              </Flex>
              <Flex flexBasis={'50%'}>
                <FormControl isInvalid={!!errors.end && !!touched.end}>
                  <FormLabel>End Time</FormLabel>
                  <DatePicker
                    selected={values.end}
                    onChange={date => setFieldValue('end', date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="custom-datepicker"
                  />
                  {errors.start && touched.start && (
                    <Text color="red.500">{errors.start as string}</Text>
                  )}
                </FormControl>
              </Flex>
            </Flex>
            <Flex mt={4}>
              {appointment.id === undefined && (
                <Button
                  onClick={onClose}
                  colorScheme="gray"
                  variant="outline"
                  mr={2}
                >
                  Cancel
                </Button>
              )}
              <Button colorScheme={'whatsapp'} type="submit" mr={2}>
                {label}
              </Button>
              {appointment.id !== undefined && (
                <Button
                  onClick={handleDelete}
                  colorScheme="red"
                  variant="outline"
                >
                  Discard
                </Button>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
