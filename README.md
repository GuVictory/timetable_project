# Проект для составления расписания и работы с личным кабинетом

## Доступные скрипты

Возможно выполнение следующих скриптов:

### `yarn start`

Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000) в браузере для просмотра.

При внесении изменений приложение будет перезагружаться.\

### `yarn build`

Собирает оптимизированную версию проекта в папку `build`.\

## API взаимодействия с backend

### Авторизация
#### GET Запрос:
```
{
    method: "l";
    email: "string";
    password: "string";
}
```
#### Ответ:
##### Статус 200:
```
{
    name: "string";
    surname: "string";
    email: "string";
    teacher: bollean;
    
    // Для студентов отправляется группа
    group?: string;
    
    // Для преподавателей отправляются 
    // ставка, предметы и желаемое расписание
    fullTime?: number;
    subjects?: string[];
    
    desiredSchedule?: {
        day: { 
            id: 0,
            name?: string,
            scoreTime: int (злой = -10, чуть-чуть злой = -5, радостный = 1) 
        } []
    } [6];
}
```
##### Статус 404 - если такой пользователь не найден

### Регистрация
#### POST Запрос:
```
{
    method: "r";
    name: string;
    surname: string;
    email: string;
    password: string;
    teacher: bool;
    
    group?: string;
}
```
#### Ответ:
##### Статус 201:
```
{
    name: string;
    surname: string;
    email: string;
    teacher: bool;
    
    // Для студентов отправляется группа
    group?: string;
    
    // Для преподавателей отправляются 
    // ставка, предметы и желаемое расписание
    fullTime?: number;
    subjects?: string[];
    
    desiredSchedule?: {
        day: { 
            id: 0,
            name?: string,
            scoreTime: int (злой = -10, чуть-чуть злой = -5, радостный = 1) 
        } []
    } [6];
}
```
##### Статус 409 - если пользователь с таким email уже существует

### Создание нового проекта
#### POST Запрос:
```
{
    method: "p";
    name: string;
    subjects: {
        name: string;
        hours: number;
    }[];
    groups: {
        name: string;
    } [];
    teachers: {
        email: string;
        hours: number;
    } []
}
```
#### Ответ:
##### Статус 201 - новый проект успешно создан
##### Статус 409 - проект с таким названием уже существует

### Изменение набора предметов у преподавателя
#### POST Запрос:
```
{
    method: "s";
    email: string;
    subjects: {
        name: string;
    } [];
}
```
#### Ответ:
##### Статус 200 - изменения успешно сохранены
##### Статус 500 - ошибка на стороне сервера

### Запрос всех предметов проекта
#### Запрос:
```
{
    method: "a";
    project_name: string;
}
```
#### Ответ:
##### Статус 200

```
{
    subjects: string[]
}
```

##### Статус 500 - ошибка на стороне сервера

### Изменение пожеланий к расписанию у преподавателя
#### POST Запрос:
```
{
    method: "h";
    email: string;
    timetable: {
        day: {
            // Временной интервал в течении дня
            id: number;
            name?: string;
            
            // злой = -10, чуть-чуть злой = -5, радостный = 1
            scoreTime: number;
        } []
    } []
}
```
#### Ответ:
##### Статус 200 - изменения успешно сохранены
##### Статус 500 - ошибка на стороне сервера

### Запрос на получение расписания для пользователя
#### GET Запрос:
```
{
    method: "t";
    email: string;
}
```

#### Ответ:
##### Статус 200:
```
{
    timetable: {
        day: {
            id: num;
            subject: string;
            group: string;
            teacher: string;
        } [];
    } [6]
}
```
##### Статус 204 - расписание не готово
##### Статус 404 - расписание для пользавателя с таким email не найдено

### Запрос на получение расписания для проекта
#### GET Запрос:
```
{
    method: "f";
    project_name: string;
}
```

#### Ответ:
##### Статус 200:
```
{
    timetable: {
        day: {
            id: num;
            subject: string;
            group: string;
            teacher: string;
        } [];
    } [6]
}
```
##### Статус 204 - расписание не готово
##### Статус 404 - расписание для такого проекта не найдено


## Основные страницы приложения

### Авторизация
![Login](https://github.com/GuVictory/timetable_project/blob/main/img/login.png)
### Регистрация
![Register](https://github.com/GuVictory/timetable_project/blob/main/img/register.png)
### Профиль
![Profile](https://github.com/GuVictory/timetable_project/blob/main/img/profile.png)
### Настройка предметов
![Subjects](https://github.com/GuVictory/timetable_project/blob/main/img/subjects.png)
### Настройка пожеланий к расписанию
![Work](https://github.com/GuVictory/timetable_project/blob/main/img/work.png)
### Расписание
![Timetable](https://github.com/GuVictory/timetable_project/blob/main/img/timetable.png)
### Создание своего проекта
![CreateProject_step1](https://github.com/GuVictory/timetable_project/blob/main/img/create_project_s1.png)
![CreateProject_step2](https://github.com/GuVictory/timetable_project/blob/main/img/create_project_s2.png)
![CreateProject_step3](https://github.com/GuVictory/timetable_project/blob/main/img/create_project_s3.png)
![CreateProject_step4](https://github.com/GuVictory/timetable_project/blob/main/img/create_project_s4.png)
