let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const formatDateTime = (timezone) => {
  let newDate = new Date()
  let tzDate = dateWithTimeZone(timezone)
  let parsedTz = Date.parse(tzDate)
  newDate.setTime(parsedTz)
  let formattedDay = weekday[newDate.getDay()]
  let formattedDate =  month[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
  let formattedTime = formatTime(timezone)

  return { formattedDay, formattedDate, formattedTime }
}

export const formatTime = (timezone, hour = 0) => {
  let newDate = new Date()
  let tzDate = dateWithTimeZone(timezone)
  let parsedTz = Date.parse(tzDate)
  newDate.setTime(parsedTz)
  let time = (newDate.getHours() + hour) + ':' + ('0' + newDate.getMinutes()).slice(-2)
  return time
}

export const dateWithTimeZone = (timeZone) => {
  let date = new Date().toISOString()
  return new Date(date).toLocaleString('en-US', { timeZone: timeZone })
};
