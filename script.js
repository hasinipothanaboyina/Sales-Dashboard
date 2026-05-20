const salesData = [
  {
    product: "Laptop",
    revenue: 50000,
    profit: 12000,
    month: "Jan"
  },
  {
    product: "Phone",
    revenue: 30000,
    profit: 8000,
    month: "Feb"
  },
  {
    product: "Headphones",
    revenue: 20000,
    profit: 5000,
    month: "Mar"
  },
  {
    product: "Tablet",
    revenue: 40000,
    profit: 10000,
    month: "Apr"
  },
  {
    product: "Smart Watch",
    revenue: 35000,
    profit: 9000,
    month: "May"
  }
];

let totalRevenue = 0;
let totalProfit = 0;
let totalOrders = salesData.length;

salesData.forEach(item => {
  totalRevenue += item.revenue;
  totalProfit += item.profit;
});

const topProduct = salesData.reduce((max, item) =>
  item.revenue > max.revenue ? item : max
);

// KPI VALUES

document.getElementById("revenue").innerText = `₹${totalRevenue}`;

document.getElementById("profit").innerText = `₹${totalProfit}`;

document.getElementById("orders").innerText = totalOrders;

document.getElementById("topProduct").innerText = topProduct.product;


// REVENUE LINE CHART

const revenueCtx = document.getElementById('revenueChart');

new Chart(revenueCtx, {
  type: 'line',
  data: {
    labels: salesData.map(item => item.month),
    datasets: [{
      label: 'Revenue',
      data: salesData.map(item => item.revenue),
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true
  }
});


// PRODUCT BAR CHART

const productCtx = document.getElementById('productChart');

new Chart(productCtx, {
  type: 'bar',
  data: {
    labels: salesData.map(item => item.product),
    datasets: [{
      label: 'Revenue',
      data: salesData.map(item => item.revenue),
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});