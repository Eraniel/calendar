import { Dispatch, FunctionComponent, JSX, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Event, SavedEventsByDate } from '../interfaces';
import EditForm from './EditForm';

const EventsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 0;
  h2 {
    margin: 0 0 10px 0;
    font-size: 22px;
  }
`;
const EventElement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  background-color: #f5f5f5;
  padding: 10px;
  h3 {
    margin: 0 0 10px 0;
  }
  h4 {
    margin: 0 0 10px 0;
  }
  h5 {
    margin: 10px 0;
    color: #aaa;
  }
`;
const Button = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px;
  color: white;
`;
const DeleteButton = styled(Button)`
  background-color: #db3a2e;
`;
const EditButton = styled(Button)`
  background-color: #44C2BC;
  margin: 0 0 10px 0;
`;


interface EventsListProps {
  selectedDate: Date;
  savedEventsByDate: SavedEventsByDate;
  setSavedEventsByDate: Dispatch<SetStateAction<SavedEventsByDate>>;
}
const EventsList: FunctionComponent<EventsListProps> = ({ selectedDate, savedEventsByDate, setSavedEventsByDate } : EventsListProps): JSX.Element => {

  const currentDateKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}` : '';
  const savedEventsForCurrentDate = savedEventsByDate[currentDateKey] || [];

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleDeleteEvent = (index: number) => {
    const updatedEvents = savedEventsForCurrentDate.filter((_, i) => i !== index);
    setSavedEventsByDate((prevSavedEvents) => ({
      ...prevSavedEvents,
      [currentDateKey]: updatedEvents,
    }));
  };

  const handleSaveEdit = (index: number, editedEvent: Event) => {
    setSavedEventsByDate((prevSavedEvents) => {
      const updatedEvents: SavedEventsByDate = { ...prevSavedEvents };
      const currentDayEvents = updatedEvents[currentDateKey] || [];
      currentDayEvents[index] = editedEvent;
      updatedEvents[currentDateKey] = currentDayEvents;
      return updatedEvents;
    });
    setEditIndex(null);
  };

  return (
    <EventsListContainer>
        <h2>Events for the day:</h2>
      {savedEventsForCurrentDate.map((savedEvent: Event, index: number) => (
      <EventElement key={`${currentDateKey}-${index}`}>
        {editIndex === index ? (
        <EditForm savedEvent={savedEvent} onSave={(editedEvent) => handleSaveEdit(index, editedEvent)} onCancel={() => setEditIndex(null)}/>
        ) : (
        <>
          <h3>{savedEvent.title}</h3>
          <h4>{savedEvent.description}</h4>
          <h5>Saved at:<br/> {savedEvent.time}</h5>
          <EditButton onClick={() => setEditIndex(index)}>Edit</EditButton>
          <DeleteButton onClick={() => handleDeleteEvent(index)}>DELETE</DeleteButton>
        </>
        )}
      </EventElement>
      ))}
    </EventsListContainer>
  );
};

export default EventsList;