export type Appointment = {
  id?: string;
  status?: string;
  event?: string;
  start: string | Date;
  end: string | Date;
  color?: string | '#c7edca';
};

export type EventItem = {
  start: Date;
  end: Date;
  data?: { appointment?: Appointment };
  isDraggable?: boolean;
};
