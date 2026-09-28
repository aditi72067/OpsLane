"use client";

import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ClipboardList,
} from "lucide-react";

import IssueTable from "../../components/IssueTable";
import { issues } from "../../data/issues";

export default function IssuesPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredIssues = issues.filter((issue) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      search === "" ||
      issue.id.toLowerCase().includes(search) ||
      issue.title.toLowerCase().includes(search) ||
      issue.type.toLowerCase().includes(search) ||
      issue.location.toLowerCase().includes(search) ||
      issue.assignedTo.toLowerCase().includes(search) ||
      (issue.orderId &&
        issue.orderId.toLowerCase().includes(search));

    const matchesStatus =
      statusFilter === "all" ||
      issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      issue.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const openIssues = issues.filter(
    (issue) => issue.status === "open"
  );

  const highPriorityIssues = issues.filter(
    (issue) =>
      issue.status === "open" &&
      issue.priority === "high"
  );

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "resolved"
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Operational Control
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Issues
            </h1>

            <p className="text-slate-500 mt-2">
              Track, prioritize and resolve fulfillment problems.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ClipboardList size={17} />
            {openIssues.length} open issues
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Open */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={19}
                className="text-red-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Open issues
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {openIssues.length}
              </p>
            </div>
          </div>
        </div>

        {/* High priority */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock
                size={19}
                className="text-amber-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                High priority
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {highPriorityIssues.length}
              </p>
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2
                size={19}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Resolved
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {resolvedIssues.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search / filters */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Search issue, order, type, location..."
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">
              All statuses
            </option>

            <option value="open">
              Open
            </option>

            <option value="resolved">
              Resolved
            </option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
            className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">
              All priorities
            </option>

            <option value="high">
              High
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="low">
              Low
            </option>
          </select>
        </div>

        {/* Filter information */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredIssues.length}
            </span>{" "}
            of {issues.length} issues
          </p>

          {(searchText ||
            statusFilter !== "all" ||
            priorityFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Issue table */}
      <IssueTable issues={filteredIssues} />
    </div>
  );
}