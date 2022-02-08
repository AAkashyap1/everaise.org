export default function GetDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (months[date.toDate().getMonth()] + ' ' + date.toDate().getDate() + ', ' + (date.toDate().getYear() + 1900))
}