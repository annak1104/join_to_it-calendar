import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "./index.css";
import AppointmentEvent from "./AppointmentEvent";
import { Appointment, EventItem } from "../../types";

const localizer = momentLocalizer(moment);

const initProps = {
    localizer: localizer,
    defaultDate: new Date(),
    defaultView: Views.MONTH,
    max: moment("2024-08-31T18:00:00").toDate(),
    min: moment("2024-08-31T09:00:00").toDate(),
    step: 15,
    timeslots: 4,
};

const DndCalendar = withDragAndDrop<EventItem>(BigCalendar);

interface CalendarProps {
    appointments: Appointment[];
    onShowAppointmentView: (appointment: Appointment) => void;
    onDeleteAppointment: (appointmentId: string) => void;
    onUpdateAppointment: (updatedAppointment: Appointment) => void;
}

export const Calendar = ({
                             appointments = [],
                             onShowAppointmentView,
                             onUpdateAppointment,
                         }: CalendarProps) => {

    const components = {
        event: ({ event }: { event: any }) => {
    console.log(event, "event => Calendar");
            const data = event?.data;
            if (data?.appointment)
                return (
                    <AppointmentEvent
                        appointment={data?.appointment}
                        onDoubleClick={() => onShowAppointmentView(data.appointment)}
                    />
                );

            return null;
        },
    };

    const handleEventDrop = ({
                                 event,
                                 start,
                                 end,
                                 isAllDay,
                             }: {
        event: EventItem;
        start: string | Date;
        end: string | Date;
        isAllDay: boolean;
    }) => {
        const updatedAppointment = {
            ...event.data?.appointment,
            start: start,
            end: end,
        };
        if (updatedAppointment) {
            onUpdateAppointment(updatedAppointment);
        }
    };

    const events = appointments.map((appointment) => ({
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        data: { appointment },
    }));

    return (
        <DndCalendar
            onSelectSlot={({ start, end }) => {
                onShowAppointmentView({ start, end });
            }}
            onDoubleClickEvent={(event) => {
                const appointment = event?.data?.appointment;
                appointment && onShowAppointmentView(appointment);
            }}
            onEventDrop={handleEventDrop}
            events={events}
            style={{ width: "100%" }}
            components={components}
            selectable
            {...initProps}
        />
    );
};
