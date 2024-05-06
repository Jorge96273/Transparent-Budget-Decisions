import React from "react";
import { Currency } from "lucide-react";

const AccountBalances = ({
  currentAccountBalance,
  accountList,
  accountNamesList,
}) => {
  // Function to determine the color based on the balance
  const getBalanceColor = (balance) => {
    return balance.includes("-") ? "red" : "green";
  };

  return (
    <div className="w-full flex flex-row justify-evenly">
      {accountNamesList.map((accountType) => {
        const filteredAccounts = accountList.filter(
          (account) => account.accountType === accountType.accountName
        );
        const balance = currentAccountBalance(accountType.accountName);

        if (filteredAccounts.length > 0) {
          return (
            <div
              key={accountType.accountName}
              className="text-center w-full m-1 pt-2 pb-2 pl-4 pr-4 bg-orange-100 rounded shadow-sm"
            >
              <div className="progress-text w-full">
                <h3 className="font-thin">{accountType.accountName}</h3>
                <h4 style={{ color: getBalanceColor(balance) }}>{balance}</h4>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default AccountBalances;
