import TalentSection from "./TalentSection";

export default function TalentDetails({
  po,
  reqSections,
  reqOptions,
  updateReq,
  ensureTalentState,
  setTalentPatch,
  addReqSection,
  removeReqSection,
  setReqSections,
  errors,
  ro
}) {
  return (
    <section className="rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Talent Details</h2>
        {po.poType === "Group" && !ro && (
          <button
            type="button"
            onClick={addReqSection}
            className="rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
          >
            + Add Another
          </button>
        )}
      </div>

      <div className="mt-4 space-y-6">
        {reqSections.map((rs, idx) => (
          <TalentSection
            key={idx}
            idx={idx}
            rs={rs}
            po={po}
            reqOptions={reqOptions}
            updateReq={updateReq}
            ensureTalentState={ensureTalentState}
            setTalentPatch={setTalentPatch}
            removeReqSection={removeReqSection}
            setReqSections={setReqSections}
            reqSections={reqSections}
            errors={errors}
            ro={ro}
          />
        ))}
      </div>

      {errors.talents && (
        <p className="mt-3 text-sm text-red-600">{errors.talents}</p>
      )}
    </section>
  );
}
