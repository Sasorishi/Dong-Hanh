export const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    default:
      return ""; // Valeur par défaut si le code de devise n'est pas reconnu
  }
};
