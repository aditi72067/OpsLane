"use client";

import {
  Check,
  Circle,
  PackageCheck,
  ClipboardList,
  Truck,
  Warehouse,
} from "lucide-react";

const steps = [
  {
    key: "received",
    label: "Order Received",
    description: "Customer order was received.",
    icon: ClipboardList,
  },
  {
    key: "processing",
    label: "Order Processed",
    description: "Order reviewed and shipping label prepared.",
    icon: PackageCheck,
  },
  {
    key: "picking",
    label: "Picking",
    description: "Items are being collected from warehouse shelves.",
    icon: Warehouse,
  },
  {
    key: "packing",
    label: "Packing",
    description: "Items are packed and the shipping label is attached.",
    icon: PackageCheck,
  },
  {
    key: "staging",
    label: "Staging",
    description: "Packed order is waiting for courier pickup.",
    icon: Warehouse,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Courier has collected the package.",
    icon: Truck,
  },
];

const statusOrder = [
  "received",
  "processing",
  "picking",
  "packing",
  "staging",
  "shipped",
];

export default function OrderTimeline({ currentStatus }) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const Icon = step.icon;

        const isCompleted =
          currentIndex >= 0 && index < currentIndex;

        const isCurrent =
          currentIndex === index;

        const isFuture =
          currentIndex >= 0 && index > currentIndex;

        return (
          <div key={step.key} className="flex gap-4">
            {/* Timeline line and icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : isCurrent
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    isCompleted
                      ? "bg-emerald-400"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>

            {/* Step content */}
            <div className="pb-8 pt-1 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3
                  className={`text-sm font-semibold ${
                    isFuture
                      ? "text-slate-400"
                      : "text-slate-900"
                  }`}
                >
                  {step.label}
                </h3>

                {isCurrent && (
                  <span className="inline-flex w-fit items-center rounded-full bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-medium">
                    Current stage
                  </span>
                )}

                {isCompleted && (
                  <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-medium">
                    Completed
                  </span>
                )}
              </div>

              <p
                className={`text-sm mt-1 ${
                  isFuture
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}