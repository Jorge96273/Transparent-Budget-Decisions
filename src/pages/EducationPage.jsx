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

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const saveChatToFirestore = async (userMessage, botMessage) => {
    try {
      await addDoc(collection(db, "chats"), {
        userMessage,
        botMessage,
        timestamp: new Date(),
      });
      console.log("Chat history saved to Firestore");
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  const handleSend = async () => {
    const userMessage = { sender: "User", message: userInput };
    setChatHistory([...chatHistory, userMessage]);

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
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);

      saveChatToFirestore(userMessage, botMessage);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }

    setUserInput("");
  };

  return (
    <>
      <div className='mt-20 flex flex-col justify-betwee'>
        <span className='flex w-full justify-center'>
          Ask TBD-Bot any financial question:{" "}
        </span>
        <div className='flex justify-center w-full'>
          <div className=''>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <strong>{chat.sender}:</strong> {chat.message}
              </div>
            ))}
          </div>
          <input type='text' value={userInput} onChange={handleInputChange} />

          <button
            className=' ml-2 rounded-full bg-black pt-2 pb-2 pl-6 pr-6 text-white'
            onClick={handleSend}
          >
            Enter
          </button>
        </div>
        <div className='flex justify-center'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-lg rounded bg-white pt-2 pb-2 pl-8 pr-8 m-2 h'>
                What is good debt?
              </AccordionTrigger>
              <AccordionContent>
                Good debt is debt that can be leveraged strategically to
                positively affect or enhance your ability to obtain a positive
                return on your investment of that debt or..
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-lg rounded bg-white pt-2 pb-2 pl-8 pr-8 m-2 h'>
                What is bad debt?
              </AccordionTrigger>
              <AccordionContent>
                Bad debt is debt that ...
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
