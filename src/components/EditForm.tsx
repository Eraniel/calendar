import { FunctionComponent, JSX, useState } from 'react';
import styled from 'styled-components';
import { Event } from '../interfaces';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin: 0 0 10px 0;
    font-size: 16px;
  }
`;
const Button = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px;
  color: white;
`;
const SaveButton = styled(Button)`
  background-color: #44C2BC;
  margin: 0 0 10px 0;
`;
const CancelButton = styled(Button)`
  background-color: #db3a2e;
`; 

interface EditFormProps {
  savedEvent: Event;
  onSave: (editedEvent: Event) => void;
  onCancel: () => void;
}
const EditForm: FunctionComponent<EditFormProps> = ({ savedEvent, onSave, onCancel } : EditFormProps) : JSX.Element => {
  const [editedTitle, setEditedTitle] = useState(savedEvent.title);
  const [editedDescription, setEditedDescription] = useState(savedEvent.description);
  
  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      const editedEvent: Event = {
        title: editedTitle,
        description: editedDescription,
        time: new Date().toISOString(),
      };
      onSave(editedEvent);
    } else {
      alert("field Title cannot be empty!");
    }
  };
  
  return (
    <Wrap>
      <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
      <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
      <SaveButton onClick={handleSave}>Save</SaveButton>
      <CancelButton onClick={onCancel}>Cancel</CancelButton>
    </Wrap>
  );
};
export default EditForm;