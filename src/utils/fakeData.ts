import { Student, Subject, Teacher, Week } from "../typings";

export const fakeSubjects = () =>
  [
    {
      title: "Математический анализ",
    },
    {
      title: "Математический анализ",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "Английский",
    },
    {
      title: "Английский",
    },
  ] as Subject[];

export const fakeSubjects2 = () => [
  {
    title: "Аналитическая геометрия",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "Английский",
  },
  {
    title: "",
  },
];

export const fakeWeek: Week = {
  days: [
    {
      lessons: fakeSubjects(),
    },
    {
      lessons: fakeSubjects2(),
    },
    {
      lessons: fakeSubjects(),
    },
    {
      lessons: fakeSubjects2(),
    },
    {
      lessons: fakeSubjects(),
    },
    {
      lessons: fakeSubjects2(),
    },
    {
      lessons: fakeSubjects(),
    },
  ],
};

export const fakeStudent: Student = {
  id: "id_of_user",
  name: "Name",
  surname: "Surname",
  group: "Группа",
  schedule: fakeWeek,
};

export const fakeTeacher: Teacher = {
  id: "id_of_user",
  name: "Name",
  surname: "Surname",
  fullTime: 40,
  busyTime: 26,

  subjects: [
    {
      title: "Математический анализ",
    },
    {
      title: "Аналитическая геометрия",
    },
  ],
  desiredSchedule: fakeWeek,
  schedule: fakeWeek,
};

export const fakeAllSubjects: Subject[] = [
  {
    title: "Математический анализ",
  },
  {
    title: "Аналитическая геометрия",
  },
  {
    title: "Теоретическая механика",
  },
  {
    title: "Экономика",
  },
  {
    title: "Английский",
  },
  {
    title: "Механика сплошной среды",
  },
];
