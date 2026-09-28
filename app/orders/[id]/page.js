"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Clock,
  Truck,
  User,
  Package,
  AlertTriangle,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import StatusBadge from "../../../components/StatusBadge";
import OrderTimeline from "../../../components/OrderTimeline";
import { orders } from "../../../data/orders";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params?.id;

  const order = orders.find(
    (item) => item.id === String(orderId)
  );

  const [actionMessage, setActionMessage] = useState("");

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package
            size={48}
            className="mx-auto text-slate-300"
          />

          <h1 className="text-2xl font-bold text-slate-900 mt-4">
            Order not found
          </h1>

          <p className="text-slate-500 mt-2">
            The order you are looking for does not exist.
          </p>

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAction = (message) => {
    setActionMessage(message);

    setTimeout(() => {
      setActionMessage("");
    }, 3000);
  };

  return (
    <div className="space-y-7">
      {/* Back navigation */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/orders")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={17} />
          Back to orders
        </button>
      </div>

      {/* Order heading */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">
                Order #{order.id}
              </h1>

              <StatusBadge status={order.status} />

              {order.priority === "high" && (
                <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-semibold">
                  HIGH PRIORITY
                </span>
              )}
            </div>

            <p className="text-slate-500 mt-2">
              Review fulfillment progress and order information.
            </p>
          </div>

          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
              order.status === "delayed"
                ? "bg-red-50 border-red-200"
                : "bg-white border-slate-200"
            }`}
          >
            <Clock
              size={19}
              className={
                order.status === "delayed"
                  ? "text-red-600"
                  : "text-slate-500"
              }
            />

            <div>
              <p className="text-xs text-slate-500">
                Due time
              </p>

              <p
                className={`text-sm font-semibold ${
                  order.status === "delayed"
                    ? "text-red-700"
                    : "text-slate-900"
                }`}
              >
                {order.dueTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action confirmation */}
      {actionMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
          <CheckCircle2 size={19} />

          <p className="text-sm font-medium">
            {actionMessage}
          </p>
        </div>
      )}

      {/* Main layout */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">
              Fulfillment Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Track the order from receipt to shipment.
            </p>
          </div>

          <div className="p-6">
            <OrderTimeline
              currentStatus={order.status}
            />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Information
            </h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Customer */}
            <div className="flex items-start gap-3">
              <User
                size={19}
                className="text-slate-400 mt-0.5"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Customer
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {order.customer}
                </p>
              </div>
            </div>

            {/* Courier */}
            <div className="flex items-start gap-3">
              <Truck
                size={19}
                className="text-slate-400 mt-0.5"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Courier
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {order.courier}
                </p>
              </div>
            </div>

            {/* Order time */}
            <div className="flex items-start gap-3">
              <Clock
                size={19}
                className="text-slate-400 mt-0.5"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Order received
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {order.orderTime}
                </p>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={19}
                className={
                  order.priority === "high"
                    ? "text-red-500 mt-0.5"
                    : "text-slate-400 mt-0.5"
                }
              />

              <div>
                <p className="text-xs text-slate-500">
                  Priority
                </p>

                <p
                  className={`text-sm font-semibold mt-1 ${
                    order.priority === "high"
                      ? "text-red-600"
                      : "text-slate-900"
                  }`}
                >
                  {order.priority === "high"
                    ? "High Priority"
                    : "Normal"}
                </p>
              </div>
            </div>

            {/* Total items */}
            <div className="flex items-start gap-3">
              <Package
                size={19}
                className="text-slate-400 mt-0.5"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Total items
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Order Items
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Products that need to be picked and packed.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div
              key={item.sku}
              className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    SKU: {item.sku}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600">
                Quantity:{" "}
                <span className="font-semibold text-slate-900">
                  {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operational actions */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Operational Actions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Record actions taken by the fulfillment team.
          </p>
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() =>
              handleAction(
                `Order #${order.id} marked for the next fulfillment step.`
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            <CheckCircle2 size={17} />
            Mark next step complete
          </button>

          <button
            type="button"
            onClick={() =>
              handleAction(
                `An operational issue has been flagged for order #${order.id}.`
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
          >
            <AlertTriangle size={17} />
            Report issue
          </button>
        </div>
      </section>

      {/* Delivery information */}
      <section className="bg-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <MapPin size={19} />
          </div>

          <div>
            <h2 className="font-semibold">
              Shipping Information
            </h2>

            <p className="text-sm text-slate-300 mt-1">
              Courier: {order.courier}
            </p>

            <p className="text-sm text-slate-300 mt-1">
              Scheduled pickup: {order.dueTime}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}