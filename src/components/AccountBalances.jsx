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
    <>

     <div className="w-full px-3 py-1 flex flex-wrap justify-center">
      {accountNamesList.map((accountType) => {
        //* Maps through account names
        const filteredAccounts = accountList.filter(
          (account) => account.accountType === accountType.accountName
          //* Filters through transactions that match account names
        );
        const balance = currentAccountBalance(accountType.accountName);
        // * Uses account name as parameter for currentAccountBalance
        if (filteredAccounts.length > 0) {
          //* WILL NOT RENDER IF NO TRANSACTIONS ON THE ACCOUNT
          return (
            <div
              key={accountType.accountName}
              className="text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-100 rounded shadow-sm"
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
    </>
  );
};

export default AccountBalances;
