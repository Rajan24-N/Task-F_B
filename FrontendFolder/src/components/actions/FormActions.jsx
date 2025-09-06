export default function FormActions({ savedView, handleReset }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={handleReset}
        className="rounded-2xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        Reset
      </button>

      {!savedView && (
        <button
          type="submit"
          className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Save
        </button>
      )}

      {savedView && (
        <span className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          Saved — Read-only mode
        </span>
      )}
    </div>
  );
}
