export const products = [
  {
    sku: "WM-204",
    name: "Wireless Mouse",
    category: "Accessories",
    mainWarehouse: 12,
    secondaryWarehouse: 0,
    reserved: 3,
    reorderLevel: 5,
  },

  {
    sku: "KB-109",
    name: "Mechanical Keyboard",
    category: "Accessories",
    mainWarehouse: 2,
    secondaryWarehouse: 8,
    reserved: 4,
    reorderLevel: 5,
  },

  {
    sku: "HP-301",
    name: "Noise Cancelling Headphones",
    category: "Audio",
    mainWarehouse: 0,
    secondaryWarehouse: 15,
    reserved: 2,
    reorderLevel: 5,
  },

  {
    sku: "USB-402",
    name: "USB-C Cable",
    category: "Cables",
    mainWarehouse: 45,
    secondaryWarehouse: 20,
    reserved: 10,
    reorderLevel: 10,
  },

  {
    sku: "LP-501",
    name: "Aluminium Laptop Stand",
    category: "Workspace",
    mainWarehouse: 7,
    secondaryWarehouse: 5,
    reserved: 2,
    reorderLevel: 5,
  },

  {
    sku: "CH-205",
    name: "65W Charger",
    category: "Power",
    mainWarehouse: 4,
    secondaryWarehouse: 12,
    reserved: 3,
    reorderLevel: 5,
  },

  {
    sku: "HD-601",
    name: "USB Hub",
    category: "Accessories",
    mainWarehouse: 18,
    secondaryWarehouse: 6,
    reserved: 4,
    reorderLevel: 8,
  },

  {
    sku: "WC-702",
    name: "1080p Webcam",
    category: "Electronics",
    mainWarehouse: 9,
    secondaryWarehouse: 4,
    reserved: 2,
    reorderLevel: 5,
  },
];

export const getAvailableStock = (product) => {
  return Math.max(product.mainWarehouse - product.reserved, 0);
};

export const getInventoryStatus = (product) => {
  const available = getAvailableStock(product);

  if (available === 0 && product.secondaryWarehouse > 0) {
    return "transfer";
  }

  if (available <= product.reorderLevel) {
    return "low";
  }

  return "healthy";
};