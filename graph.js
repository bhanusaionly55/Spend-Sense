import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js';

document.addEventListener('DOMContentLoaded', () => {
    const balanceChartCanvas = document.getElementById('balanceChart');
    let incomeAmounts = [];
    let expenseAmounts = [];

    const createChart = () => {
        const labels = Array.from({ length: incomeAmounts.length }, (_, i) => `Transaction ${i + 1}`);

        // Create cumulative data for the chart
        const cumulativeIncome = incomeAmounts.map((amount, index) => incomeAmounts.slice(0, index + 1).reduce((a, b) => a + b, 0));
        const cumulativeExpenses = expenseAmounts.map((amount, index) => expenseAmounts.slice(0, index + 1).reduce((a, b) => a + b, 0));

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Cumulative Income',
                    data: cumulativeIncome,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    fill: true,
                },
                {
                    label: 'Cumulative Expenses',
                    data: cumulativeExpenses.map(expense => -expense), // Negate expenses for visual representation
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true,
                }
            ]
        };

        new Chart(balanceChartCanvas, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // Handle income submission
    document.getElementById('incomeAddForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const amount = parseFloat(document.getElementById('newIncomeInput').value);
        if (!isNaN(amount)) {
            // Add the amount to incomeAmounts
            incomeAmounts.push(amount);
            document.getElementById('newIncomeInput').value = ''; // Clear the input
            createChart(); // Refresh the chart
        }
    });

    // Handle expense submission
    document.getElementById('expenseAddForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const amount = parseFloat(document.getElementById('newExpenseInput').value);
        if (!isNaN(amount)) {
            // Add the amount to expenseAmounts
            expenseAmounts.push(amount);
            document.getElementById('newExpenseInput').value = ''; // Clear the input
            createChart(); // Refresh the chart
        }
    });
});
