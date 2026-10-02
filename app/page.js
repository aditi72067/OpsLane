import StatusBadge from "../components/StatusBadge";
import {
  orders,
  getPriorityOrders,
  getDelayedOrders,
} from "../data/orders";
import { products, getInventoryStatus } from "../data/products";
import { getOpenIssues } from "../data/issues";
import {
  ArrowRight,
  Clock3,
  Package,
  PackageCheck,
  AlertTriangle,
  Warehouse,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const priorityOrders = getPriorityOrders();
  const delayedOrders = getDelayedOrders();
  const openIssues = getOpenIssues();

  const fulfillmentStages = [
    {
      name: "Received",
      count: orders.filter((order) => order.status === "received").length,
    },
    {
      name: "Processing",
      count: orders.filter((order) => order.status === "processing").length,
    },
    {
      name: "Picking",
      count: orders.filter((order) => order.status === "picking").length,
    },
    {
      name: "Packing",
      count: orders.filter((order) => order.status === "packing").length,
    },
    {
      name: "Staging",
      count: orders.filter((order) => order.status === "staging").length,
    },
    {
      name: "Shipped",
      count: orders.filter((order) => order.status === "shipped").length,
    },
  ];

  const transferRequired = products.filter(
    (product) => getInventoryStatus(product) === "transfer"
  );

  const lowStockProducts = products.filter(
    (product) => getInventoryStatus(product) === "low"
  );

  const attentionCount =
    delayedOrders.length +
    transferRequired.length +
    lowStockProducts.length +
    openIssues.length;

  return (
    <div className="max-w-[1500px] mx-auto space-y-9">
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <section className="pb-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                Operations dashboard
              </p>
            </div>

            <h1 className="text-[30px] leading-tight font-bold tracking-tight text-slate-950">
              Fulfillment overview
            </h1>

            <p className="text-sm leading-6 text-slate-500 mt-2 max-w-xl">
              Monitor today&apos;s orders, inventory and operational exceptions
              from one centralized workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 lg:text-right">
            <div className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-emerald-50">
              <CircleCheck size={17} className="text-emerald-500" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Today
              </p>

              <p className="text-sm font-medium text-slate-700 mt-1">
                {new Intl.DateTimeFormat("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Kolkata",
                }).format(new Date())}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OPERATIONAL OVERVIEW
      ========================================================== */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Operational overview
            </h2>

            <p className="text-xs leading-5 text-slate-500 mt-1">
              Current workload across the fulfillment operation.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            System operational
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {/* Total Orders */}
          <Link
            href="/orders"
            className="group relative overflow-hidden bg-white border border-blue-100 rounded-xl p-5 hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[50px]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50">
                  <Package size={18} className="text-blue-500" />
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-blue-500 transition"
                />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
                Total orders
              </p>

              <p className="text-2xl font-bold text-slate-950 mt-1">
                {orders.length}
              </p>

              <p className="text-xs text-slate-500 mt-1.5">
                In today&apos;s workflow
              </p>
            </div>
          </Link>

          {/* Priority */}
          <Link
            href="/orders?priority=high"
            className="group relative overflow-hidden bg-white border border-violet-100 rounded-xl p-5 hover:border-violet-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-violet-50 rounded-bl-[50px]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-violet-50">
                  <AlertTriangle size={18} className="text-violet-500" />
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-violet-500 transition"
                />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
                Priority
              </p>

              <p className="text-2xl font-bold text-slate-950 mt-1">
                {priorityOrders.length}
              </p>

              <p className="text-xs text-slate-500 mt-1.5">
                Require immediate attention
              </p>
            </div>
          </Link>

          {/* Delayed */}
          <Link
            href="/orders?status=delayed"
            className="group relative overflow-hidden bg-white border border-rose-100 rounded-xl p-5 hover:border-rose-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-bl-[50px]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-rose-50">
                  <Clock3 size={18} className="text-rose-500" />
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-rose-500 transition"
                />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
                Delayed
              </p>

              <p
                className={`text-2xl font-bold mt-1 ${
                  delayedOrders.length > 0
                    ? "text-rose-600"
                    : "text-slate-950"
                }`}
              >
                {delayedOrders.length}
              </p>

              <p className="text-xs text-slate-500 mt-1.5">
                Past expected deadline
              </p>
            </div>
          </Link>

          {/* Issues */}
          <Link
            href="/issues"
            className="group relative overflow-hidden bg-white border border-orange-100 rounded-xl p-5 hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-[50px]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-50">
                  <AlertTriangle size={18} className="text-orange-500" />
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-orange-500 transition"
                />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
                Open issues
              </p>

              <p
                className={`text-2xl font-bold mt-1 ${
                  openIssues.length > 0
                    ? "text-orange-600"
                    : "text-slate-950"
                }`}
              >
                {openIssues.length}
              </p>

              <p className="text-xs text-slate-500 mt-1.5">
                Require operational review
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================
          ATTENTION REQUIRED
      ========================================================== */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-rose-50/70 via-white to-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-rose-100">
                <AlertTriangle size={18} className="text-rose-500" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-950">
                    Attention Required
                  </h2>

                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                    {attentionCount}
                  </span>
                </div>

                <p className="text-xs leading-5 text-slate-500 mt-1">
                  Exceptions that may affect today&apos;s fulfillment flow.
                </p>
              </div>
            </div>

            <Link
              href="/issues"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Review issues
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {/* Delays */}
          <Link
            href="/orders?status=delayed"
            className="group p-5 border-b sm:border-b-0 xl:border-r border-slate-200 hover:bg-rose-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50">
                <Clock3 size={16} className="text-rose-500" />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-rose-500 transition"
              />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
              Delays
            </p>

            <p className="text-2xl font-bold text-slate-950 mt-1">
              {delayedOrders.length}
            </p>

            <p className="text-sm font-medium text-slate-800 mt-1">
              Delayed orders
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Past expected deadline
            </p>
          </Link>

          {/* Warehouse */}
          <Link
            href="/inventory"
            className="group p-5 border-b sm:border-b-0 xl:border-r border-slate-200 hover:bg-amber-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50">
                <Warehouse size={16} className="text-amber-500" />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-amber-500 transition"
              />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
              Warehouse
            </p>

            <p className="text-2xl font-bold text-slate-950 mt-1">
              {transferRequired.length}
            </p>

            <p className="text-sm font-medium text-slate-800 mt-1">
              Transfers required
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Stock available elsewhere
            </p>
          </Link>

          {/* Inventory */}
          <Link
            href="/inventory"
            className="group p-5 border-b xl:border-b-0 xl:border-r border-slate-200 hover:bg-blue-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50">
                <PackageCheck size={16} className="text-blue-500" />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-blue-500 transition"
              />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
              Inventory
            </p>

            <p className="text-2xl font-bold text-slate-950 mt-1">
              {lowStockProducts.length}
            </p>

            <p className="text-sm font-medium text-slate-800 mt-1">
              Low-stock products
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Review before next cycle
            </p>
          </Link>

          {/* Exceptions */}
          <Link
            href="/issues"
            className="group p-5 hover:bg-orange-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-50">
                <AlertTriangle size={16} className="text-orange-500" />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-orange-500 transition"
              />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-5">
              Exceptions
            </p>

            <p className="text-2xl font-bold text-slate-950 mt-1">
              {openIssues.length}
            </p>

            <p className="text-sm font-medium text-slate-800 mt-1">
              Open issues
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Require operational review
            </p>
          </Link>
        </div>
      </section>

      {/* =========================================================
          FULFILLMENT FLOW
      ========================================================== */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Fulfillment flow
            </h2>

            <p className="text-xs leading-5 text-slate-500 mt-1">
              Current distribution of orders across the workflow.
            </p>
          </div>

          <Link
            href="/orders"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View orders
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {fulfillmentStages.map((stage, index) => (
              <div
                key={stage.name}
                className={`p-5 ${
                  index > 0
                    ? "border-t md:border-t-0 md:border-l border-slate-200"
                    : ""
                } ${
                  index === 2 || index === 3
                    ? "bg-slate-50/60"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-400">
                    {stage.name}
                  </p>

                  <span
                    className={`w-2 h-2 rounded-full ${
                      stage.count > 0
                        ? "bg-blue-400"
                        : "bg-slate-200"
                    }`}
                  />
                </div>

                <p className="text-2xl font-bold text-slate-950 mt-2">
                  {stage.count}
                </p>

                <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{
                      width: `${Math.max(
                        (stage.count / Math.max(orders.length, 1)) * 100,
                        stage.count > 0 ? 8 : 0
                      )}%`,
                    }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  {orders.length
                    ? Math.round((stage.count / orders.length) * 100)
                    : 0}
                  % of orders
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRIORITY ORDERS
      ========================================================== */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-violet-50">
                  <AlertTriangle size={14} className="text-violet-500" />
                </div>

                <h2 className="text-base font-semibold text-slate-950">
                  Priority orders
                </h2>
              </div>

              <p className="text-xs leading-5 text-slate-500 mt-2 ml-9">
                Orders requiring immediate attention.
              </p>
            </div>

            <Link
              href="/orders?priority=high"
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {priorityOrders.slice(0, 5).map((order) => (
            <Link
              href={`/orders/${order.id}`}
              key={order.id}
              className="group grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] gap-3 md:items-center px-6 py-4 hover:bg-violet-50/30 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    #{order.id}
                  </p>

                  <span className="text-[10px] font-bold tracking-wide px-2 py-1 rounded-md bg-rose-50 text-rose-600">
                    HIGH
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {order.customer}
                </p>
              </div>

              <div>
                <StatusBadge status={order.status} />
              </div>

              <div className="flex items-center md:justify-end gap-2 text-xs text-slate-400">
                <Clock3 size={13} />

                {order.dueTime}

                <ArrowRight
                  size={14}
                  className="ml-2 text-slate-300 group-hover:text-violet-500 transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}