const storageSupport = (storage=null)=>{
  let data = {};
  return {
    clear: ()=>storage ? localStorage.clear() : data = {},
    getItem: key=>storage ? JSON.parse(localStorage.getItem(key)) : JSON.parse(data[key]),
    removeItem: key=>storage ? localStorage.removeItem(key) : delete data[key],
    setItem: (key, item)=>storage ? localStorage.setItem(key, JSON.stringify(item)) : data[key] = JSON.stringify(item)
  }
};
export const storage = (typeof(Storage) !== 'undefined') ? storageSupport(localStorage) : storageSupport();

export function updateTime(time1, time2) {
  let hours = parseInt(time1.substr(0, 2)) + parseInt(time2.substr(0, 2));
  let minutes = parseInt(time1.substr(3, 2)) + parseInt(time2.substr(3, 2));
  let seconds = parseInt(time1.substr(6, 2)) + parseInt(time2.substr(6, 2));
  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
  }
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
export function getDate(){
  var date = new Date();
  var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var dayName = days[date.getDay()];
  var day = date.getDate();
  var monthName = months[date.getMonth()];
  var year = date.getFullYear();
  return dayName +" "+ day +" "+ monthName +" "+ year;
}
export function formatTime(time){
  return time.split(':').reduce((acc, value)=>{
    acc.push(formatNumber(value));
    return acc;
  }, []).join(':');
}
export function formatNumber(n){
  return n.toString().padStart(2, 0);
}
export function getTimeFormat() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  return formatNumber(hh) + ":" + formatNumber(mm) + ":" + formatNumber(ss);
}
export function getElapsedTime(checkin, checkout) {
  let cin = checkin.split(':');
  let cout = checkout.split(':');
  let cinHour = parseInt(cin[0]);
  let coutHour = parseInt(cout[0]);
  let cinMinute = parseInt(cin[1]);
  let coutMinute = parseInt(cout[1]);
  let cinSecond = parseInt(cin[2]);
  let coutSecond = parseInt(cout[2]);
  
  let hours = coutHour - cinHour;
  let minutes = coutMinute - cinMinute;
  let seconds = coutSecond - cinSecond;
  
  if (seconds < 0) {
    minutes--;
    seconds = 60 + seconds;
  }
  
  if (minutes < 0) {
    hours--;
    minutes = 60 + minutes;
  }
  
  return hours +':'+ minutes +':'+ seconds;
}
