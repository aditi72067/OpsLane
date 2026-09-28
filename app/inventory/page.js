"use client";

import { useState } from "react";
import {
  Search,
  Warehouse,
  AlertTriangle,
  ArrowRightLeft,
  PackageCheck,
} from "lucide-react";

import InventoryTable from "../../components/InventoryTable";
import {
  products,
  getAvailableStock,
  getInventoryStatus,
} from "../../data/products";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      searchValue === "" ||
      product.name.toLowerCase().includes(searchValue) ||
      product.sku.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue);

    const status = getInventoryStatus(product);

    const matchesFilter =
      filter === "all" ||
      status === filter;

    return matchesSearch && matchesFilter;
  });

  const transferCount = products.filter(
    (product) =>
      getInventoryStatus(product) === "transfer"
  ).length;

  const lowStockCount = products.filter(
    (product) =>
      getInventoryStatus(product) === "low"
  ).length;

  const totalAvailable = products.reduce(
    (total, product) =>
      total + getAvailableStock(product),
    0
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Warehouse Management
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Inventory
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor stock across the main and secondary warehouses.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Warehouse size={17} />
            {products.length} products tracked
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <PackageCheck
                size={19}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Available units
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {totalAvailable}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle
                size={19}
                className="text-amber-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Low stock
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {lowStockCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <ArrowRightLeft
                size={19}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Transfers required
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {transferCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search product, SKU or category..."
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
            className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">
              All inventory
            </option>

            <option value="healthy">
              Healthy
            </option>

            <option value="low">
              Low stock
            </option>

            <option value="transfer">
              Transfer required
            </option>
          </select>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredProducts.length}
            </span>{" "}
            of {products.length} products
          </p>

          {(search || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Inventory table */}
      <InventoryTable products={filteredProducts} />
    </div>
  );
}