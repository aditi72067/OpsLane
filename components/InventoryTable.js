"use client";

import {
  ArrowRightLeft,
  Package,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function InventoryTable({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <p className="text-slate-500">
          No inventory records found.
        </p>
      </div>
    );
  }

  const getAvailableStock = (product) => {
    return Math.max(
      product.mainWarehouse - product.reserved,
      0
    );
  };

  const getStatus = (product) => {
    const available = getAvailableStock(product);

    if (
      available === 0 &&
      product.secondaryWarehouse > 0
    ) {
      return "transfer";
    }

    if (available <= product.reorderLevel) {
      return "low";
    }

    return "healthy";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Product
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                SKU
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Main Warehouse
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Secondary
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Reserved
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Available
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const available = getAvailableStock(product);
              const status = getStatus(product);

              return (
                <tr
                  key={product.sku}
                  className="hover:bg-slate-50 transition"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Package
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {product.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {product.sku}
                    </span>
                  </td>

                  {/* Main warehouse */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        product.mainWarehouse === 0
                          ? "text-red-600"
                          : "text-slate-800"
                      }`}
                    >
                      {product.mainWarehouse}
                    </span>
                  </td>

                  {/* Secondary warehouse */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">
                      {product.secondaryWarehouse}
                    </span>
                  </td>

                  {/* Reserved */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">
                      {product.reserved}
                    </span>
                  </td>

                  {/* Available */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {available}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {status === "healthy" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-medium">
                        <CheckCircle2 size={13} />
                        Healthy
                      </span>
                    )}

                    {status === "low" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 text-xs font-medium">
                        <AlertTriangle size={13} />
                        Low stock
                      </span>
                    )}

                    {status === "transfer" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-medium">
                        <ArrowRightLeft size={13} />
                        Transfer required
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-500">
          Showing {products.length} inventory records
        </p>
      </div>
    </div>
  );
}