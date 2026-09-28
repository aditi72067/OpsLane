import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

import {
  orders,
  getPriorityOrders,
  getDelayedOrders,
} from "../data/orders";

import {
  products,
  getInventoryStatus,
} from "../data/products";

import { getOpenIssues } from "../data/issues";

import {
  ArrowRight,
  Clock,
  PackageCheck,
  AlertTriangle,
  Warehouse,
} from "lucide-react";

import Link from "next/link";

export default function Home() {
  const priorityOrders = getPriorityOrders();
  const delayedOrders = getDelayedOrders();
  const openIssues = getOpenIssues();

  const fulfillmentStages = [
    {
      name: "Received",
      count: orders.filter(
        (order) => order.status === "received"
      ).length,
    },
    {
      name: "Processing",
      count: orders.filter(
        (order) => order.status === "processing"
      ).length,
    },
    {
      name: "Picking",
      count: orders.filter(
        (order) => order.status === "picking"
      ).length,
    },
    {
      name: "Packing",
      count: orders.filter(
        (order) => order.status === "packing"
      ).length,
    },
    {
      name: "Staging",
      count: orders.filter(
        (order) => order.status === "staging"
      ).length,
    },
    {
      name: "Shipped",
      count: orders.filter(
        (order) => order.status === "shipped"
      ).length,
    },
  ];

  const transferRequired = products.filter(
    (product) =>
      getInventoryStatus(product) === "transfer"
  );

  const lowStockProducts = products.filter(
    (product) =>
      getInventoryStatus(product) === "low"
  );

  return (
    <div className="space-y-8">

      {/* ============================= */}
      {/* PAGE HEADING */}
      {/* ============================= */}

      <section>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>

            <p className="text-sm font-medium text-blue-600">
              Operations Dashboard
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Good afternoon, Operations Team
            </h1>

            <p className="text-slate-500 mt-2">
              Here&apos;s what needs your attention today.
            </p>

          </div>

          <div className="text-sm text-slate-500">
  {new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date())}
</div>

        </div>
      </section>


      {/* ============================= */}
      {/* STATISTICS */}
      {/* ============================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL ORDERS */}

        <Link
          href="/orders"
          className="block rounded-2xl transition hover:-translate-y-0.5"
        >
          <StatCard
            title="Total Orders"
            value={orders.length}
            description="Orders in today's workflow"
            type="orders"
          />
        </Link>


        {/* PRIORITY ORDERS */}

        <Link
          href="/orders?priority=high"
          className="block rounded-2xl transition hover:-translate-y-0.5"
        >
          <StatCard
            title="Priority Orders"
            value={priorityOrders.length}
            description="Require immediate attention"
            type="priority"
          />
        </Link>


        {/* DELAYED ORDERS */}

        <Link
          href="/orders?status=delayed"
          className="block rounded-2xl transition hover:-translate-y-0.5"
        >
          <StatCard
            title="Delayed Orders"
            value={delayedOrders.length}
            description="Past their expected deadline"
            type="delayed"
          />
        </Link>


        {/* OPEN ISSUES */}

        <Link
          href="/issues"
          className="block rounded-2xl transition hover:-translate-y-0.5"
        >
          <StatCard
            title="Open Issues"
            value={openIssues.length}
            description="Operational issues requiring action"
            type="issues"
          />
        </Link>

      </section>


      {/* ============================= */}
      {/* FULFILLMENT PIPELINE */}
      {/* ============================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-lg font-semibold text-slate-900">
              Today&apos;s Fulfillment
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current distribution of orders across the fulfillment workflow.
            </p>

          </div>

          <PackageCheck
            size={22}
            className="text-blue-600"
          />

        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

          {fulfillmentStages.map((stage) => (
            <div
              key={stage.name}
              className="bg-slate-50 rounded-xl p-4 border border-slate-100"
            >

              <p className="text-xs font-medium text-slate-500">
                {stage.name}
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {stage.count}
              </p>

              <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.max(
                      (stage.count /
                        Math.max(orders.length, 1)) *
                        100,
                      stage.count > 0 ? 8 : 0
                    )}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* ============================= */}
      {/* TWO COLUMN SECTION */}
      {/* ============================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* ============================= */}
        {/* PRIORITY ORDERS */}
        {/* ============================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-6 border-b border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Priority Orders
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Orders requiring immediate attention.
                </p>

              </div>

              <AlertTriangle
                size={21}
                className="text-amber-500"
              />

            </div>

          </div>


          <div className="divide-y divide-slate-100">

            {priorityOrders.slice(0, 5).map((order) => (

              <Link
                href={`/orders/${order.id}`}
                key={order.id}
                className="block p-5 hover:bg-slate-50 transition"
              >

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-2">

                      <p className="font-semibold text-slate-900">
                        #{order.id}
                      </p>

                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600">
                        HIGH
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {order.customer}
                    </p>

                  </div>


                  <div className="text-right">

                    <StatusBadge
                      status={order.status}
                    />

                    <div className="flex items-center justify-end gap-1 mt-2 text-xs text-slate-400">

                      <Clock size={13} />

                      {order.dueTime}

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>


          <div className="p-4 border-t border-slate-100">

            <Link
              href="/orders?priority=high"
              className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >

              View priority orders

              <ArrowRight size={16} />

            </Link>

          </div>

        </div>


        {/* ============================= */}
        {/* ATTENTION REQUIRED */}
        {/* ============================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-6 border-b border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Attention Required
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Operational items that may affect fulfillment.
                </p>

              </div>

              <AlertTriangle
                size={21}
                className="text-red-500"
              />

            </div>

          </div>


          <div className="p-5 space-y-4">

            {/* DELAYED ORDERS */}

            <Link
              href="/orders?status=delayed"
              className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition"
            >

              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">

                <Clock
                  size={18}
                  className="text-red-600"
                />

              </div>


              <div className="flex-1">

                <p className="text-sm font-semibold text-slate-900">
                  {delayedOrders.length} delayed order
                  {delayedOrders.length !== 1
                    ? "s"
                    : ""}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  These orders have passed their expected deadline.
                </p>

              </div>


              <ArrowRight
                size={17}
                className="text-red-400 mt-1"
              />

            </Link>


            {/* TRANSFER */}

            <Link
              href="/inventory"
              className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition"
            >

              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">

                <Warehouse
                  size={18}
                  className="text-amber-600"
                />

              </div>


              <div className="flex-1">

                <p className="text-sm font-semibold text-slate-900">
                  {transferRequired.length} stock transfer
                  {transferRequired.length !== 1
                    ? "s"
                    : ""}{" "}
                  required
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Inventory is available in the secondary warehouse.
                </p>

              </div>


              <ArrowRight
                size={17}
                className="text-amber-500 mt-1"
              />

            </Link>


            {/* LOW STOCK */}

            <Link
              href="/inventory"
              className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition"
            >

              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">

                <PackageCheck
                  size={18}
                  className="text-blue-600"
                />

              </div>


              <div className="flex-1">

                <p className="text-sm font-semibold text-slate-900">
                  {lowStockProducts.length} product
                  {lowStockProducts.length !== 1
                    ? "s"
                    : ""}{" "}
                  running low
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Review stock levels before the next fulfillment cycle.
                </p>

              </div>


              <ArrowRight
                size={17}
                className="text-blue-500 mt-1"
              />

            </Link>


            {/* OPEN ISSUES */}

            <Link
              href="/issues"
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
            >

              <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">

                <AlertTriangle
                  size={18}
                  className="text-slate-600"
                />

              </div>


              <div className="flex-1">

                <p className="text-sm font-semibold text-slate-900">
                  {openIssues.length} open operational issues
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Review and resolve issues before they affect customers.
                </p>

              </div>


              <ArrowRight
                size={17}
                className="text-slate-400 mt-1"
              />

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}