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
    let recordedBalance = totalDeposits + totalWithdrawals;
    return recordedBalance;
  }

  return (
    <div
      className="w-full flex justify-center "
    >
      {budgetList.map((budget) => {
        const spent = budgetSpent(budget.newBudget);
        const remaining = budget.newBudgetAmount - spent;
        const percentageSpent = (spent / budget.newBudgetAmount) * 100;
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
            className="budget bg-slate-200 shadow-md m-1 rounded p-2 text-center w-max"
            key={budget.newBudget}

          >
            <div className="progress-text w-full">
              <h3 className="bg-slate-50 shadow-inner font-semibold flex justify-center w-full rounded p-2">{budget.newBudget}</h3>
              <p >
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(budget.newBudgetAmount)}{" "}
                Budgeted
              </p>
              <progress
                max={budget.newBudgetAmount}
                value={spent}
                className="w-5/6 w3-container w3-pro"
                style={{ backgroundColor: progressBarColor }}
              ></progress>
              <small className=" text-lg font-thin p-2">{formatPercentage(percentageSpent / 100)}</small>
              <span>
                <p className="bg-slate-50 rounded p-2 shadow-inner m-1" >
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
