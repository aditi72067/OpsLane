export const issues = [
  {
    id: "ISS-001",
    type: "Stock shortage",
    title: "Mechanical Keyboard unavailable",
    description:
      "The spreadsheet shows stock available, but the item could not be located in the main warehouse.",
    orderId: "1048",
    priority: "high",
    status: "open",
    location: "Main Warehouse - Aisle B3",
    createdAt: "10:35 AM",
    assignedTo: "Warehouse Team",
  },

  {
    id: "ISS-002",
    type: "Wrong variant",
    title: "Wrong product variant found",
    description:
      "The picked product does not match the colour variant specified in the order.",
    orderId: "1051",
    priority: "high",
    status: "open",
    location: "Main Warehouse - Aisle C2",
    createdAt: "11:05 AM",
    assignedTo: "Picking Team",
  },

  {
    id: "ISS-003",
    type: "Courier delay",
    title: "Courier pickup missed",
    description:
      "The scheduled courier pickup window has passed and the package is still waiting in staging.",
    orderId: "1054",
    priority: "high",
    status: "open",
    location: "Staging Area",
    createdAt: "11:40 AM",
    assignedTo: "Operations Team",
  },

  {
    id: "ISS-004",
    type: "Packing error",
    title: "Shipping label mismatch",
    description:
      "The shipping label attached to the package does not match the order document.",
    orderId: "1056",
    priority: "medium",
    status: "open",
    location: "Packing Station 2",
    createdAt: "12:10 PM",
    assignedTo: "Packing Team",
  },

  {
    id: "ISS-005",
    type: "Inventory transfer",
    title: "Stock needs warehouse transfer",
    description:
      "Required stock is available in the secondary warehouse but unavailable in the main warehouse.",
    orderId: "1058",
    priority: "medium",
    status: "open",
    location: "Secondary Warehouse",
    createdAt: "12:30 PM",
    assignedTo: "Warehouse Team",
  },

  {
    id: "ISS-006",
    type: "Inventory discrepancy",
    title: "Physical stock differs from system",
    description:
      "Physical count does not match the quantity recorded in the inventory system.",
    orderId: null,
    priority: "medium",
    status: "open",
    location: "Main Warehouse - Aisle D1",
    createdAt: "12:45 PM",
    assignedTo: "Inventory Team",
  },

  {
    id: "ISS-007",
    type: "Customer address",
    title: "Incomplete delivery address",
    description:
      "The customer address is missing the apartment or unit number.",
    orderId: "1061",
    priority: "low",
    status: "resolved",
    location: "Order Processing",
    createdAt: "9:20 AM",
    assignedTo: "Office Team",
  },

  {
    id: "ISS-008",
    type: "Courier issue",
    title: "Courier reassignment required",
    description:
      "The selected courier is unavailable for today's pickup window.",
    orderId: "1063",
    priority: "medium",
    status: "resolved",
    location: "Shipping Desk",
    createdAt: "9:45 AM",
    assignedTo: "Office Team",
  },
];

export const getOpenIssues = () => {
  return issues.filter((issue) => issue.status === "open");
};

export const getResolvedIssues = () => {
  return issues.filter(
    (issue) => issue.status === "resolved"
  );
};