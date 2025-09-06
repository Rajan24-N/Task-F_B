import { FieldWrap, Input, Label, Select } from "../UI/uiPrimitive";
import { clients, currencies } from "../constants/Constant";

export default function PurchaseOrderDetails({
  po,
  setPo,
  errors,
  ro,
  endMin,
  onClientChange,
  onPoTypeChange
}) {
  return (
    <section className="rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm bg-white">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Purchase Order Details
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Client Name */}
        <FieldWrap>
          <Label htmlFor="client" required>
            Client Name
          </Label>
          <Select
            id="client"
            value={po.clientId}
            onChange={onClientChange}
            disabled={ro}
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          {errors.clientId && (
            <p className="text-xs text-red-600">{errors.clientId}</p>
          )}
        </FieldWrap>

        {/* PO Type */}
        <FieldWrap>
          <Label htmlFor="poType" required>
            Purchase Order Type
          </Label>
          <Select
            id="poType"
            value={po.poType}
            onChange={onPoTypeChange}
            disabled={ro}
          >
            <option value="">Select type</option>
            <option value="Group">Group PO</option>
            <option value="Individual">Individual PO</option>
          </Select>
          {errors.poType && (
            <p className="text-xs text-red-600">{errors.poType}</p>
          )}
        </FieldWrap>

        {/* PO Number */}
        <FieldWrap>
          <Label htmlFor="poNumber" required>
            Purchase Order No.
          </Label>
          <Input
            id="poNumber"
            value={po.poNumber}
            onChange={(v) => setPo((s) => ({ ...s, poNumber: v }))}
            disabled={ro}
            placeholder="PO Number"
          />
          {errors.poNumber && (
            <p className="text-xs text-red-600">{errors.poNumber}</p>
          )}
        </FieldWrap>

        {/* Received On */}
        <FieldWrap>
          <Label htmlFor="receivedOn" required>
            Received On
          </Label>
          <Input
            id="receivedOn"
            type="date"
            value={po.receivedOn}
            onChange={(v) => setPo((s) => ({ ...s, receivedOn: v }))}
            disabled={ro}
          />
          {errors.receivedOn && (
            <p className="text-xs text-red-600">{errors.receivedOn}</p>
          )}
        </FieldWrap>

        {/* Received From - Name */}
        <FieldWrap>
          <Label htmlFor="fromName" required>
            Received From (Name)
          </Label>
          <Input
            id="fromName"
            value={po.receivedFromName}
            onChange={(v) => setPo((s) => ({ ...s, receivedFromName: v }))}
            disabled={ro}
            placeholder="Name"
          />
          {errors.receivedFromName && (
            <p className="text-xs text-red-600">{errors.receivedFromName}</p>
          )}
        </FieldWrap>

        {/* Received From - Email */}
        <FieldWrap>
          <Label htmlFor="fromEmail" required>
            Received From (Email ID)
          </Label>
          <Input
            id="fromEmail"
            type="email"
            value={po.receivedFromEmail}
            onChange={(v) => setPo((s) => ({ ...s, receivedFromEmail: v }))}
            disabled={ro}
            placeholder="name@company.com"
          />
          {errors.receivedFromEmail && (
            <p className="text-xs text-red-600">{errors.receivedFromEmail}</p>
          )}
        </FieldWrap>

        {/* Start Date */}
        <FieldWrap>
          <Label htmlFor="startDate" required>
            PO Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={po.startDate}
            onChange={(v) => setPo((s) => ({ ...s, startDate: v }))}
            disabled={ro}
          />
          {errors.startDate && (
            <p className="text-xs text-red-600">{errors.startDate}</p>
          )}
        </FieldWrap>

        {/* End Date */}
        <FieldWrap>
          <Label htmlFor="endDate" required>
            PO End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={po.endDate}
            min={endMin}
            onChange={(v) => setPo((s) => ({ ...s, endDate: v }))}
            disabled={ro}
          />
          {errors.endDate && (
            <p className="text-xs text-red-600">{errors.endDate}</p>
          )}
        </FieldWrap>

        {/* Budget */}
        <FieldWrap>
          <Label htmlFor="budget" required>
            Budget
          </Label>
          <div className="flex gap-2">
            <div className="w-[135px]">
              <Input
                id="budget"
                value={po.budget}
                onChange={(v) =>
                  setPo((s) => ({
                    ...s,
                    budget: v.replace(/[^0-9]/g, "").slice(0, 5),
                  }))
                }
                disabled={ro}
                placeholder="Amount"
              />
            </div>
            <div className="w-full">
              <Select
                id="currency"
                value={po.currency}
                onChange={(v) => setPo((s) => ({ ...s, currency: v }))}
                disabled={ro}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          {errors.budget && (
            <p className="text-xs text-red-600">{errors.budget}</p>
          )}
        </FieldWrap>
      </div>
    </section>
  );
}
