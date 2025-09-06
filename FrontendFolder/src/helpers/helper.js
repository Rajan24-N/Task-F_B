export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isNumeric = (val) => {
  return /^-?\d+(\.\d+)?$/.test(String(val));
};
