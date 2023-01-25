export const bgSelector = (data) => {
    if (data == "Clear") {
      return "#5894DD";
    } else if (data == "Rain" || data == "Clouds") {
      return "rgba(131, 131, 131, 1)";
    } else if (data == "Snow") {
      return "#rgba(182, 182, 195, 1)";
    } else {
      return "#5894DD";
    }
  };