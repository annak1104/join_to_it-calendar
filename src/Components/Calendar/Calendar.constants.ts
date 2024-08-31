import moment from "moment";
import { EventItem } from "../../types";

export enum AppointmentStatusCode {
  Pending = "P",
  CheckedIn = "CI",
}

export const EVENT_STATUS_COLORS: Record<AppointmentStatusCode, string> = {
  [AppointmentStatusCode.Pending]: "#bee2fa",
  [AppointmentStatusCode.CheckedIn]: "#c7edca",
};

export const EVENTS: EventItem[] = [
  {
    start: moment("2024-08-31T10:00:00").toDate(),
    end: moment("2024-08-31T11:00:00").toDate(),
    data: {
      appointment: {
        id: '1',
        status: "P",
        event: "Event",
        start: "2024-08-31T10:00:00",
        end: "2024-08-31T11:00:00",
      },
    },
    isDraggable: true,
  },
  {
    start: moment("2024-08-31T12:00:00").toDate(),
    end: moment("2024-08-31T15:00:00").toDate(),
    data: {
      appointment: {
        id: '2',
        status: "CI",
        event: "Event",
        start: "2024-08-31T12:00:00",
        end: "2024-08-31T15:00:00",
      },
    },
    isDraggable: false,
  },
];
