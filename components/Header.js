"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  Bell,
  UserCircle,
  X,
  Package,
  AlertTriangle,
  Boxes,
} from "lucide-react";

import { orders } from "../data/orders";
import { products } from "../data/products";
import { issues } from "../data/issues";

export default function Header() {
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = searchText.toLowerCase().trim();

  const matchingOrders =
    search.length === 0
      ? []
      : orders
          .filter((order) => {
            return (
              order.id.toLowerCase().includes(search) ||
              order.customer.toLowerCase().includes(search) ||
              order.courier.toLowerCase().includes(search) ||
              order.items.some((item) =>
                item.name.toLowerCase().includes(search)
              )
            );
          })
          .slice(0, 4);

  const matchingProducts =
    search.length === 0
      ? []
      : products
          .filter((product) => {
            return (
              product.name.toLowerCase().includes(search) ||
              product.sku.toLowerCase().includes(search) ||
              product.category.toLowerCase().includes(search)
            );
          })
          .slice(0, 4);

  const matchingIssues =
    search.length === 0
      ? []
      : issues
          .filter((issue) => {
            return (
              issue.id.toLowerCase().includes(search) ||
              issue.title.toLowerCase().includes(search) ||
              issue.type.toLowerCase().includes(search) ||
              issue.location.toLowerCase().includes(search) ||
              (issue.orderId &&
                issue.orderId.toLowerCase().includes(search))
            );
          })
          .slice(0, 4);

  const hasResults =
    matchingOrders.length > 0 ||
    matchingProducts.length > 0 ||
    matchingIssues.length > 0;

  function openSearch() {
    setSearchOpen(true);

    setTimeout(() => {
      document
        .getElementById("global-search")
        ?.focus();
    }, 50);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchText("");
  }

  function goToOrder(id) {
    closeSearch();
    router.push(`/orders/${id}`);
  }

  function goToIssue(id) {
    closeSearch();
    router.push(`/issues/${id}`);
  }

  function goToInventory() {
    closeSearch();
    router.push("/inventory");
  }

  return (
    <>
      <header className="h-[94px] bg-white border-b border-slate-200 flex items-center justify-between px-8 relative z-40">
        {/* Left side */}
        <div>
          <h1 className="text-[28px] font-bold text-slate-900">
            Fulfillment Operations
          </h1>

          <p className="text-[17px] text-slate-500 mt-1">
            Monitor orders, inventory and operational issues
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* SEARCH BUTTON */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open global search"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition"
          >
            <Search size={27} strokeWidth={1.8} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
          >
            <Bell
              size={27}
              strokeWidth={1.8}
            />

            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 ml-1">
            <UserCircle
              size={47}
              strokeWidth={1.5}
              className="text-slate-500"
            />

            <div>
              <p className="text-[17px] font-medium text-slate-900">
                Operations Manager
              </p>

              <p className="text-sm text-slate-500">
                XYZ
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =============================== */}
      {/* GLOBAL SEARCH PANEL */}
      {/* =============================== */}

      {searchOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-slate-900/20 z-40"
            onClick={closeSearch}
          />

          {/* Search panel */}
          <div className="fixed top-[105px] right-8 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
            {/* Search input */}
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="global-search"
                  type="text"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Escape"
                    ) {
                      closeSearch();
                    }
                  }}
                  placeholder="Search orders, products or issues..."
                  className="w-full h-12 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={closeSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Search content */}
            <div className="max-h-[500px] overflow-y-auto">
              {/* Empty state */}
              {search.length === 0 && (
                <div className="p-8 text-center">
                  <Search
                    size={34}
                    className="mx-auto text-slate-300"
                  />

                  <p className="text-sm font-medium text-slate-700 mt-3">
                    Search OpsLane
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Find orders, products, SKUs and operational issues.
                  </p>
                </div>
              )}

              {/* No results */}
              {search.length > 0 &&
                !hasResults && (
                  <div className="p-8 text-center">
                    <Search
                      size={34}
                      className="mx-auto text-slate-300"
                    />

                    <p className="text-sm font-medium text-slate-700 mt-3">
                      No results found
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Try searching for an order, customer, product or issue.
                    </p>
                  </div>
                )}

              {/* Orders */}
              {matchingOrders.length > 0 && (
                <div>
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Orders
                    </p>
                  </div>

                  {matchingOrders.map((order) => (
                    <button
                      type="button"
                      key={order.id}
                      onClick={() =>
                        goToOrder(order.id)
                      }
                      className="w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-50 text-left transition"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Package
                          size={17}
                          className="text-blue-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          #{order.id} · {order.customer}
                        </p>

                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {order.items
                            .map(
                              (item) => item.name
                            )
                            .join(", ")}
                        </p>
                      </div>

                      <span className="ml-auto text-xs text-slate-400">
                        {order.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Inventory
                    </p>
                  </div>

                  {matchingProducts.map(
                    (product) => (
                      <button
                        type="button"
                        key={product.sku}
                        onClick={goToInventory}
                        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-50 text-left transition"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Boxes
                            size={17}
                            className="text-blue-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-500 mt-0.5">
                            SKU: {product.sku}
                          </p>
                        </div>

                        <span className="ml-auto text-xs text-slate-400">
                          Inventory
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}

              {/* Issues */}
              {matchingIssues.length > 0 && (
                <div>
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Issues
                    </p>
                  </div>

                  {matchingIssues.map((issue) => (
                    <button
                      type="button"
                      key={issue.id}
                      onClick={() =>
                        goToIssue(issue.id)
                      }
                      className="w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-50 text-left transition"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle
                          size={17}
                          className="text-red-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          {issue.id}
                        </p>

                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {issue.title}
                        </p>
                      </div>

                      <span
                        className={`ml-auto text-xs font-medium ${
                          issue.status === "open"
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}