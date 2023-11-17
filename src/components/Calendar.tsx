import { FunctionComponent, JSX } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
`;

interface CalendarProps {  
}
const Calendar: FunctionComponent<CalendarProps> = (): JSX.Element => {

    return (
        <CalendarContainer></CalendarContainer>
    );
};

export default Calendar;