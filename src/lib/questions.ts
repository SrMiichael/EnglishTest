export interface Question {
  id: number;
  topic: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  // 1. TO BE
  { id: 1, topic: "TO BE", text: "___ she a teacher?", options: ["Is", "Are", "Am", "Do"], correctAnswer: 0 },
  { id: 2, topic: "TO BE", text: "Where ___ they from?", options: ["is", "are", "am", "do"], correctAnswer: 1 },

  // 2. Opposites and Synonyms
  { id: 3, topic: "Opposites and Synonyms", text: "What is the opposite of 'happy'?", options: ["Sad", "Glad", "Mad", "Bad"], correctAnswer: 0 },
  { id: 4, topic: "Opposites and Synonyms", text: "Which word is a synonym of 'big'?", options: ["Small", "Large", "Tiny", "Thin"], correctAnswer: 1 },

  // 3. Action Verbs in Present Tense
  { id: 5, topic: "Action Verbs in Present Tense", text: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correctAnswer: 1 },
  { id: 6, topic: "Action Verbs in Present Tense", text: "He ___ breakfast at 7 a.m.", options: ["eat", "eating", "eats", "eaten"], correctAnswer: 2 },

  // 4. Yes/No & Information Questions
  { id: 7, topic: "Yes/No & Information Questions", text: "___ you like ice cream?", options: ["Do", "Does", "Are", "Is"], correctAnswer: 0 },
  { id: 8, topic: "Yes/No & Information Questions", text: "What ___ your mother do?", options: ["does", "do", "is", "are"], correctAnswer: 0 },

  // 5. Occupations
  { id: 9, topic: "Occupations", text: "My father is a ___. He works in a hospital.", options: ["teacher", "doctor", "driver", "cook"], correctAnswer: 1 },
  { id: 10, topic: "Occupations", text: "She is a ___. She teaches students.", options: ["nurse", "pilot", "teacher", "farmer"], correctAnswer: 2 },

  // 6. Family
  { id: 11, topic: "Family", text: "My mother's mother is my ___.", options: ["aunt", "sister", "grandmother", "cousin"], correctAnswer: 2 },
  { id: 12, topic: "Family", text: "Tom and I have the same parents. He is my ___.", options: ["cousin", "brother", "uncle", "friend"], correctAnswer: 1 },

  // 7. Days of the Week
  { id: 13, topic: "Days of the Week", text: "What day comes after Wednesday?", options: ["Monday", "Friday", "Thursday", "Saturday"], correctAnswer: 2 },
  { id: 14, topic: "Days of the Week", text: "We don't go to school on ___.", options: ["Monday", "Wednesday", "Sunday", "Thursday"], correctAnswer: 2 },

  // 8. Months of the Year
  { id: 15, topic: "Months of the Year", text: "Christmas is in ___.", options: ["October", "November", "December", "January"], correctAnswer: 2 },
  { id: 16, topic: "Months of the Year", text: "Which month comes after February?", options: ["January", "March", "April", "May"], correctAnswer: 1 },

  // 9. Possessive Adjectives
  { id: 17, topic: "Possessive Adjectives", text: "This is ___ book. (the book belongs to me)", options: ["my", "your", "his", "her"], correctAnswer: 0 },
  { id: 18, topic: "Possessive Adjectives", text: "The dog is wagging ___ tail.", options: ["it", "its", "it's", "his"], correctAnswer: 1 },

  // 10. Conjunctions
  { id: 19, topic: "Conjunctions", text: "I want to go ___ I don't have money.", options: ["and", "but", "or", "so"], correctAnswer: 1 },
  { id: 20, topic: "Conjunctions", text: "Would you like tea ___ coffee?", options: ["and", "but", "or", "so"], correctAnswer: 2 },

  // 11. Comparisons
  { id: 21, topic: "Comparisons", text: "My brother is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: 1 },
  { id: 22, topic: "Comparisons", text: "Summer is the ___ season.", options: ["hot", "hotter", "hottest", "more hot"], correctAnswer: 2 },

  // 12. Demonstrative Pronouns
  { id: 23, topic: "Demonstrative Pronouns", text: "___ is my pen. (near me)", options: ["This", "That", "These", "Those"], correctAnswer: 0 },
  { id: 24, topic: "Demonstrative Pronouns", text: "Look at ___ birds over there!", options: ["this", "that", "these", "those"], correctAnswer: 3 },

  // 13. Articles: a / an / the
  { id: 25, topic: "Articles: a / an / the", text: "I saw ___ elephant at the zoo.", options: ["a", "an", "the", "no article"], correctAnswer: 1 },
  { id: 26, topic: "Articles: a / an / the", text: "She is ___ best student in the class.", options: ["a", "an", "the", "no article"], correctAnswer: 2 },

  // 14. Imperative
  { id: 27, topic: "Imperative", text: "___ quiet in the library!", options: ["Be", "Are", "Is", "Do"], correctAnswer: 0 },
  { id: 28, topic: "Imperative", text: "___ late for class!", options: ["Don't be", "Isn't", "Not be", "Don't"], correctAnswer: 0 },

  // 15. Adverbs of Frequency
  { id: 29, topic: "Adverbs of Frequency", text: "She ___ brushes her teeth before bed.", options: ["always", "never", "sometimes", "rarely"], correctAnswer: 0 },
  { id: 30, topic: "Adverbs of Frequency", text: "I ___ eat fast food because it's unhealthy.", options: ["always", "usually", "sometimes", "hardly ever"], correctAnswer: 3 },

  // 16. Object Pronouns & Prepositions
  { id: 31, topic: "Object Pronouns & Prepositions", text: "Give ___ the book, please.", options: ["I", "me", "my", "mine"], correctAnswer: 1 },
  { id: 32, topic: "Object Pronouns & Prepositions", text: "The cat is sitting ___ the table.", options: ["on", "in", "at", "between"], correctAnswer: 0 },

  // 17. There is / There are
  { id: 33, topic: "There is / There are", text: "___ a book on the desk.", options: ["There is", "There are", "There has", "It is"], correctAnswer: 0 },
  { id: 34, topic: "There is / There are", text: "___ many students in the classroom.", options: ["There is", "There are", "There has", "It is"], correctAnswer: 1 },

  // 18. Was / Were
  { id: 35, topic: "Was / Were", text: "I ___ at home yesterday.", options: ["was", "were", "am", "is"], correctAnswer: 0 },
  { id: 36, topic: "Was / Were", text: "They ___ at the park last Sunday.", options: ["was", "were", "are", "is"], correctAnswer: 1 },

  // 19. Expressing Past Events
  { id: 37, topic: "Expressing Past Events", text: "We ___ to the beach last summer.", options: ["go", "went", "goes", "going"], correctAnswer: 1 },
  { id: 38, topic: "Expressing Past Events", text: "She ___ a letter yesterday.", options: ["write", "wrote", "written", "writes"], correctAnswer: 1 },

  // 20. Yes/No & Information Questions (Past)
  { id: 39, topic: "Questions in the Past", text: "___ you go to the party last night?", options: ["Do", "Does", "Did", "Are"], correctAnswer: 2 },
  { id: 40, topic: "Questions in the Past", text: "Where ___ they go on vacation?", options: ["do", "did", "does", "are"], correctAnswer: 1 },

  // 21. Expressing Possibility (Can)
  { id: 41, topic: "Expressing Possibility (Can)", text: "___ you swim?", options: ["Do", "Are", "Can", "Is"], correctAnswer: 2 },
  { id: 42, topic: "Expressing Possibility (Can)", text: "No, I ___. I don't know how.", options: ["can't", "don't", "am not", "won't"], correctAnswer: 0 },

  // 22. Expressing Continuous Actions
  { id: 43, topic: "Continuous Actions", text: "Look! The baby ___.", options: ["sleeps", "is sleeping", "sleep", "slept"], correctAnswer: 1 },
  { id: 44, topic: "Continuous Actions", text: "It ___ outside. Take an umbrella.", options: ["rains", "is raining", "rained", "rain"], correctAnswer: 1 },

  // 23. Questions in Continuous
  { id: 45, topic: "Questions in Continuous", text: "___ she working at the moment?", options: ["Is", "Does", "Do", "Are"], correctAnswer: 0 },
  { id: 46, topic: "Questions in Continuous", text: "What ___ they eating?", options: ["do", "are", "is", "does"], correctAnswer: 1 },

  // 24. Future with Will
  { id: 47, topic: "Future with Will", text: "I ___ call you tomorrow.", options: ["will", "am", "do", "did"], correctAnswer: 0 },
  { id: 48, topic: "Future with Will", text: "___ she come to the meeting?", options: ["Does", "Is", "Will", "Did"], correctAnswer: 2 },

  // 25. Indefinite Quantities
  { id: 49, topic: "Indefinite Quantities", text: "There are ___ apples on the table.", options: ["a lot of", "a little", "much", "any"], correctAnswer: 0 },
  { id: 50, topic: "Indefinite Quantities", text: "How ___ water do you drink per day?", options: ["many", "much", "a lot", "any"], correctAnswer: 1 },
];

// Helper to get a random subset of questions
export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
