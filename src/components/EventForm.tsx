import { Dispatch, FunctionComponent, JSX, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { SavedEventsByDate } from '../interfaces';

const EventFormContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  padding: 0 10px 10px 0;
  h2 {
    margin: 0 0 10px 0;
    font-size: 22px;
  }
  input {
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  p {
    margin: 0 0 10px 0;
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  background-color: #44C2BC;
  color: white;
  cursor: pointer;
`;

interface EventFormProps {
  selectedDate: Date | null;
  setSavedEventsByDate: Dispatch<SetStateAction<SavedEventsByDate>>;
}
const EventForm: FunctionComponent<EventFormProps> = ({ selectedDate, setSavedEventsByDate } : EventFormProps): JSX.Element => {
  const [inputData, setInputData] = useState({ title: '', description: '', time: '' });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInputData((prevInput) => ( {...prevInput, [name]: value} ));
  };
  const currentDayKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}` : '';
  const saveEvent = () => {
    if (inputData.title.trim() !== '') {
      setSavedEventsByDate((prevSavedEvents) => {
        const updatedEvents: SavedEventsByDate = { ...prevSavedEvents };
        const currentDayEvents = updatedEvents[currentDayKey] || [];
        updatedEvents[currentDayKey] = [...currentDayEvents, { ...inputData, time: new Date().toISOString() }];
        return updatedEvents;
      });
      setInputData({ title: '', description: '', time: '' });
    } else {
      alert("field Title cannot be empty!");
    }
  };
  return (
    <EventFormContainer>
      <h2>Create Event:</h2>
      <input type="text" name="title" placeholder="Title (required)" value={inputData.title} onChange={handleInputChange}/>
      <input type="text" name="description" placeholder="Description" value={inputData.description} onChange={handleInputChange}/>
      <p>Date of event is:<br/> <b>{currentDayKey}</b></p>
      <Button onClick={saveEvent}>Save Event</Button>
    </EventFormContainer>
  );
};
export default EventForm;