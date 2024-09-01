import { Box, Flex, Text } from '@chakra-ui/react';
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from './Calendar.constants';
import { Appointment } from '../../types';

interface AppointmentEventProps {
  appointment: Appointment;
  onDoubleClick: () => void;
}

export default function AppointmentEvent({
  appointment,
  onDoubleClick,
}: AppointmentEventProps) {
  const { status, event, color } = appointment;

  let background = '#c7edca';

  if (color && color !== '#ffffff') {
    background = color;
  } else if (status && status in EVENT_STATUS_COLORS) {
    background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  }

  return (
    <Box
      bg={background}
      p={1}
      height="100%"
      color="black"
      onDoubleClick={onDoubleClick}
    >
      <Flex alignItems={'center'} justifyContent="flex-start">
        <Flex>
          <Text fontSize="xs">{event}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
