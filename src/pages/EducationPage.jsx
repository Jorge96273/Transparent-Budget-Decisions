import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bot from "../images/bot.svg";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    const userMessage = { sender: "User", message: userInput };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "Bot",
        message: response.data.choices[0].message.content,
      };
      setChatHistory([...chatHistory, userMessage, botMessage]);
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(chatHistory.length);

  return (
    <>
      <div className="animate-in fade-in duration-1000 flex flex-col justify-center items-center my-5">
        <div className="bg-slate-00 shadow-xl shadow-slate-200/50 rounded-2xl p-3 flex flex-col items-center justify-center w-5/6 ">
          <img src={bot} className="w-20"></img>
          <span className="font-bold text-slate-100 text-3xl">
            Ask TBD any financial question
          </span>

          <div className="w-full flex flex-col items-center">
            {chatHistory.length ? (
              <div className="bg-gray-100  p-2 mt-4 rounded shadow  flex flex-col items-start xl:1/3 lg:w-1/2 md:3/4 sm:w-3/4 max-h-80 overflow-y-scroll">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className="p-2 text-start bg-cyan-500 text-white m-2 rounded "
                  >
                    <strong className="text-gray-700">{chat.sender}:</strong>{" "}
                    {chat.message}
                  </div>
                ))}{" "}
                <div className="flex justify-center w-full mt-4">
                  <textarea
                    type="textArea"
                    value={userInput}
                    onChange={handleInputChange}
                    className="p-2 shadow-sm rounded w-full h-20 resize-none border border-gray-300"
                    placeholder="Type your message here..."
                  />
                  <button
                    className="ml-4 rounded-full h-10 mt-4 bg-cyan-500 hover:bg-cyan-400 pt-2 pb-2 pl-6 pr-6 text-white  "
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <textarea
                  type="textArea"
                  value={userInput}
                  onChange={handleInputChange}
                  className="p-2 shadow-sm rounded w-full h-20 resize-none border border-gray-300"
                  placeholder="Type your message here..."
                />
                <button
                  className="ml-4 rounded-full h-10 mt-4 bg-cyan-500 hover:bg-cyan-400 pt-2 pb-2 pl-6 pr-6 text-white  "
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            )}
          </div>

          <div className=" rounded mt-4 lg:w-1/2 md:w-2/3 sm:w-3/4 xs:w-11/12">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" rounded shadow bg-slate-500 text-slate-50 pt-2 pb-2 pl-3 pr-3 m-2 text-lg">
                  What is good debt?
                </AccordionTrigger>
                <AccordionContent className="ml-6 mr-6 text-slate-50">
                  Good debt is generally considered to be debt that is
                  considered an investment in the future, such as student loans,
                  mortgages, or business loans. This type of debt can help build
                  wealth over time by increasing earning potential, owning
                  valuable assets, or investing in a profitable business
                  venture. Good debt typically has low interest rates and can
                  provide long-term financial benefits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="rounded shadow bg-slate-500 text-slate-50 pt-2 pb-2 pl-3 pr-3 m-2 text-lg">
                  What is bad debt?
                </AccordionTrigger>
                <AccordionContent className="ml-6 mr-6 text-slate-50">
                  Bad debt is a term used to describe money that is owed to a
                  creditor but is unlikely to be repaid. This can occur when a
                  debtor defaults on a loan or credit card payment, or when a
                  business is unable to collect payment from a customer. Bad
                  debt can negatively impact a creditors financial position and
                  may result in a loss for the creditor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="rounded shadow bg-slate-500 text-slate-50 pt-2 pb-2 pl-3 pr-3 m-2 text-lg">
                  How can I save money with no job?
                </AccordionTrigger>
                <AccordionContent className="ml-6 mr-6 text-slate-50">
                  1. Cut down on unnecessary expenses: Analyze your spending
                  habits and prioritize essential expenses such as rent, food,
                  and utilities. Cut back on non-essential expenses like dining
                  out, shopping, and entertainment. 2. Use coupons and discount
                  codes: Look for deals and discounts when shopping for
                  essentials such as groceries and household items. Use coupons
                  and cashback apps to save money on purchases. 3. Utilize free
                  resources and services: Look for free community events, borrow
                  books from the library instead of buying them, and use free
                  resources online for entertainment and education. 4. Sell
                  unused items: Declutter your space and sell items that you no
                  longer need or use to make some extra cash. 5. Cook meals at
                  home: Eating out can be expensive, so try cooking your meals
                  at home to save money on food expenses. 6. Take advantage of
                  public transportation: Use public transportation or bike/walk
                  for local trips to save money on transportation costs. 7. Look
                  for side gigs: Consider freelancing, dog walking, babysitting,
                  or other side gigs to earn extra income while looking for a
                  job. 8. Prioritize saving: Even if you dont have a job, try to
                  set aside a portion of any income you receive or cut back on
                  expenses to save for future needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
