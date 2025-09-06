import { FieldWrap, Label, Input, Select } from "../UI/uiPrimitive";
import TalentCard from "./TalentCard";

export default function TalentSection({
  idx,
  rs,
  po,
  reqOptions,
  updateReq,
  ensureTalentState,
  setTalentPatch,
  removeReqSection,
  setReqSections,
  reqSections,
  errors,
  ro
}) {
  const req = reqOptions.find((r) => r.id === rs.reqId);
  const availableTalents = req?.talents || [];

  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldWrap>
          <Label required>Job Title / REQ Name</Label>
          <Select
            value={rs.reqId}
            onChange={(v) => updateReq(idx, { reqId: v, talentDetails: {} })}
            disabled={ro || !po.clientId}
          >
            <option value="">Select REQ</option>
            {reqOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </Select>
          {idx === 0 && errors.req0 && (
            <p className="text-xs text-red-600">{errors.req0}</p>
          )}
        </FieldWrap>

        <FieldWrap>
          <Label>REQID / Assignment ID</Label>
          <Input value={rs.reqId} disabled placeholder="Auto-filled" />
        </FieldWrap>
      </div>

      {rs.reqId && (
        <div className="mt-4 space-y-3">
          {availableTalents.map((t) => (
            <TalentCard
              key={t.id}
              t={t}
              idx={idx}
              rs={rs}
              po={po}
              errors={errors}
              ro={ro}
              ensureTalentState={ensureTalentState}
              setTalentPatch={setTalentPatch}
              removeReqSection={removeReqSection}
              setReqSections={setReqSections}
              reqSections={reqSections}
            />
          ))}
        </div>
      )}
    </div>
  );
}
