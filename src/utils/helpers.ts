export const currencyFormatter = (data: any) => {
    return ((data.amount * 100) / 100).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  };
  
  export const timeFormatter = (
    seconds: number,
    minutes: number,
    hours: number,
  ): string => {
    const secondsString = seconds.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
  
    if (hours === 0) {
      return `${minutesString}:${secondsString}`;
    } else {
      const hoursString = hours.toString().padStart(2, "0");
  
      return `${hoursString}:${minutesString}:${secondsString}`;
    }
  };