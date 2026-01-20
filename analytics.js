async function loadBestSellers() {
  const res = await fetch("https://69.164.193.187:3000/api/admin/analytics/best-sellers");
  const data = await res.json();

  if (!data.success) return;

  const labels = data.data.map(item => item.name);
  const values = data.data.map(item => item.units_sold);

  new Chart(document.getElementById("bestSellersChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Units Sold",
        data: values,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
async function loadTopRevenue() {
  const res = await fetch("http://69.164.193.187:3000/api/admin/analytics/top-revenue");
  const data = await res.json();

  if (!data.success) return;

  const labels = data.data.map(item => item.name);
  const values = data.data.map(item => Number(item.revenue));

  new Chart(document.getElementById("topRevenueChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Revenue ($)",
        data: values,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: value => `$${value}`
          }
        }
      }
    }
  });
}
loadBestSellers();
loadTopRevenue();
