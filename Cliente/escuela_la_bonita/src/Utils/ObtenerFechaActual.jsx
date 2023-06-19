import React from "react";
import 'moment/locale/es';

export function getCurrentDate(separator=''){
    let newDate = new Date()
    let year = newDate.getFullYear();
    
    return `${year}`
}
 
export function ConvertirFechaATexto(separator=' '){
    var writtenNumber = require('written-number');
    var moment = require('moment');
    moment.locale('es');
    writtenNumber.defaults.lang = 'es';

    let newDate = new Date()
    let date = newDate.getDate();
    let month = moment(newDate).format('MMMM');
    let year = newDate.getFullYear();
    return `${writtenNumber(date)}${separator}días del mes de ${month}${separator}del ${writtenNumber(year)}`;

    //return `${writtenNumber(date)}${separator}${"días del mes de "}${month<10?`0${month}`:`${moment().format("MMMM")}`}${separator}${"del "}${writtenNumber(year)}`
}