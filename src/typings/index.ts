export interface User {
  id: String;
  name: String;
  surname: String;
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
}

export interface Week {
  days: WorkingHours[];
}

export interface WorkingHours {
  lessons: Subject[];
}
