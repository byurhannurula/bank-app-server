export const useMessage = () => {
  const hours = new Date().getHours()
  const isNoon = hours > 11 && hours < 18
  const isEvening = (hours >= 0 && hours <= 4) || (hours >= 18 && hours <= 23)

  let welcomeMessage = 'Good Morning'
  if (isNoon) welcomeMessage = 'Good Afternoon'
  else if (isEvening) welcomeMessage = 'Good Night'

  return { welcomeMessage }
}
