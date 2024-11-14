import React, { useEffect, useState } from "react";
import classes from "./Result.module.css";
import { useNavigate } from "react-router-dom";
import SpeechButton from "./SpeechButton";
const API = "Your_api_key ( open ai api )";
import { motion } from "framer-motion";
import "./result.css"; // Import the CSS file

const Result = ({ text }) => {
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const [isStatus, setIsStatus] = useState(false);
  const [chatGPTResponse, setChatGPTResponse] = useState("");

  useEffect(()=>{
    let auth = localStorage.getItem('user')
    if(!auth){
      navigate('/login')
    }
  },[])

  useEffect(() => {
    let auth = localStorage.getItem("status");
    if (auth) {
      setIsStatus(true);
    }
    getData();
  }, []);
  const getData = async () => {
    if (!text) {
      return false;
    }
    const data = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${text} \n\n Please give me a emotional support  like an therapist on this in respected language.\n
            Also in the last of the response give me the emotions recognition in the respected language`,
          },
        ],
      }),
    });
    const res = await data.json();
    let result = res.choices[0].message.content;
    let hello = result.split("\n");
    setChatGPTResponse(result);
    setResponse(hello);
    let auth = localStorage.getItem("status");
    if (auth) {
      const updatedData = await updateCategoryData(result);
      updateHistoricalData(updatedData);
    }
  };

  function updateHistoricalData(currentData) {
    let auth = localStorage.getItem("status");
    let data;
    if (auth) {
      data = JSON.parse(auth);
    }
    // Get today's date
    const today = new Date();
    const dateKey = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Retrieve days data from localStorage
    let daysData = JSON.parse(localStorage.getItem("days"));

    // Initialize daysData if it doesn't exist or is not an array
    if (!Array.isArray(daysData)) {
      daysData = [];
      // Save the empty array to localStorage
      localStorage.setItem("days", JSON.stringify(daysData));
    }

    // Remove any entries with the same date (to prevent duplicates)
    daysData = daysData.filter((entry) => entry.date !== dateKey);

    // Add current data to daysData
    daysData.push({ date: dateKey, data: currentData });

    // Keep only the last 7 days
    daysData = daysData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);

    // Save updated daysData to localStorage
    localStorage.setItem("days", JSON.stringify(daysData));

    // Calculate daily averages
    const dailyAverages = calculateAverage(daysData);

    // Now handle weeks data
    // Get the ISO week number
    const weekNumber = getISOWeekNumber(today);
    const yearWeekKey = `${today.getFullYear()}-W${weekNumber}`;

    // Retrieve weeks data from localStorage
    let weeksData = JSON.parse(localStorage.getItem("weeks"));

    // Initialize weeksData if it doesn't exist or is not an array
    if (!Array.isArray(weeksData)) {
      weeksData = [];
      // Save the empty array to localStorage
      localStorage.setItem("weeks", JSON.stringify(weeksData));
    }

    // Remove any entries with the same week (to prevent duplicates)
    weeksData = weeksData.filter((entry) => entry.week !== yearWeekKey);

    // Add current data to weeksData
    weeksData.push({ week: yearWeekKey, data: currentData });

    // Keep only the last 8 weeks
    weeksData = weeksData
      .sort((a, b) => b.week.localeCompare(a.week))
      .slice(0, 8);

    // Save updated weeksData to localStorage
    localStorage.setItem("weeks", JSON.stringify(weeksData));

    // Calculate weekly averages
    const weeklyAverages = calculateAverage(
      weeksData.map((entry) => ({ date: entry.week, data: entry.data }))
    );

    // Optionally, return the averages if needed
    return { dailyAverages, weeklyAverages };
  }

  // Helper function to calculate averages
  function calculateAverage(dataArray) {
    let auth = localStorage.getItem("status");
    let data;
    if (auth) {
      data = JSON.parse(auth);
    }
    const categoryData = data;
    if (dataArray.length === 0) return [];

    const categories = dataArray[0].data.map((item) => item.category);

    const totalSums = {};
    const averages = [];

    categories.forEach((category) => {
      totalSums[category] = 0;
    });

    dataArray.forEach((entry) => {
      entry.data.forEach((item) => {
        totalSums[item.category] += item.percentage;
      });
    });

    categories.forEach((category) => {
      const avg = totalSums[category] / dataArray.length;
      averages.push({
        category: category,
        average: parseFloat(avg.toFixed(2)),
      });
    });

    return averages;
  }

  // Helper function to get ISO week number
  function getISOWeekNumber(date) {
    let auth = localStorage.getItem("status");
    let data;
    if (auth) {
      data = JSON.parse(auth);
    }
    const categoryData = data;
    const tempDate = new Date(date.getTime());
    tempDate.setUTCDate(
      tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7)
    );
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }

  async function updateCategoryData(chatGPTRespons) {
    let auth = localStorage.getItem("status");
    let data;
    if (auth) {
      data = JSON.parse(auth);
    }
    let previousData = data;
    // Define categories and colors
    const categories = [
      "Sleep Patterns",
      "Appetite Changes",
      "Activity Level",
      "Concentration and Focus",
      "Thought Patterns",
      "Relationships",
    ];

    const COLORS = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#AA336A",
      "#8884D8",
    ];

    // Create a copy of the previous data
    const updatedData = previousData.map((data) => ({ ...data }));

    // Convert the ChatGPT response to lowercase for case-insensitive matching
    const responseText = chatGPTRespons.toLowerCase();

    let gptres, res, result;
    console.log("your previous results :-");
    console.log(updatedData);
    for (let i = 0; i < 6; i++) {
      gptres = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `catagory: ${updatedData[i].catagory}\n percentage: ${updatedData[i].percentage}\n userInput: ${text} \n chatGPTResponse: ${responseText} \n\n now give me only a number in the response on what should the new percentage of this catagory according to user input and chatGPT's response make consider all the aspects "userinput, previous percentage, gptresponse" and give the best response ( you can also return the same percentage it you think there is no change required or the prompt is not relatable to the catagory ) \n only make a difference of 5 - 15 in the new and previous percentage \n remember only give back a number not even any white spaces `,
            },
          ],
        }),
      });
      res = await gptres.json();
      result = res.choices[0].message.content;
      updatedData[i].percentage = Number(result);
    }
    console.log("your updated results :-");
    console.log(updatedData);
    // Save updated data to localStorage
    localStorage.setItem("status", JSON.stringify(updatedData));

    return updatedData;
  }

  return (
    <>
      <div>
        {chatGPTResponse ? (
          <div className={classes.container}>
            <div className="therapist-response-container">
              {" "}
              <motion.div
                className="therapist-response-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ul key={"1"} className={classes.list}>
                  {response.map((ele, ind) => (
                    <li key={ind}>{ele}</li>
                  ))}
                </ul>
                <SpeechButton text={chatGPTResponse} />
                <div className={"speechdiv"}>
                  <button
                    onClick={() => navigate("/voiceinput")}
                    className={"shadow__btn"}
                  >
                    <MicIcon />
                    Voice Input
                  </button>

                  <button
                    onClick={() => navigate("/textinput")}
                    className="shadow__btn"
                  >
                    <FilePenIcon />
                    Text Input
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {!isStatus && (
          <div>
            <h1>Please Start Your Dashboard</h1>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
