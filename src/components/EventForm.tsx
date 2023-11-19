import { Dispatch, FunctionComponent, JSX, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Event } from '../interfaces';

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
  selectedDay: number | null;
  setSavedEventsByDay: Dispatch<SetStateAction<{ [day: number]: Event[]; }>>;
}
const EventForm: FunctionComponent<EventFormProps> = ({ selectedDay, setSavedEventsByDay } : EventFormProps): JSX.Element => {
  const [inputData, setInputData] = useState({ title: '', description: '', time: '' });
  

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInputData((prevInput) => ( {...prevInput, [name]: value} ));
  };

  const saveEvent = () => {
    setSavedEventsByDay((prevSavedEvents) => {
      const updatedEvents = { ...prevSavedEvents };
      const currentDayKey = selectedDay !== null ? selectedDay : 0;
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
      <Button onClick={saveEvent}>Save Event</Button>
    </EventFormContainer>
  );
};
export default EventForm;