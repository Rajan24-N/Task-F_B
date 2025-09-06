export const emptyPO = {
  clientId: "",
  poType: "", // Group | Individual
  poNumber: "",
  receivedOn: "",
  receivedFromName: "",
  receivedFromEmail: "",
  startDate: "",
  endDate: "",
  budget: "",
  currency: "USD",
};

export const emptyReqSection = () => ({
  reqId: "",
  talentDetails: {},
});

export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const onlyDigits = (v) => /^\d+$/.test(v);