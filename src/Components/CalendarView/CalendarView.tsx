import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { Appointment } from "../../types";
import EventForm from "../EventForm/EventForm";

export default function CalendarView() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const handleSubmit = (appointment: Appointment) => {
        if (appointment.id) {
            setAppointments((prevAppointments) =>
                prevAppointments.map((a) =>
                    a.id === appointment.id ? appointment : a
                )
            );
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
        setAppointments((prevAppointments) =>
            prevAppointments.filter((a) => a.id !== id)
        );
        setSelectedAppointment(null);
    };

    const handleEventDelete = (appointmentId: string) => {
        handleDelete(appointmentId);
    };

    const handleUpdateAppointment = (updatedAppointment: Appointment) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((a) =>
                a.id === updatedAppointment.id ? updatedAppointment : a
            )
        );
    };

    return (
        <Flex gap={10} m={4} justifyContent={'center'} height="100%">
            <Flex grow={1} flexBasis={"100%"} overflow="auto" position={'relative'}>
                <Calendar
                    appointments={appointments}
                    onShowAppointmentView={(appointment) => setSelectedAppointment(appointment)}
                    onDeleteAppointment={handleEventDelete}
                    onUpdateAppointment={handleUpdateAppointment}
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
