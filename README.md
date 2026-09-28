# OpsLane

### Fulfillment Operations Hub

OpsLane is a centralized fulfillment operations dashboard designed for small e-commerce teams.

It brings together order tracking, priority management, inventory visibility, warehouse stock, and operational issue handling in one place.

---

## Problem

Small e-commerce operations often rely on spreadsheets, shared folders, and informal communication to manage fulfillment.

This can make it difficult to:

- Track the current status of orders
- Identify priority orders quickly
- Detect delayed orders
- Monitor inventory across multiple warehouses
- Identify low-stock products
- Track stock that needs to be transferred
- Record and resolve operational issues

---

## Solution

OpsLane provides a single operational workspace where a fulfillment team can monitor and act on these areas.

### Key Features

#### Operations Dashboard
- Total order overview
- Priority order count
- Delayed order count
- Open issue count
- Fulfillment pipeline
- Attention-required operational items

#### Order Management
- Search orders by order ID, customer, courier, or product
- Filter by fulfillment status
- Filter by priority
- View individual order details
- Track order progress through the fulfillment workflow

#### Inventory Management
- Product-level inventory visibility
- Main and secondary warehouse stock
- Reserved inventory
- Available inventory
- Low-stock identification
- Transfer-required identification

#### Issue Management
- Centralized operational issue tracking
- Issue priority and status
- Related order information
- Assigned team and location
- Recommended actions
- Resolve and reopen workflow

#### Global Search
Search across:

- Orders
- Products
- Operational issues

---

## Fulfillment Workflow

OpsLane represents the fulfillment process through the following stages:

**Received → Processing → Picking → Packing → Staging → Shipped**

Delayed orders are also identified separately for operational attention.

---

## Technology Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- Next.js App Router

---

## Project Structure

```text
opslane/
│
├── app/
│   ├── inventory/
│   ├── issues/
│   ├── orders/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── Header.js
│   ├── InventoryTable.js
│   ├── IssueTable.js
│   ├── OrderTable.js
│   ├── OrderTimeline.js
│   ├── Sidebar.js
│   ├── StatCard.js
│   └── StatusBadge.js
│
├── data/
│   ├── issues.js
│   ├── orders.js
│   └── products.js
│
└── README.md