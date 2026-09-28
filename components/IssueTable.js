"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";

function PriorityBadge({ priority }) {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2.5 py-1 text-xs font-semibold">
        High
      </span>
    );
  }

  if (priority === "medium") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 text-xs font-semibold">
        Medium
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2.5 py-1 text-xs font-medium">
      Low
    </span>
  );
}

function IssueStatus({ status }) {
  if (status === "resolved") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-medium">
        <CheckCircle2 size={13} />
        Resolved
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-700 px-2.5 py-1 text-xs font-medium">
      <AlertTriangle size={13} />
      Open
    </span>
  );
}

export default function IssueTable({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <CheckCircle2
          size={40}
          className="mx-auto text-emerald-500"
        />

        <h3 className="text-lg font-semibold text-slate-900 mt-4">
          No issues found
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Everything matching your current filters is clear.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Issue
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Type
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Order
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Priority
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Location
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Created
              </th>

              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {issues.map((issue) => (
              <tr
                key={issue.id}
                className={`hover:bg-slate-50 transition ${
                  issue.status === "open" &&
                  issue.priority === "high"
                    ? "bg-red-50/20"
                    : ""
                }`}
              >
                {/* Issue */}
                <td className="px-6 py-4">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="group"
                  >
                    <p className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                      {issue.id}
                    </p>

                    <p className="text-sm font-medium text-slate-800 mt-1 max-w-[250px]">
                      {issue.title}
                    </p>
                  </Link>
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-700">
                    {issue.type}
                  </span>
                </td>

                {/* Order */}
                <td className="px-6 py-4">
                  {issue.orderId ? (
                    <Link
                      href={`/orders/${issue.orderId}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      #{issue.orderId}
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400">
                      —
                    </span>
                  )}
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <PriorityBadge
                    priority={issue.priority}
                  />
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">
                    {issue.location}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <IssueStatus
                    status={issue.status}
                  />
                </td>

                {/* Created */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock size={14} />
                    {issue.createdAt}
                  </div>
                </td>

                {/* Arrow */}
                <td className="px-4 py-4">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="text-slate-400 hover:text-blue-600 transition"
                  >
                    <ChevronRight size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-500">
          Showing {issues.length} issue
          {issues.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}