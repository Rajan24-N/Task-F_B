import { useState, useEffect } from 'react';
import { reqsByClient } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid'; 


const cloneTalents = (list) => list.map(t => ({ ...t, selected: false }));

export function useInputHook(){
  
  const [form, setForm] = useState({
    client: '',
    poType: '',
    poNumber: '',
    receivedOn: '',
    receivedFrom: { name:'', email:'' },
    poStartDate: '',
    poEndDate: '',
    budget: '',
    currency: '',
    reqs: [
      {
        id: uuidv4(),
        jobTitle: '',
        reqId: '',
        talents: []
      }
    ],
    availableReqs: []
  });

  const [errors, setErrors] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    const clientId = form.client;
    if (clientId) {
      const list = reqsByClient[clientId] || [];
      
      const opts = list.map(r => ({ label: r.name, value: r.id, raw: r }));
      setForm(prev => ({ ...prev, availableReqs: opts }));
    } else {
      setForm(prev => ({ ...prev, availableReqs: [] }));
    }
  }, [form.client]);

  function handleChange(field, value){
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleDateChange(field, value){
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleClientChange(val){
    
    setForm(prev => ({
      ...prev,
      client: val,
      reqs: [{
        id: uuidv4(),
        jobTitle: '',
        reqId: '',
        talents: []
      }]
    }));
  }

  function handleAddReq(){
    setForm(prev => ({
      ...prev,
      reqs: [...prev.reqs, { id: uuidv4(), jobTitle:'', reqId:'', talents: [] }]
    }));
  }

  function handleRemoveReq(idx){
    setForm(prev => {
      const copy = [...prev.reqs];
      copy.splice(idx,1);
      return { ...prev, reqs: copy.length ? copy : [{ id: uuidv4(), jobTitle:'', reqId:'', talents: [] }] };
    });
  }

  function handleReqChange(idx, key, value){
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const target = copy.reqs[idx];
      if (key === 'jobTitle') {
        
        target.jobTitle = value;
        
        const rawList = reqsByClient[prev.client] || [];
        const found = rawList.find(r => r.id === value);
        target.reqId = found ? found.id : '';
        target.talents = found ? cloneTalents(found.talents.filter(t => t.stage === 'MovedToSelected')) : [];
      } else {
        target[key] = value;
      }
      return { ...copy };
    });
  }

  function handleTalentToggle(reqIdx, talentId){
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const talent = copy.reqs[reqIdx].talents.find(t => t.id === talentId);
      if (!talent) return prev;
      
      if (copy.poType === 'Individual' && !talent.selected) {
        
        copy.reqs[reqIdx].talents.forEach(t => t.selected = false);
      }
      talent.selected = !talent.selected;
      return { ...copy };
    });
  }

  function handleTalentChange(reqIdx, talentId, key, value){
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const talent = copy.reqs[reqIdx].talents.find(t => t.id === talentId);
      if (!talent) return prev;
      talent[key] = value;
      return { ...copy };
    });
  }

  function validate(){
    const err = {};
    if (!form.client) err.client = 'Client is required.';
    if (!form.poType) err.poType = 'PO Type is required.';
    if (!form.poNumber) err.poNumber = 'PO Number is required.';
    if (!form.receivedOn) err.receivedOn = 'Received On is required.';
    if (!form.receivedFrom.name) err.receivedFromName = 'Received From Name is required.';
    if (!form.receivedFrom.email) err.receivedFromEmail = 'Received From Email is required.';
    if (!form.poStartDate) err.poStartDate = 'PO Start Date is required.';
    if (!form.poEndDate) err.poEndDate = 'PO End Date is required.';
    if (form.poStartDate && form.poEndDate && form.poEndDate < form.poStartDate) err.poEndDate = 'End date cannot be before start date.';
    if (!form.budget) err.budget = 'Budget is required.';
    if (form.budget && (String(form.budget).length > 5)) err.budget = 'Budget must be max 5 digits.';
    if (!form.currency) err.currency = 'Currency required.';

    
    form.reqs.forEach((req, idx) => {
      if (!req.jobTitle) {
        err[`req_job_${idx}`] = 'REQ selection required.';
      }
      const selectedTalents = req.talents.filter(t => t.selected);
      if (form.poType === 'Individual' && selectedTalents.length > 1) {
        err[`req_job_${idx}`] = 'Only 1 talent allowed for Individual PO.';
      }
      if (form.poType === 'Group' && selectedTalents.length < 2) {
        
      }
      
      selectedTalents.forEach(t => {
        if (!t.contractDuration || !t.billRate) {
          err[`talent_${idx}_${t.id}`] = 'Contract Duration and Bill Rate are required for selected talent.';
        }
      });
    });

    
    if (form.poType === 'Group') {
      const totalSelected = form.reqs.reduce((acc, r) => acc + r.talents.filter(t => t.selected).length, 0);
      if (totalSelected < 2) {
        err.groupTalent = 'Group PO requires at least two selected talents.';
      }
    } else if (form.poType === 'Individual') {
      
      const totalSelected = form.reqs.reduce((acc, r) => acc + r.talents.filter(t => t.selected).length, 0);
      if (totalSelected === 0) err.groupTalent = 'At least one talent must be selected for Individual PO.';
      if (totalSelected > 1) err.groupTalent = 'Only one talent is allowed for Individual PO.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit(){
    if (!validate()) {
      console.warn('Validation errors', errors);
      return;
    }
    
    console.log('Saved PO form:', form);
    setIsReadOnly(true);
    alert('Form saved. See console for data.');
  }

  function handleReset(){
    setForm({
      client: '',
      poType: '',
      poNumber: '',
      receivedOn: '',
      receivedFrom: { name:'', email:'' },
      poStartDate: '',
      poEndDate: '',
      budget: '',
      currency: '',
      reqs: [
        { id: uuidv4(), jobTitle:'', reqId:'', talents: [] }
      ],
      availableReqs: []
    });
    setErrors({});
    setIsReadOnly(false);
  }

  function toggleReadOnlyMode(){
    setIsReadOnly(prev => !prev);
  }

  return {
    form,
    errors,
    isReadOnly,
    handleChange,
    handleDateChange,
    handleClientChange,
    handleAddReq,
    handleRemoveReq,
    handleReqChange,
    handleTalentToggle,
    handleTalentChange,
    handleSubmit,
    handleReset,
    toggleReadOnlyMode
  };
}
