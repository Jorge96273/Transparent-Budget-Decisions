import React from "react";
import { Currency } from "lucide-react";

const BudgetItem = ({ budgetList, accountList }) => {
  const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });
  };

  const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  };

  function budgetSpent(category) {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      accountList.forEach((transaction) => {
        if (transaction.selectBudget === category) {
          if (transaction.newTransactionType === "Withdrawal") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
          }
        }
      });
    }
    let recordedBalance = totalDeposits - totalWithdrawals;
    return recordedBalance;
  }

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {budgetList.map((budget) => {
        const spent = budgetSpent(budget.newBudget);
        const remaining = budget.newBudgetAmount - spent;
        const percentageSpent = ((spent * -1) / budget.newBudgetAmount) * 100;
        const progressBarColor =
          percentageSpent <= 50
            ? "green"
            : percentageSpent <= 75
            ? "yellow"
            : percentageSpent <= 99
            ? "orange"
            : "red";

        return (
          <div
            className="budget text-center w-25"
            key={budget.newBudget}
            style={{
              border: "2px solid rgb(4, 28, 42)",
              borderRadius: "10px",
              backgroundColor: "rgb(4, 28, 42)",
              color: "white",
              flex: "1 0 25%",
              marginBottom: "20px",
              marginRight: "10px",
            }}
          >
            <div className="progress-text w-full">
              <h3>{budget.newBudget}</h3>
              <p>{formatCurrency(budget.newBudgetAmount)} Budgeted</p>
              <progress
                max={budget.newBudgetAmount}
                value={spent * -1}
                className="w-75 w3-container w3-pro"
                style={{ backgroundColor: progressBarColor }}
              ></progress>
              <small>{formatPercentage(percentageSpent / 100)}</small>
              <span>
                <p>
                  Spent:{" "}
                  <span style={{ color: "red" }}>
                    {formatCurrency(spent * -1)}
                  </span>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Remaining:{" "}
                  <span style={{ color: "green" }}>
                    {formatCurrency(remaining)}
                  </span>
                </p>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetItem;
