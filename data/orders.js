export const orders = [
  {
    id: "1048",
    customer: "Aarav Sharma",
    priority: "high",
    status: "picking",
    courier: "Delhivery",
    dueTime: "2:30 PM",
    orderTime: "10:12 AM",
    items: [
      {
        sku: "WM-204",
        name: "Wireless Mouse",
        quantity: 1,
      },
      {
        sku: "KB-109",
        name: "Mechanical Keyboard",
        quantity: 1,
      },
    ],
  },

  {
    id: "1049",
    customer: "Neha Kapoor",
    priority: "normal",
    status: "processing",
    courier: "BlueDart",
    dueTime: "4:00 PM",
    orderTime: "11:05 AM",
    items: [
      {
        sku: "HP-301",
        name: "Noise Cancelling Headphones",
        quantity: 1,
      },
    ],
  },

  {
    id: "1050",
    customer: "Riya Singh",
    priority: "normal",
    status: "packing",
    courier: "DTDC",
    dueTime: "5:00 PM",
    orderTime: "11:22 AM",
    items: [
      {
        sku: "USB-402",
        name: "USB-C Cable",
        quantity: 2,
      },
      {
        sku: "CH-205",
        name: "65W Charger",
        quantity: 1,
      },
    ],
  },

  {
    id: "1051",
    customer: "Kabir Jain",
    priority: "high",
    status: "staging",
    courier: "Delhivery",
    dueTime: "3:00 PM",
    orderTime: "9:45 AM",
    items: [
      {
        sku: "LP-501",
        name: "Aluminium Laptop Stand",
        quantity: 1,
      },
    ],
  },

  {
    id: "1052",
    customer: "Ananya Verma",
    priority: "high",
    status: "delayed",
    courier: "BlueDart",
    dueTime: "1:30 PM",
    orderTime: "8:50 AM",
    items: [
      {
        sku: "KB-109",
        name: "Mechanical Keyboard",
        quantity: 1,
      },
    ],
  },

  {
    id: "1053",
    customer: "Arjun Mehta",
    priority: "normal",
    status: "received",
    courier: "Ecom Express",
    dueTime: "6:00 PM",
    orderTime: "12:10 PM",
    items: [
      {
        sku: "WM-204",
        name: "Wireless Mouse",
        quantity: 1,
      },
    ],
  },

  {
    id: "1054",
    customer: "Meera Joshi",
    priority: "normal",
    status: "processing",
    courier: "DTDC",
    dueTime: "5:30 PM",
    orderTime: "12:22 PM",
    items: [
      {
        sku: "USB-402",
        name: "USB-C Cable",
        quantity: 3,
      },
    ],
  },

  {
    id: "1055",
    customer: "Vivek Malhotra",
    priority: "high",
    status: "picking",
    courier: "Delhivery",
    dueTime: "2:45 PM",
    orderTime: "9:15 AM",
    items: [
      {
        sku: "HP-301",
        name: "Noise Cancelling Headphones",
        quantity: 1,
      },
      {
        sku: "CH-205",
        name: "65W Charger",
        quantity: 1,
      },
    ],
  },

  {
    id: "1056",
    customer: "Simran Kaur",
    priority: "normal",
    status: "shipped",
    courier: "BlueDart",
    dueTime: "1:00 PM",
    orderTime: "8:15 AM",
    items: [
      {
        sku: "LP-501",
        name: "Aluminium Laptop Stand",
        quantity: 1,
      },
    ],
  },

  {
    id: "1057",
    customer: "Dev Patel",
    priority: "high",
    status: "packing",
    courier: "Delhivery",
    dueTime: "4:30 PM",
    orderTime: "10:40 AM",
    items: [
      {
        sku: "WM-204",
        name: "Wireless Mouse",
        quantity: 1,
      },
      {
        sku: "USB-402",
        name: "USB-C Cable",
        quantity: 1,
      },
    ],
  },

  {
    id: "1058",
    customer: "Ishita Rao",
    priority: "normal",
    status: "processing",
    courier: "Ecom Express",
    dueTime: "6:30 PM",
    orderTime: "12:35 PM",
    items: [
      {
        sku: "CH-205",
        name: "65W Charger",
        quantity: 1,
      },
    ],
  },

  {
    id: "1059",
    customer: "Rahul Bansal",
    priority: "normal",
    status: "staging",
    courier: "DTDC",
    dueTime: "3:45 PM",
    orderTime: "9:55 AM",
    items: [
      {
        sku: "KB-109",
        name: "Mechanical Keyboard",
        quantity: 1,
      },
    ],
  },
];

export const getOrderById = (id) => {
  return orders.find((order) => order.id === String(id));
};

export const getPriorityOrders = () => {
  return orders.filter((order) => order.priority === "high");
};

export const getDelayedOrders = () => {
  return orders.filter((order) => order.status === "delayed");
};