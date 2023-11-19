import { Dispatch, FunctionComponent, JSX, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { SavedEventsByDate } from '../interfaces';

const EventFormContainer = styled.div`

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
    setSavedEventsByDate((prevSavedEvents) => {  
      const updatedEvents: SavedEventsByDate = { ...prevSavedEvents };
      const currentDayEvents = updatedEvents[currentDayKey] || [];
      updatedEvents[currentDayKey] = [...currentDayEvents, inputData];
      return updatedEvents;
    });
    setInputData({ title: '', description: '', time: '' });
  };


  return (
    <EventFormContainer>
      <input type="text" name="title" placeholder="Title" value={inputData.title} onChange={handleInputChange}/>
      <input type="text" name="description" placeholder="Description" value={inputData.description} onChange={handleInputChange}/>
      <input type="text" name="time" placeholder="set Time: --:--" value={inputData.time} onChange={handleInputChange}/>
      <div>Date of event is:<br/> <b>{currentDayKey}</b></div>
      <Button onClick={saveEvent}>Save Event</Button>
    </EventFormContainer>
  );
};
export default EventForm;