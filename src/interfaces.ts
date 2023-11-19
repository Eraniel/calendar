export interface Event {
    title: any;
    description: any;
    time: any;
}

export interface SavedEventsByDate {
    [date: string]: Array<Event>;
}