"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  AlertTriangle,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">
          Ops<span className="text-blue-400">Lane</span>
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Fulfillment Operations Hub
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* Orders */}
        <Link
          href="/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <Package size={20} />
          <span>Orders</span>
        </Link>

        {/* Inventory */}
        <Link
          href="/inventory"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <Warehouse size={20} />
          <span>Inventory</span>
        </Link>

        {/* Issues */}
        <Link
          href="/issues"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <AlertTriangle size={20} />
          <span>Issues</span>
        </Link>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-6 py-5 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          OpsLane
        </p>
      </div>
    </aside>
  );
}