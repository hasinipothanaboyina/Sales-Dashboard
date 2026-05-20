let salesData = [];

let revenueChart;
let industryChart;


// CSV IMPORT

document
.getElementById("csvFile")
.addEventListener("change", function(event){

  const file = event.target.files[0];

  Papa.parse(file, {

    header:true,
    skipEmptyLines:true,

    complete:function(results){

      salesData = results.data;

      console.log(salesData);

      loadYearFilter();

      processDashboard();

    }

  });

});



// LOAD YEAR FILTER

function loadYearFilter(){

  const yearFilter =
  document.getElementById("yearFilter");

  yearFilter.innerHTML =
  `<option value="All">All Years</option>`;

  const years =
  [...new Set(
    salesData.map(item => item.Year)
  )];

  years.forEach(year => {

    const option =
    document.createElement("option");

    option.value = year;

    option.textContent = year;

    yearFilter.appendChild(option);

  });

}



// FILTER CHANGE EVENT

document
.getElementById("yearFilter")
.addEventListener("change", function(){

  processDashboard();

});



// PROCESS DASHBOARD

function processDashboard(){

  const selectedYear =
  document.getElementById("yearFilter").value;

  const filteredData =
  selectedYear === "All"

  ? salesData

  : salesData.filter(item =>
      item.Year === selectedYear
    );

  let totalIncome = 0;

  let totalExpenditure = 0;

  filteredData.forEach(item => {

    const value =
    parseFloat(item.Value) || 0;

    if(item.Variable_name === "Total income"){

      totalIncome += value;

    }

    if(item.Variable_name === "Total expenditure"){

      totalExpenditure += value;

    }

  });


  // PROFIT

  const profit =
  totalIncome - totalExpenditure;


  // KPI UPDATE

  document.getElementById("revenue")
  .innerText =
  "₹ " + totalIncome.toLocaleString();

  document.getElementById("profit")
  .innerText =
  "₹ " + profit.toLocaleString();

  document.getElementById("orders")
  .innerText =
  filteredData.length;

  document.getElementById("topProduct")
  .innerText =
  "Enterprise Survey";


  // CHARTS

  createRevenueChart(filteredData);

  createIndustryChart(filteredData);

}



// REVENUE CHART

function createRevenueChart(data){

  const yearlyData = {};

  data.forEach(item => {

    const year = item.Year;

    const value =
    parseFloat(item.Value) || 0;

    if(item.Variable_name === "Total income"){

      if(!yearlyData[year]){

        yearlyData[year] = 0;

      }

      yearlyData[year] += value;

    }

  });

  const revenueCtx =
  document.getElementById("revenueChart");

  if(revenueChart){

    revenueChart.destroy();

  }

  revenueChart = new Chart(revenueCtx, {

    type:'line',

    data:{

      labels:
      Object.keys(yearlyData),

      datasets:[{

        label:'Total Income',

        data:
        Object.values(yearlyData),

        borderWidth:3,

        tension:0.4,

        fill:true

      }]

    },

    options:{

      responsive:true

    }

  });

}



// INDUSTRY CHART

function createIndustryChart(data){

  const industryData = {};

  data.forEach(item => {

    const industry =
    item.Industry_name_NZSIOC;

    const value =
    parseFloat(item.Value) || 0;

    if(item.Variable_name === "Total income"){

      if(!industryData[industry]){

        industryData[industry] = 0;

      }

      industryData[industry] += value;

    }

  });

  const topIndustries =
  Object.entries(industryData)
  .slice(0,10);

  const productCtx =
  document.getElementById("productChart");

  if(industryChart){

    industryChart.destroy();

  }

  industryChart = new Chart(productCtx, {

    type:'bar',

    data:{

      labels:
      topIndustries.map(item => item[0]),

      datasets:[{

        label:'Industry Revenue',

        data:
        topIndustries.map(item => item[1]),

        borderWidth:1

      }]

    },

    options:{

      responsive:true

    }

  });

}
