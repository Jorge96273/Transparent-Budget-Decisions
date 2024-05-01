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
          if (transaction.newTransactionType === "Withdrawl") {
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
        justifyContent: "space-between",
      }}
    >
      {budgetList.map((budget) => {
        const spent = budgetSpent(budget.newBudget);
        const remaining = budget.newBudgetAmount - spent;
        const percentageSpent = ((spent * -1) / budget.newBudgetAmount) * 100;

        return (
          <div
            className="budget text-center w-25"
            key={budget.newBudget}
            style={{
              border: "2px solid rgb(4, 28, 42)",
              borderRadius: "10px", // Add rounded corners
              backgroundColor: "rgb(4, 28, 42)",
              color: "white",
              flex: "1 0 25%",
              marginBottom: "20px",
              marginRight: "10px", // Add space to the right of each item
            }}
          >
            <div className="progress-text w-full">
              <h3>{budget.newBudget}</h3>
              <p>{formatCurrency(budget.newBudgetAmount)} Budgeted</p>
              <progress
                max={budget.newBudgetAmount}
                value={spent * -1}
                className="w-75 red"
                style={{}}
              ></progress>
              <small>{formatPercentage(percentageSpent / 100)}</small>
              <span>
                <p>
                  Spent: {formatCurrency(spent * -1)}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Remaining:{" "}
                  {formatCurrency(remaining)}
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
