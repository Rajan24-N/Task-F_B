import { useInputHook } from './hooks';
import { FieldRow, Col } from './layout';
import { DropDown, CommonInput, Divider, HeadingComponent, Label } from './components';
import { PO_TYPES, CURRENCIES } from './constants/Constant';
import { clients } from './data/client';

export default function PurchaseOrderForm(){
  const {
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
    toggleReadOnlyMode,
  } = useInputHook();

  return (
    <div className="card">
      <HeadingComponent title="Purchase Order | New" />
      <form onSubmit={(e)=>{ e.preventDefault(); handleSubmit(); }}>
        <div className={isReadOnly ? 'readonly' : ''}>
          <div className="section-title">Purchase Order Details</div>

          <FieldRow>
            <Col>
              <Label text="Client Name" required />
              <DropDown
                value={form.client}
                options={clients}
                onChange={handleClientChange}
                disabled={isReadOnly}
                placeholder="Select client"
              />
              {errors.client && <div className="error">{errors.client}</div>}
            </Col>

            <Col>
              <Label text="Purchase Order Type" required />
              <DropDown
                value={form.poType}
                options={PO_TYPES}
                onChange={(val)=>handleChange('poType', val)}
                disabled={isReadOnly}
                placeholder="Select PO Type"
              />
              {errors.poType && <div className="error">{errors.poType}</div>}
            </Col>

            <Col>
              <Label text="Purchase Order No." required />
              <CommonInput
                value={form.poNumber}
                onChange={(v)=>handleChange('poNumber', v)}
                placeholder="PO Number"
                disabled={isReadOnly}
              />
              {errors.poNumber && <div className="error">{errors.poNumber}</div>}
            </Col>

            <Col>
              <Label text="Received On" required />
              <input
                type="date"
                className="input"
                value={form.receivedOn}
                onChange={(e)=>handleDateChange('receivedOn', e.target.value)}
                disabled={isReadOnly}
              />
              {errors.receivedOn && <div className="error">{errors.receivedOn}</div>}
            </Col>
          </FieldRow>

          <FieldRow>
            <Col>
              <Label text="Received From Name" required />
              <CommonInput
                value={form.receivedFrom.name}
                onChange={(v)=>handleChange('receivedFrom', { ...form.receivedFrom, name: v })}
                placeholder="Received From Name"
                disabled={isReadOnly}
              />
              {errors.receivedFromName && <div className="error">{errors.receivedFromName}</div>}
            </Col>

            <Col>
              <Label text="Received From Email ID" required />
              <CommonInput
                value={form.receivedFrom.email}
                onChange={(v)=>handleChange('receivedFrom', { ...form.receivedFrom, email: v })}
                placeholder="Received From Email"
                disabled={isReadOnly}
              />
              {errors.receivedFromEmail && <div className="error">{errors.receivedFromEmail}</div>}
            </Col>

            <Col>
              <Label text="PO Start Date" required />
              <input
                type="date"
                className="input"
                value={form.poStartDate}
                onChange={(e)=>handleDateChange('poStartDate', e.target.value)}
                disabled={isReadOnly}
              />
              {errors.poStartDate && <div className="error">{errors.poStartDate}</div>}
            </Col>

            <Col>
              <Label text="PO End Date" required />
              <input
                type="date"
                className="input"
                value={form.poEndDate}
                onChange={(e)=>handleDateChange('poEndDate', e.target.value)}
                disabled={isReadOnly}
                min={form.poStartDate || undefined}
              />
              {errors.poEndDate && <div className="error">{errors.poEndDate}</div>}
            </Col>
          </FieldRow>

          <FieldRow>
            <Col>
              <Label text="Budget" required />
              <CommonInput
                value={form.budget}
                onChange={(v)=>handleChange('budget', v)}
                placeholder="Budget (max 5 digits)"
                disabled={isReadOnly}
                type="number"
              />
              {errors.budget && <div className="error">{errors.budget}</div>}
            </Col>

            <Col>
              <Label text="Currency" required />
              <DropDown
                value={form.currency}
                options={CURRENCIES}
                onChange={(val)=>handleChange('currency', val)}
                disabled={isReadOnly}
              />
              {errors.currency && <div className="error">{errors.currency}</div>}
            </Col>
            <Col />
            <Col />
          </FieldRow>

          <Divider />

          <div className="section-title">Talent Detail</div>

          {form.reqs.map((req, idx) => (
            <div key={req.id} className="req-card">
              <FieldRow>
                <Col>
                  <Label text="Job Title / REQ Name" required />
                  <DropDown
                    options={form.availableReqs}
                    value={req.jobTitle}
                    onChange={(val)=>handleReqChange(idx, 'jobTitle', val)}
                    disabled={isReadOnly}
                    placeholder="Select Job / REQ"
                  />
                  {errors[`req_job_${idx}`] && <div className="error">{errors[`req_job_${idx}`]}</div>}
                </Col>

                <Col>
                  <Label text="Job ID / REQ ID" />
                  <CommonInput value={req.reqId || ''} disabled />
                </Col>

                <Col style={{flex:'0 0 40px'}}>
                  {!isReadOnly && (
                    <div style={{display:'flex', gap:6, alignItems:'center'}}>
                      <button type="button" className="btn btn-secondary" onClick={()=>handleRemoveReq(idx)}>🗑</button>
                      { (form.poType === 'Group') && <button type="button" className="btn btn-secondary" onClick={()=>handleAddReq()}>＋</button>}
                    </div>
                  )}
                </Col>
              </FieldRow>

              <div style={{marginTop:8}} className="small">Talents</div>
              {req.talents && req.talents.length===0 && <div className="small">No talents available for this REQ</div>}
              {req.talents && req.talents.map((tal, tIdx) => (
                <div key={tal.id} style={{borderTop:'1px dashed #e6e6e6', paddingTop:8, marginTop:8}}>
                  <label style={{display:'flex',alignItems:'center',gap:8}}>
                    <input type="checkbox" checked={!!tal.selected} onChange={()=>handleTalentToggle(idx, tal.id)} disabled={isReadOnly || (form.poType==='Individual' && req.talents.filter(x=>x.selected).length>0 && !tal.selected)} />
                    <strong>{tal.name}</strong> <span className="small">- {tal.stage}</span>
                  </label>

                  {tal.selected && (
                    <div style={{marginTop:8}}>
                      <FieldRow>
                        <Col>
                          <Label text="Contract Duration (Months)" required />
                          <CommonInput value={tal.contractDuration || ''} onChange={(v)=>handleTalentChange(idx, tal.id, 'contractDuration', v)} disabled={isReadOnly} type="number" />
                        </Col>

                        <Col>
                          <Label text="Bill Rate (/hr)" required/>
                          <CommonInput value={tal.billRate || ''} onChange={(v)=>handleTalentChange(idx, tal.id, 'billRate', v)} disabled={isReadOnly} type="number"/>
                        </Col>

                        <Col>
                          <Label text="Currency" required/>
                          <DropDown options={CURRENCIES} value={tal.currency || form.currency} onChange={(val)=>handleTalentChange(idx, tal.id, 'currency', val)} disabled={isReadOnly}/>
                        </Col>
                      </FieldRow>

                      <FieldRow>
                        <Col>
                          <Label text="Standard Time BR (/hr)" />
                          <CommonInput value={tal.stdTime || ''} onChange={(v)=>handleTalentChange(idx, tal.id, 'stdTime', v)} disabled={isReadOnly} type="number"/>
                        </Col>
                        <Col>
                          <Label text="Over Time BR (/hr)" />
                          <CommonInput value={tal.overTime || ''} onChange={(v)=>handleTalentChange(idx, tal.id, 'overTime', v)} disabled={isReadOnly} type="number"/>
                        </Col>
                        <Col />
                      </FieldRow>

                      {errors[`talent_${idx}_${tal.id}`] && <div className="error">{errors[`talent_${idx}_${tal.id}`]}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:10}}>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            <button type="button" className="btn btn-secondary" onClick={toggleReadOnlyMode}>{isReadOnly ? 'Edit' : 'Preview'}</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
