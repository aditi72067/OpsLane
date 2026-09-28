"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Package,
  AlertTriangle,
  Clock,
} from "lucide-react";

import OrderTable from "../../components/OrderTable";
import { orders } from "../../data/orders";

export default function OrdersPage() {
  const [searchText, setSearchText] = useState("");

  const [selectedStatus, setSelectedStatus] = useState(() => {
    if (typeof window === "undefined") return "all";

    const status = new URLSearchParams(window.location.search).get("status");

    const validStatuses = [
      "received",
      "processing",
      "picking",
      "packing",
      "staging",
      "shipped",
      "delayed",
    ];

    return validStatuses.includes(status) ? status : "all";
  });

  const [selectedPriority, setSelectedPriority] = useState(() => {
    if (typeof window === "undefined") return "all";

    const priority = new URLSearchParams(
      window.location.search
    ).get("priority");

    return priority === "high" || priority === "normal"
      ? priority
      : "all";
  });

  /* --------------------------------
     Search + filter orders
  -------------------------------- */

  const filteredOrders = orders.filter((order) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      search === "" ||
      order.id.toLowerCase().includes(search) ||
      order.customer.toLowerCase().includes(search) ||
      order.courier.toLowerCase().includes(search) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(search)
      );

    const matchesStatus =
      selectedStatus === "all" ||
      order.status === selectedStatus;

    const matchesPriority =
      selectedPriority === "all" ||
      order.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  /* --------------------------------
     Summary counts
  -------------------------------- */

  const priorityCount = orders.filter(
    (order) => order.priority === "high"
  ).length;

  const delayedCount = orders.filter(
    (order) => order.status === "delayed"
  ).length;

  const processingCount = orders.filter(
    (order) =>
      order.status === "processing" ||
      order.status === "picking" ||
      order.status === "packing"
  ).length;

  /* --------------------------------
     Clear filters
  -------------------------------- */

  function clearFilters() {
    setSearchText("");
    setSelectedStatus("all");
    setSelectedPriority("all");

    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/orders");
    }
  }

  return (
    <div className="space-y-7">

      {/* --------------------------------
          Page Header
      -------------------------------- */}

      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor orders, priorities, fulfillment status, and delays.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <Package size={16} />
            <span>{orders.length} total orders</span>
          </div>
        </div>
      </div>

      {/* --------------------------------
          Summary Cards
      -------------------------------- */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Orders */}

        <Link
          href="/orders"
          className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {orders.length}
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
              <Package size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 group-hover:text-slate-700">
            View all orders
          </p>
        </Link>

        {/* Priority Orders */}

        <Link
          href="/orders?priority=high"
          className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Priority Orders
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {priorityCount}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
              <AlertTriangle size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 group-hover:text-slate-700">
            View high-priority orders
          </p>
        </Link>

        {/* Delayed Orders */}

        <Link
          href="/orders?status=delayed"
          className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-red-300 hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Delayed Orders
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {delayedCount}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
              <Clock size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 group-hover:text-slate-700">
            View delayed orders
          </p>
        </Link>

        {/* In Progress */}

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                In Progress
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {processingCount}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
              <SlidersHorizontal size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Processing, picking, or packing
          </p>
        </div>
      </div>

      {/* --------------------------------
          Search + Filters
      -------------------------------- */}

      <div className="rounded-xl border border-slate-200 bg-white p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

          {/* Search */}

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search orders
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by order ID, customer, courier, or product..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>

          {/* Status */}

          <div className="w-full lg:w-52">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="all">All Statuses</option>
              <option value="received">Received</option>
              <option value="processing">Processing</option>
              <option value="picking">Picking</option>
              <option value="packing">Packing</option>
              <option value="staging">Staging</option>
              <option value="shipped">Shipped</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>

          {/* Priority */}

          <div className="w-full lg:w-48">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Clear */}

          <button
            onClick={clearFilters}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>

        {/* Active filter summary */}

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {orders.length}
            </span>{" "}
            orders
          </span>

          {selectedStatus !== "all" && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
              Status: {selectedStatus}
            </span>
          )}

          {selectedPriority !== "all" && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
              Priority: {selectedPriority}
            </span>
          )}

          {searchText.trim() !== "" && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Search: {searchText}
            </span>
          )}
        </div>
      </div>

      {/* --------------------------------
          Orders Table
      -------------------------------- */}

      <div>
        <OrderTable orders={filteredOrders} />
      </div>

    </div>
  );
}