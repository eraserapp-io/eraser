import Day from 'dayjs';

export enum Tense {
  Past = 1,
  Future,
}

export type Course = {
  name: string;
  color: string;
  id: string;
};

export type Assignment = {
  id?: string;
  title: string;
  description?: string;
  course: Course;
  dueDate: Day.Dayjs;
  completed: boolean;
};

export type AgendaItem = {
  title: Day.Dayjs;
  data: Assignment[];
};

export type FetchNextDateArgs = {
  tense: Tense;
  referenceDate: Day.Dayjs;
  numberDays?: number;
};
