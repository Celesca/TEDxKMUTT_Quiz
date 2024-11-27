export const personalityQuestions = [
  {
    question: "What's your ideal way to spend a weekend?",
    answers: [
      {
        text: "Reading a book",
        points: {
          thinker: 1,
          leader: 1,
        }
      },
      {
        text: "Going to a party",
        points: {
          socializer: 1,
          adventurer: 1,
        }
      },
      {
        text: "Exploring nature", points: {
          adventurer: 1,
        }
      },
      {
        text: "Organizing a project", points: {
          leader: 1,
        }
      },
      {
        text: "Planning future goals",

        points: {
          thinker: 1,
          leader: 1,
        }
      },
    ],
  },
  {
    question: "Which activity sounds most appealing?",
    answers: [
      { text: "Solving puzzles", personalityType: "Thinker" },
      { text: "Hosting a gathering", personalityType: "Socializer" },
      { text: "Going on a hike", personalityType: "Adventurer" },
      { text: "Organizing a project", personalityType: "Leader" },
    ],
  },
  // Add more questions as needed
];