export const status = (key) => {
  switch (key) {
    case 1:
      return "active";

    case 2:
      return "inactive";

    case 3:
      return "deleted";
    case 4:
      return "soft del";

    default:
      break;
  }
};
