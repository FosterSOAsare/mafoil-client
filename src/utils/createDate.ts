function createDate(date: string, separator = '') {

  if (!date) return;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let arr = date.split("/");

  return `${months[+arr[0] - 1]}${separator} ${arr[1]}`;
}

export default createDate


export function createDateFromString(inputDate: string) {
  if (!inputDate) return ''
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const date = new Date(inputDate)

  const day = date.getDate(), month = months[date.getMonth()], year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate // Output: "19 Sep, 2023"
}

function createSuffix(day: number) {
  let dayWithSuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      dayWithSuffix = day + 'st';
      break;
    case 2:
    case 22:
      dayWithSuffix = day + 'nd';
      break;
    case 3:
    case 23:
      dayWithSuffix = day + 'rd';
      break;
    default:
      dayWithSuffix = day + 'th';
      break;
  }
  return dayWithSuffix
}