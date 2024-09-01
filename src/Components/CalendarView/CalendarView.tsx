import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import { Appointment } from '../../types';
import EventForm from '../EventForm/EventForm';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function CalendarView() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
      'appointments',
      []
  );
  const [selectedAppointment, setSelectedAppointment] =
      useState<Appointment | null>(null);

  const handleSubmit = (appointment: Appointment) => {
    if (appointment.id) {
      const updatedAppointments = appointments.map(a =>
          a.id === appointment.id ? appointment : a
      );
      setAppointments(updatedAppointments);
    } else {
      const newAppointment = {
        ...appointment,
        id: (appointments.length + 1).toString(),
      };
      setAppointments([...appointments, newAppointment]);
    }
    setSelectedAppointment(null);
  };

  const handleDelete = (id: string) => {
    const filteredAppointments = appointments.filter(a => a.id !== id);
    setAppointments(filteredAppointments);
    setSelectedAppointment(null);
  };

  return (
      <Flex gap={10} m={4} justifyContent={'center'} height="100%">
        <Flex grow={1} flexBasis={'100%'} overflow="auto" position={'relative'}>
          <Calendar
              appointments={appointments}
              onShowAppointmentView={appointment =>
                  setSelectedAppointment(appointment)
              }
              onDeleteAppointment={handleDelete}
              onUpdateAppointment={handleSubmit}
          />
        </Flex>
        <Flex width={'25%'} position={'absolute'} zIndex={'5'}>
          {selectedAppointment && (
              <EventForm
                  appointment={selectedAppointment}
                  onSubmit={handleSubmit}
                  onDelete={handleDelete}
                  onClose={() => setSelectedAppointment(null)}
              />
          )}
        </Flex>
      </Flex>
  );
}
