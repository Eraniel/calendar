import { Dispatch, FunctionComponent, JSX, SetStateAction } from 'react';
import styled from 'styled-components';
import { Event, SavedEventsByDate } from '../interfaces';

const EventsListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const EventElement = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EventsListProps {
  selectedDate: Date;
  savedEventsByDate: SavedEventsByDate;
  setSavedEventsByDate: Dispatch<SetStateAction<SavedEventsByDate>>;
}
const EventsList: FunctionComponent<EventsListProps> = ({ selectedDate, savedEventsByDate, setSavedEventsByDate } : EventsListProps): JSX.Element => {

  const currentDateKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}` : '';
  const savedEventsForCurrentDate = savedEventsByDate[currentDateKey] || [];
  

  return (
    <EventsListContainer>
      {savedEventsForCurrentDate.map((savedEvent: Event, index: number) => (
        <EventElement key={`${currentDateKey}-${index}`}>
          <h3>{savedEvent.title}</h3>
          <h4>{savedEvent.description}<br/>{savedEvent.time}</h4>
          
        </EventElement>))}
    </EventsListContainer>
  );
};

export default EventsList;