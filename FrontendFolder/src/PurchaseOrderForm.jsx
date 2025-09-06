import { Divider } from "./UI/uiPrimitive";
import { usePurchaseOrder } from "./hooks/useInputHook";
import PurchaseOrderDetails from "./components/PurchaseOrderDetails";
import TalentDetails from "./components/TalentDetails";
import FormActions from "./components/actions/FormActions";

export default function PurchaseOrderForm() {
  const {
    po,
    setPo,
    reqSections,
    setReqSections,
    errors,
    savedView,
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
  } = usePurchaseOrder();

  const ro = savedView;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Purchase Order | New
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <PurchaseOrderDetails
          po={po}
          setPo={setPo}
          errors={errors}
          ro={ro}
          endMin={endMin}
          onClientChange={onClientChange}
          onPoTypeChange={onPoTypeChange}
        />

        <TalentDetails
          po={po}
          reqSections={reqSections}
          reqOptions={reqOptions}
          updateReq={updateReq}
          ensureTalentState={ensureTalentState}
          setTalentPatch={setTalentPatch}
          addReqSection={addReqSection}
          removeReqSection={removeReqSection}
          setReqSections={setReqSections}
          errors={errors}
          ro={ro}
        />

        <Divider />

        <FormActions savedView={savedView} handleReset={handleReset} />
      </form>

      {savedView && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p className="font-medium mb-2">Summary</p>
          <pre className="whitespace-pre-wrap text-xs">
            {JSON.stringify({ po, reqSections }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}