export interface User {
  id: String;
  name: String;
  surname: String;
  email: String;
  schedule?: Week;

  group?: String;
  fullTime?: number;
  subjects?: Subject[];
  desiredSchedule?: Week;
}

export interface Student extends User {
  group: String;
}

export interface Teacher extends User {
  fullTime: number;
  subjects: Subject[];
  desiredSchedule: Week;
}

export interface Subject {
  title: String;
  score?: number;
}

export interface Week {
  days: WorkingHours[];
}

export interface WorkingHours {
  lessons: Subject[];
}

export interface Project {
  name: string;

  groups: {
    name: string;
  } [];

  teachers: {
    email: string;
    hours: number;
  } [];

  subjects: {
    name: string;
    hours: number;
  } [];
}