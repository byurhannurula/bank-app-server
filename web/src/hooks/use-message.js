export const useMessage = () => {
  const hours = new Date().getHours()
  const isNoon = hours > 11 && hours < 18
  const isEvening = (hours >= 0 && hours <= 4) || (hours >= 18 && hours <= 23)

  let welcomeMsg = 'Good Morning'
  if (isNoon) welcomeMsg = 'Good Afternoon'
  else if (isEvening) welcomeMsg = 'Good Night'

  return { welcomeMsg }
}
