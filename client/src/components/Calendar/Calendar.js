import React from 'react';
import './Calendar.sass';

const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
];

const abbreviated_weekdays = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab'
];

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const getDaysOfMonth = function(y,m) {
  const firstDay = new Date(y,m,1);
  const lastDay = new Date(y,m+1,0);
  let monthDays = [];

  for(let d = (firstDay.getDay()-1)*(-1); d<=(lastDay.getDate() + (6-lastDay.getDay())); d++) {
    let currentDate = new Date(y,m,d);
    monthDays.push({
      day: currentDate.getDate(),
      short: abbreviated_weekdays[currentDate.getDay()],
      full: weekdays[currentDate.getDay()]
    });
  }

  return monthDays;
}

const Calendar = () => {

  const year = 2018;
  const month = 3;
  const monthDays = getDaysOfMonth(year,month);

  return (
    <div className="Calendar">
      <div>{months[month]}</div>
      <div className="grid">
        {monthDays.map((day,i) => (
          <div key={i} className="day">
            <div className="full">{day.short}</div>
            <div className="number">{day.day}</div>
            <div className="content">
              <ul>
                <li>&#9679; 09:00 <b>Compromisso 1</b></li>
                <li>&#9679; 10:00 <b>Compromisso 2</b></li>
                <li>&#9679; 11:00 <b>Compromisso 3</b></li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Calendar;