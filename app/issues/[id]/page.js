"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Package,
  RefreshCw,
} from "lucide-react";

import { issues } from "../../../data/issues";

export default function IssueDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const issueId = params?.id;

  const originalIssue = issues.find(
    (issue) => issue.id === issueId
  );

  const [status, setStatus] = useState(
    originalIssue?.status || "open"
  );

  if (!originalIssue) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle
            size={42}
            className="mx-auto text-amber-500"
          />

          <h1 className="text-xl font-semibold text-slate-900 mt-4">
            Issue not found
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            The issue you are looking for does not exist.
          </p>

          <Link
            href="/issues"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back to issues
          </Link>
        </div>
      </div>
    );
  }

  const isResolved = status === "resolved";

  function handleStatusChange() {
    if (isResolved) {
      setStatus("open");
    } else {
      setStatus("resolved");
    }
  }

  return (
    <div className="space-y-7">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/issues")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={17} />
          Back to Issues
        </button>
      </div>

      {/* Header */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-blue-600">
                {originalIssue.id}
              </span>

              {isResolved ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">
                  <CheckCircle2 size={13} />
                  Resolved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-semibold">
                  <AlertTriangle size={13} />
                  Open
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              {originalIssue.title}
            </h1>

            <p className="text-slate-500 mt-2">
              {originalIssue.type}
            </p>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={handleStatusChange}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition ${
              isResolved
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isResolved ? (
              <>
                <RefreshCw size={17} />
                Reopen Issue
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Resolve Issue
              </>
            )}
          </button>
        </div>
      </section>

      {/* Status banner */}
      <section
        className={`rounded-xl border p-4 ${
          isResolved
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex items-start gap-3">
          {isResolved ? (
            <CheckCircle2
              size={21}
              className="text-emerald-600 mt-0.5"
            />
          ) : (
            <AlertTriangle
              size={21}
              className="text-red-600 mt-0.5"
            />
          )}

          <div>
            <p
              className={`text-sm font-semibold ${
                isResolved
                  ? "text-emerald-800"
                  : "text-red-800"
              }`}
            >
              {isResolved
                ? "This issue has been resolved."
                : "This issue requires attention."}
            </p>

            <p
              className={`text-sm mt-1 ${
                isResolved
                  ? "text-emerald-700"
                  : "text-red-700"
              }`}
            >
              {isResolved
                ? "The issue is currently marked as resolved."
                : "Review the details below and take the required operational action."}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Problem */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem description */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Problem
            </h2>

            <p className="text-sm leading-6 text-slate-600 mt-4">
              {originalIssue.description}
            </p>
          </section>

          {/* Recommended action */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Recommended action
            </h2>

            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm leading-6 text-blue-800">
                {getRecommendedAction(
                  originalIssue.type
                )}
              </p>
            </div>
          </section>

          {/* Activity */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Activity
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Clock
                    size={15}
                    className="text-slate-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Issue created
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {originalIssue.createdAt}
                  </p>
                </div>
              </div>

              {isResolved && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Issue marked as resolved
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Action completed during the current session
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right - Details */}
        <div className="space-y-6">
          {/* Priority */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Priority
            </p>

            <div className="mt-3">
              <PriorityBadge
                priority={originalIssue.priority}
              />
            </div>
          </section>

          {/* Related order */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Related order
            </p>

            {originalIssue.orderId ? (
              <Link
                href={`/orders/${originalIssue.orderId}`}
                className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <Package size={17} />
                #{originalIssue.orderId}
              </Link>
            ) : (
              <p className="text-sm text-slate-500 mt-3">
                No related order
              </p>
            )}
          </section>

          {/* Location */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Location
            </p>

            <div className="flex items-start gap-2 mt-3">
              <MapPin
                size={17}
                className="text-slate-400 mt-0.5"
              />

              <p className="text-sm text-slate-700">
                {originalIssue.location}
              </p>
            </div>
          </section>

          {/* Assigned team */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Assigned to
            </p>

            <div className="flex items-center gap-2 mt-3">
              <User
                size={17}
                className="text-slate-400"
              />

              <p className="text-sm font-medium text-slate-700">
                {originalIssue.assignedTo}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Helper functions                 */
/* -------------------------------- */

function PriorityBadge({ priority }) {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1.5 text-xs font-semibold">
        HIGH
      </span>
    );
  }

  if (priority === "medium") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-3 py-1.5 text-xs font-semibold">
        MEDIUM
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-3 py-1.5 text-xs font-semibold">
      LOW
    </span>
  );
}

function getRecommendedAction(type) {
  switch (type) {
    case "Stock shortage":
      return "Check the secondary warehouse for available stock and initiate a transfer to the main warehouse before the order is packed.";

    case "Wrong variant":
      return "Verify the order variant against the product label and replace the incorrectly picked item before packing.";

    case "Courier delay":
      return "Contact or reassign the courier and move the package into the next available pickup window.";

    case "Packing error":
      return "Verify the order document and shipping label before the package leaves the packing station.";

    case "Inventory transfer":
      return "Confirm stock in the secondary warehouse and initiate an inventory transfer to the main warehouse.";

    case "Inventory discrepancy":
      return "Perform a physical stock count and reconcile the result with the inventory record.";

    case "Customer address":
      return "Contact the customer or office team to confirm the missing address information before shipping.";

    case "Courier issue":
      return "Select an alternative courier that can meet the required pickup window.";

    default:
      return "Review the issue details and take the appropriate operational action.";
  }
}