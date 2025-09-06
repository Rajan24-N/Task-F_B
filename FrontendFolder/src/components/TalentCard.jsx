import { currencies } from "../constants/Constant";
import { FieldWrap, Label, Input, Select } from "../UI/uiPrimitive";

export default function TalentCard({
  t,
  idx,
  rs,
  po,
  errors,
  ro,
  ensureTalentState,
  setTalentPatch,
  removeReqSection,
  setReqSections,
  reqSections
}) {
  const tState =
    rs.talentDetails[t.id] || {
      selected: false,
      billRate: "",
      stdTimeBR: "",
      otBR: "",
      currency: po.currency,
    };

  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={!!tState.selected}
            disabled={ro}
            onChange={(e) => {
              ensureTalentState(idx, t.id);
              const selected = e.target.checked;

              if (selected && po.poType === "Individual") {
                setReqSections((arr) =>
                  arr.map((r, i) => ({
                    ...r,
                    talentDetails: Object.fromEntries(
                      Object.entries(r.talentDetails || {}).map(([id, v]) => [
                        id,
                        {
                          ...v,
                          selected: i === idx && id === t.id,
                        },
                      ])
                    ),
                  }))
                );
              } else {
                setTalentPatch(idx, t.id, { selected });
              }
            }}
          />
          <span className="font-medium">{t.name}</span>
        </label>

        {!ro && reqSections.length > 1 && (
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-red-600"
            onClick={() => removeReqSection(idx)}
          >
            Remove REQ
          </button>
        )}
      </div>

      {tState.selected && (
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <FieldWrap>
            <Label required>Contract Duration</Label>
            <Input
              placeholder="Months"
              disabled={ro}
              onChange={(v) =>
                setTalentPatch(idx, t.id, { months: v.replace(/[^0-9]/g, "") })
              }
              value={tState.months || ""}
            />
          </FieldWrap>

          <FieldWrap>
            <Label required>Bill Rate</Label>
            <Input
              placeholder="/hr"
              disabled={ro}
              onChange={(v) => setTalentPatch(idx, t.id, { billRate: v })}
              value={tState.billRate}
            />
            {errors[`billRate_${idx}_${t.id}`] && (
              <p className="text-xs text-red-600">
                {errors[`billRate_${idx}_${t.id}`]}
              </p>
            )}
          </FieldWrap>

          <FieldWrap>
            <Label>Currency</Label>
            <Select
              disabled={ro}
              value={tState.currency || po.currency}
              onChange={(v) => setTalentPatch(idx, t.id, { currency: v })}
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </Select>
          </FieldWrap>

          <FieldWrap>
            <Label required>Standard Time BR</Label>
            <Input
              placeholder="/hr"
              disabled={ro}
              onChange={(v) => setTalentPatch(idx, t.id, { stdTimeBR: v })}
              value={tState.stdTimeBR}
            />
            {errors[`stdTime_${idx}_${t.id}`] && (
              <p className="text-xs text-red-600">
                {errors[`stdTime_${idx}_${t.id}`]}
              </p>
            )}
          </FieldWrap>

          <FieldWrap>
            <Label>Currency</Label>
            <Select disabled value={tState.currency || po.currency}>
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </Select>
          </FieldWrap>

          <FieldWrap>
            <Label required>Over Time BR</Label>
            <Input
              placeholder="/hr"
              disabled={ro}
              onChange={(v) => setTalentPatch(idx, t.id, { otBR: v })}
              value={tState.otBR}
            />
            {errors[`ot_${idx}_${t.id}`] && (
              <p className="text-xs text-red-600">
                {errors[`ot_${idx}_${t.id}`]}
              </p>
            )}
          </FieldWrap>
        </div>
      )}
    </div>
  );
}
