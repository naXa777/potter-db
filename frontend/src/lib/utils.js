const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.potterdb.com";

export const getHouseColor = (house) => {
  switch (house) {
    case "Gryffindor":
      return "#ae0001";
    case "Slytherin":
      return "#2a623d";
    case "Hufflepuff":
      return "#ffdb00";
    case "Ravenclaw":
      return "#222f5b";
    default:
      return "#bebebe";
  }
};

export const getDatabaseStatus = async () => {
  return await fetch(`${apiUrl}/health`)
    .then((response) => response.status)
    .catch((_e) => 500);
};
