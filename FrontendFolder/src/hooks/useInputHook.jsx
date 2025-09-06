import { useState, useMemo } from "react";
import { emptyPO, emptyReqSection, emailOk, onlyDigits } from "../helpers/helper";
import { clients } from "../constants/Constant";

export const usePurchaseOrder = () => {
  const [po, setPo] = useState(emptyPO);
  const [reqSections, setReqSections] = useState([emptyReqSection()]);
  const [errors, setErrors] = useState({});
  const [savedView, setSavedView] = useState(false);

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === po.clientId),
    [po.clientId]
  );

  // Keep endDate min >= startDate
  const endMin = po.startDate || undefined;

  // Reset REQ sections when client changes
  const onClientChange = (clientId) => {
    setPo((s) => ({ ...s, clientId }));
    setReqSections([emptyReqSection()]);
  };

  const onPoTypeChange = (poType) => {
    setPo((s) => ({ ...s, poType }));
  };

  const reqOptions = selectedClient?.reqs || [];

  const updateReq = (idx, patch) => {
    setReqSections((arr) =>
      arr.map((r, i) => (i === idx ? { ...r, ...patch } : r))
    );
  };

  const ensureTalentState = (idx, talentId) => {
    setReqSections((arr) => {
      const copy = [...arr];
      const r = { ...copy[idx] };
      r.talentDetails = { ...r.talentDetails };

      if (!r.talentDetails[talentId]) {
        r.talentDetails[talentId] = {
          selected: false,
          billRate: "",
          stdTimeBR: "",
          otBR: "",
          currency: po.currency || "USD"
        };
      }

      copy[idx] = r;
      return copy;
    });
  };

  const setTalentPatch = (idx, talentId, patch) => {
    setReqSections((arr) => {
      const copy = [...arr];
      const r = { ...copy[idx] };
      const t = { ...(r.talentDetails[talentId] || {}) };
      r.talentDetails = { ...r.talentDetails, [talentId]: { ...t, ...patch } };
      copy[idx] = r;
      return copy;
    });
  };

  const addReqSection = () => setReqSections((s) => [...s, emptyReqSection()]);
  const removeReqSection = (idx) =>
    setReqSections((s) => (s.length > 1 ? s.filter((_, i) => i !== idx) : s));

  const validate = () => {
    const e = {};
    if (!po.clientId) e.clientId = "Client is required";
    if (!po.poType) e.poType = "PO type is required";
    if (!po.poNumber) e.poNumber = "PO number is required";
    if (!po.receivedOn) e.receivedOn = "Received On is required";
    if (!po.receivedFromName) e.receivedFromName = "Name is required";
    if (!po.receivedFromEmail) e.receivedFromEmail = "Email is required";
    if (po.receivedFromEmail && !emailOk(po.receivedFromEmail)) e.receivedFromEmail = "Invalid email";
    if (!po.startDate) e.startDate = "Start date is required";
    if (!po.endDate) e.endDate = "End date is required";
    if (po.startDate && po.endDate && po.endDate < po.startDate) e.endDate = "End date cannot be before Start date";
    if (!po.budget) e.budget = "Budget is required";
    if (po.budget && (!onlyDigits(po.budget) || po.budget.length > 5)) e.budget = "Budget must be numeric, max 5 digits";

    // REQ/Talent validations
    const totalSelectedTalents = reqSections.reduce((acc, rs) => acc + Object.values(rs.talentDetails || {}).filter((t) => t.selected).length, 0);

    if (!reqSections[0].reqId) e.req0 = "At least one REQ is required";

    if (po.poType === "Individual") {
      if (totalSelectedTalents !== 1) e.talents = "Individual PO requires exactly one talent";
    }
    if (po.poType === "Group") {
      if (totalSelectedTalents < 2) e.talents = "Group PO requires at least two talents";
    }

    // For every selected talent ensure mandatory sub fields present
    reqSections.forEach((rs, idx) => {
      Object.entries(rs.talentDetails || {}).forEach(([tid, td]) => {
        if (td.selected) {
          if (!td.billRate) e[`billRate_${idx}_${tid}`] = "Bill Rate required";
          if (!td.stdTimeBR) e[`stdTime_${idx}_${tid}`] = "Std. Time BR required";
          if (!td.otBR) e[`ot_${idx}_${tid}`] = "Over Time BR required";
        }
      });
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };
  
  // ----------------------------- Submit / Reset -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...po,
      reqs: reqSections
        .filter((r) => r.reqId)
        .map((r) => ({
          reqId: r.reqId,
          talents: Object.entries(r.talentDetails)
            .filter(([, t]) => t.selected)
            .map(([talentId, t]) => ({ talentId, ...t })),
        })),
    };

    // eslint-disable-next-line no-console
    console.log("PO SUBMIT:", payload);
    setSavedView(true);
  };

  const handleReset = () => {
    setPo(emptyPO);
    setReqSections([emptyReqSection()]);
    setErrors({});
    setSavedView(false);
  };

  return {
    po,
    setPo,
    reqSections,
    setReqSections,
    errors,
    savedView,
    selectedClient,
    endMin,
    onClientChange,
    onPoTypeChange,
    reqOptions,
    updateReq,
    ensureTalentState,
    setTalentPatch,
    addReqSection,
    removeReqSection,
    handleSubmit,
    handleReset
  };
};
