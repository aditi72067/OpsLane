"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function OrderTable({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <p className="text-slate-500">
          No orders match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Order
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Customer
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Items
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Priority
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Courier
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Due
              </th>

              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => {
              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              const isDelayed = order.status === "delayed";
              const isPriority = order.priority === "high";

              return (
                <tr
                  key={order.id}
                  className={`hover:bg-slate-50 transition ${
                    isDelayed ? "bg-red-50/30" : ""
                  }`}
                >
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      #{order.id}
                    </Link>

                    <p className="text-xs text-slate-400 mt-1">
                      {order.orderTime}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {order.customer}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">
                      {totalItems} item
                      {totalItems !== 1 ? "s" : ""}
                    </p>

                    <p className="text-xs text-slate-400 mt-1 max-w-[180px] truncate">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    {isPriority ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700">
                        HIGH
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Courier */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">
                      {order.courier}
                    </p>
                  </td>

                  {/* Due */}
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 text-sm ${
                        isDelayed
                          ? "text-red-600 font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      <Clock size={14} />
                      {order.dueTime}
                    </div>

                    {isDelayed && (
                      <p className="text-xs text-red-500 mt-1">
                        Delayed
                      </p>
                    )}
                  </td>

                  {/* Arrow */}
                  <td className="px-4 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-slate-400 hover:text-blue-600 transition"
                      aria-label={`View order ${order.id}`}
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-500">
          Showing {orders.length} order
          {orders.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}