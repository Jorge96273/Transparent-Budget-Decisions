import React from "react";
import { Currency } from "lucide-react";

const AccountBalances = ({ currentAccountBalance, accountList }) => {
  // Filter accountList into separate arrays for debit, credit, and savings accounts
  const debitAccounts = accountList.filter(
    (account) => account.accountType === "Debit"
  );
  const creditAccounts = accountList.filter(
    (account) => account.accountType === "Credit"
  );
  const savingsAccounts = accountList.filter(
    (account) => account.accountType === "Savings"
  );

  // Function to determine the color based on the balance
  const getBalanceColor = (balance) => {
    return balance.includes("-") ? "red" : "green";
  };

  const debitBalance = currentAccountBalance("Debit");
  const savingsBalance = currentAccountBalance("Savings");
  const creditBalance = currentAccountBalance("Credit");

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {debitAccounts.length > 0 ? (
        <div
          className="budget text-center w-25"
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
            <h3 style={{ color: "#D4B16D" }}>Debit Account Balance</h3>
            <p style={{ color: getBalanceColor(debitBalance) }}>
              {debitBalance}
            </p>
          </div>
        </div>
      ) : null}
      {creditAccounts.length > 0 ? (
        <div
          className="budget text-center w-25"
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
            <h3 style={{ color: "#D4B16D" }}>Credit Account Balance</h3>
            <p style={{ color: getBalanceColor(creditBalance) }}>
              {creditBalance}
            </p>
          </div>
        </div>
      ) : null}
      {savingsAccounts.length > 0 ? (
        <div
          className="budget text-center w-25"
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
            <h3 style={{ color: "#D4B16D" }}>Savings Account Balance</h3>
            <p style={{ color: getBalanceColor(savingsBalance) }}>
              {savingsBalance}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AccountBalances;
