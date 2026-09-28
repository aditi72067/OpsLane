const statusStyles = {
  received: {
    label: "Received",
    className: "bg-slate-100 text-slate-700",
  },

  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-700",
  },

  picking: {
    label: "Picking",
    className: "bg-amber-100 text-amber-700",
  },

  packing: {
    label: "Packing",
    className: "bg-purple-100 text-purple-700",
  },

  staging: {
    label: "Staging",
    className: "bg-indigo-100 text-indigo-700",
  },

  shipped: {
    label: "Shipped",
    className: "bg-emerald-100 text-emerald-700",
  },

  delayed: {
    label: "Delayed",
    className: "bg-red-100 text-red-700",
  },

  resolved: {
    label: "Resolved",
    className: "bg-emerald-100 text-emerald-700",
  },

  open: {
    label: "Open",
    className: "bg-red-100 text-red-700",
  },

  investigating: {
    label: "Investigating",
    className: "bg-amber-100 text-amber-700",
  },
};

export default function StatusBadge({ status }) {
  const normalizedStatus = String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "_");

  const statusInfo =
    statusStyles[normalizedStatus] || {
      label: status || "Unknown",
      className: "bg-slate-100 text-slate-700",
    };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
}