import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import EmotionalHealthGraph from "./EmotionalHealthGraph";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []);

  const questions = [
    // Sleep Patterns
    {
      question: "How often do you have trouble falling asleep?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Sleep Patterns",
    },
    {
      question: "How often do you wake up during the night?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Sleep Patterns",
    },
    {
      question:
        "Do you wake up earlier than intended and can't fall back asleep?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Sleep Patterns",
    },
    {
      question: "How often do you wake up feeling rested?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
      category: "Sleep Patterns",
    },

    // Appetite Changes
    {
      question: "Have you experienced significant weight changes recently?",
      options: ["No change", "Lost weight", "Gained weight"],
      category: "Appetite Changes",
    },
    {
      question: "How has your appetite changed recently?",
      options: [
        "Decreased significantly",
        "Slightly decreased",
        "No change",
        "Slightly increased",
        "Increased significantly",
      ],
      category: "Appetite Changes",
    },
    {
      question: "Do you often forget to eat meals?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Appetite Changes",
    },

    // Activity Level
    {
      question: "Do you feel energetic throughout the day?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
      category: "Activity Level",
    },
    {
      question: "How often do you engage in physical activities?",
      options: [
        "Daily",
        "Several times a week",
        "Once a week",
        "Rarely",
        "Never",
      ],
      category: "Activity Level",
    },
    {
      question: "Do you feel restless or slowed down?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Activity Level",
    },

    // Concentration and Focus
    {
      question: "Do you find it hard to concentrate on tasks?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Concentration and Focus",
    },
    {
      question: "How often do you forget things you just heard or read?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Concentration and Focus",
    },
    {
      question: "Do you have difficulty making decisions?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Concentration and Focus",
    },

    // Thought Patterns
    {
      question: "Do you experience negative thought patterns?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "How often do you feel hopeless or helpless?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you have feelings of guilt or worthlessness?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you have thoughts of self-harm or suicide?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you feel overwhelmed by daily tasks?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },

    // Relationships
    {
      question: "Are you satisfied with your relationships?",
      options: [
        "Very satisfied",
        "Satisfied",
        "Neutral",
        "Unsatisfied",
        "Very unsatisfied",
      ],
      category: "Relationships",
    },
    {
      question: "Do you feel isolated or lonely?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Relationships",
    },
    {
      question: "How often do you socialize with friends or family?",
      options: [
        "Daily",
        "Several times a week",
        "Once a week",
        "Rarely",
        "Never",
      ],
      category: "Relationships",
    },
    {
      question: "Do you feel others understand you?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
      category: "Relationships",
    },

    // New Questions (Additional)
    {
      question: "Do you find little interest or pleasure in doing things?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question:
        "Have you lost interest in hobbies or activities you used to enjoy?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you feel anxious or worried most of the time?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you experience sudden feelings of panic or fear?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you avoid social situations due to fear or anxiety?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you feel irritated or easily annoyed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
    {
      question: "Do you have difficulty trusting others?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Relationships",
    },
    {
      question: "Do you feel disconnected from reality or yourself?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      category: "Thought Patterns",
    },
  ];

  const categories = [
    "Sleep Patterns",
    "Appetite Changes",
    "Activity Level",
    "Concentration and Focus",
    "Thought Patterns",
    "Relationships",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    let auth = localStorage.getItem("status");
    if (auth) {
      let data = JSON.parse(auth);
      setCategoryData(data);
      setShowResults(true);
    }
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#8884D8",
  ];

  const handleOptionClick = (optionIndex) => {
    setResponses([...responses, optionIndex]);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  const handleTest = () => {
    localStorage.removeItem("status");
    localStorage.removeItem("days");
    localStorage.removeItem("weeks");
    window.location.reload();
  };

  const calculateResults = () => {
    const categoryScores = {};
    const categoryMaxScores = {};

    categories.forEach((category) => {
      categoryScores[category] = 0;
      categoryMaxScores[category] = 0;
    });

    const positiveQuestions = [
      "How often do you wake up feeling rested?",
      "Do you feel energetic throughout the day?",
      "Are you satisfied with your relationships?",
      "How often do you socialize with friends or family?",
      "Do you feel others understand you?",
    ];

    questions.forEach((question, index) => {
      const response = responses[index];
      const maxOptionIndex = question.options.length - 1;
      const score = response !== undefined ? response : 0;
      let adjustedScore;

      if (positiveQuestions.includes(question.question)) {
        // For positive questions, higher score means better mental health
        adjustedScore = score;
      } else {
        // For negative questions, invert the score
        adjustedScore = maxOptionIndex - score;
      }

      // Adjust scoring for specific questions with different scales
      if (
        question.question ===
        "Have you experienced significant weight changes recently?"
      ) {
        if (score === 0) {
          adjustedScore = maxOptionIndex; // No change is positive
        } else {
          adjustedScore = 0; // Any change is negative
        }
      }

      categoryScores[question.category] += adjustedScore;
      categoryMaxScores[question.category] += maxOptionIndex;
    });

    // Calculate percentages for each category
    const categoryDataArray = categories.map((category, index) => {
      const maxScore = categoryMaxScores[category];
      const score = categoryScores[category];
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
      return {
        category,
        percentage: parseFloat(percentage.toFixed(2)),
        color: COLORS[index % COLORS.length],
      };
    });

    localStorage.setItem("status", JSON.stringify(categoryDataArray));
    setCategoryData(categoryDataArray);
  };

  if (showResults) {
    return (
      <div className="App results-page">
        <h1>Your Mental Health Assessment Results</h1>
        <div className="charts-container">
          {categoryData.map((entry, index) => (
            <div key={index} className="chart-wrapper">
              <h3>{entry.category}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Score", value: entry.percentage },
                      { name: "Remaining", value: 100 - entry.percentage },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell key="cell-0" fill={entry.color} />
                    <Cell key="cell-1" fill="#e0e0e0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="percentage-label">{entry.percentage}%</div>
            </div>
          ))}
          <button
            onClick={() => handleTest()}
            role="button"
            className="golden-button"
          >
            <span className="golden-text">Reset</span>
          </button>
        </div>
        <EmotionalHealthGraph />
      </div>
    );
  } else {
    const question = questions[currentQuestionIndex];
    return (
      <div className="App">
        <h1>Mental Health Assessment</h1>
        <div className="question-card">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="progress">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
