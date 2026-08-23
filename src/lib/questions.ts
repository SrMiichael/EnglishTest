export interface Question {
  id: number;
  topic: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  // 1. TO BE
  { id: 1, topic: "TO BE", text: "___ she a teacher?", options: ["Is", "Are", "Am", "Do"], correctAnswer: 0, explanation: "'She' es singular de tercera persona, por lo que se usa 'Is'. 'Are' es para plurales (they/you), 'Am' para 'I', y 'Do' no se usa con 'to be'." },
  { id: 2, topic: "TO BE", text: "Where ___ they from?", options: ["is", "are", "am", "do"], correctAnswer: 1, explanation: "'They' es un pronombre plural, por lo que requiere 'are'. 'Is' es para singular (he/she/it), 'am' para 'I'." },

  // 2. Opposites and Synonyms
  { id: 3, topic: "Opposites and Synonyms", text: "What is the opposite of 'happy'?", options: ["Sad", "Glad", "Mad", "Bad"], correctAnswer: 0, explanation: "'Happy' significa alegre/feliz. Su opuesto es 'Sad' (triste). 'Glad' es sinónimo, 'Mad' significa enojado, 'Bad' significa malo." },
  { id: 4, topic: "Opposites and Synonyms", text: "Which word is a synonym of 'big'?", options: ["Small", "Large", "Tiny", "Thin"], correctAnswer: 1, explanation: "'Big' significa grande. 'Large' también significa grande, por lo tanto es un sinónimo. 'Small' y 'Tiny' significan pequeño, 'Thin' significa delgado." },

  // 3. Action Verbs in Present Tense
  { id: 5, topic: "Action Verbs in Present Tense", text: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correctAnswer: 1, explanation: "Con 'She' (tercera persona singular) en presente simple, se agrega -s al verbo: 'goes'. 'Go' es para I/you/we/they, 'going' es gerundio, 'gone' es participio pasado." },
  { id: 6, topic: "Action Verbs in Present Tense", text: "He ___ breakfast at 7 a.m.", options: ["eat", "eating", "eats", "eaten"], correctAnswer: 2, explanation: "Con 'He' (tercera persona singular) se usa 'eats' (con -s). 'Eat' es para otras personas, 'eating' es gerundio, 'eaten' es participio pasado." },

  // 4. Yes/No & Information Questions
  { id: 7, topic: "Yes/No & Information Questions", text: "___ you like ice cream?", options: ["Do", "Does", "Are", "Is"], correctAnswer: 0, explanation: "Con 'you' se usa 'Do' para formar preguntas en presente simple. 'Does' es para he/she/it, 'Are' e 'Is' son del verbo 'to be'." },
  { id: 8, topic: "Yes/No & Information Questions", text: "What ___ your mother do?", options: ["does", "do", "is", "are"], correctAnswer: 0, explanation: "'Your mother' es tercera persona singular, por lo que se usa 'does' en preguntas en presente simple." },

  // 5. Occupations
  { id: 9, topic: "Occupations", text: "My father is a ___. He works in a hospital.", options: ["teacher", "doctor", "driver", "cook"], correctAnswer: 1, explanation: "La pista clave es 'works in a hospital' (trabaja en un hospital). De las opciones, 'doctor' es la ocupación que trabaja en un hospital." },
  { id: 10, topic: "Occupations", text: "She is a ___. She teaches students.", options: ["nurse", "pilot", "teacher", "farmer"], correctAnswer: 2, explanation: "La pista es 'teaches students' (enseña a estudiantes). 'Teacher' significa profesor/a, que es quien enseña." },

  // 6. Family
  { id: 11, topic: "Family", text: "My mother's mother is my ___.", options: ["aunt", "sister", "grandmother", "cousin"], correctAnswer: 2, explanation: "La madre de tu madre es tu abuela. En inglés, 'grandmother' significa abuela. 'Aunt' es tía, 'sister' es hermana, 'cousin' es primo/a." },
  { id: 12, topic: "Family", text: "Tom and I have the same parents. He is my ___.", options: ["cousin", "brother", "uncle", "friend"], correctAnswer: 1, explanation: "Si tú y Tom tienen los mismos padres, él es tu hermano. 'Brother' significa hermano. 'Cousin' es primo, 'uncle' es tío, 'friend' es amigo." },

  // 7. Days of the Week
  { id: 13, topic: "Days of the Week", text: "What day comes after Wednesday?", options: ["Monday", "Friday", "Thursday", "Saturday"], correctAnswer: 2, explanation: "El orden de los días es: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Después de Wednesday viene Thursday (jueves)." },
  { id: 14, topic: "Days of the Week", text: "We don't go to school on ___.", options: ["Monday", "Wednesday", "Sunday", "Thursday"], correctAnswer: 2, explanation: "Generalmente no se va a la escuela los domingos. 'Sunday' es domingo, que es día de descanso en la mayoría de países." },

  // 8. Months of the Year
  { id: 15, topic: "Months of the Year", text: "Christmas is in ___.", options: ["October", "November", "December", "January"], correctAnswer: 2, explanation: "La Navidad (Christmas) se celebra el 25 de diciembre. 'December' es diciembre." },
  { id: 16, topic: "Months of the Year", text: "Which month comes after February?", options: ["January", "March", "April", "May"], correctAnswer: 1, explanation: "El orden es: January, February, March, April... Después de February viene March (marzo)." },

  // 9. Possessive Adjectives
  { id: 17, topic: "Possessive Adjectives", text: "This is ___ book. (the book belongs to me)", options: ["my", "your", "his", "her"], correctAnswer: 0, explanation: "Si el libro me pertenece a mí, se usa 'my' (mi). 'Your' es tu, 'his' es su (de él), 'her' es su (de ella)." },
  { id: 18, topic: "Possessive Adjectives", text: "The dog is wagging ___ tail.", options: ["it", "its", "it's", "his"], correctAnswer: 1, explanation: "'Its' es el adjetivo posesivo para animales/objetos (su). 'It' es pronombre, 'it's' es contracción de 'it is', 'his' es para hombres." },

  // 10. Conjunctions
  { id: 19, topic: "Conjunctions", text: "I want to go ___ I don't have money.", options: ["and", "but", "or", "so"], correctAnswer: 1, explanation: "'But' (pero) conecta dos ideas opuestas. Quiero ir pero no tengo dinero. 'And' agrega, 'or' ofrece alternativa, 'so' indica consecuencia." },
  { id: 20, topic: "Conjunctions", text: "Would you like tea ___ coffee?", options: ["and", "but", "or", "so"], correctAnswer: 2, explanation: "'Or' (o) se usa para ofrecer alternativas. ¿Quieres té o café? 'And' sería para combinar ambas opciones." },

  // 11. Comparisons
  { id: 21, topic: "Comparisons", text: "My brother is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: 1, explanation: "Para comparar dos cosas se usa el comparativo: adjetivo corto + -er + 'than'. 'Taller' es la forma comparativa de 'tall'. 'Tallest' es superlativo, 'more tall' es incorrecto." },
  { id: 22, topic: "Comparisons", text: "Summer is the ___ season.", options: ["hot", "hotter", "hottest", "more hot"], correctAnswer: 2, explanation: "Con 'the' se usa el superlativo para indicar el mayor grado. 'Hottest' es el superlativo de 'hot'. 'Hotter' es comparativo, 'more hot' es incorrecto." },

  // 12. Demonstrative Pronouns
  { id: 23, topic: "Demonstrative Pronouns", text: "___ is my pen. (near me)", options: ["This", "That", "These", "Those"], correctAnswer: 0, explanation: "'This' se usa para algo cercano en singular. 'That' es para algo lejano, 'These' para algo cercano plural, 'Those' para algo lejano plural." },
  { id: 24, topic: "Demonstrative Pronouns", text: "Look at ___ birds over there!", options: ["this", "that", "these", "those"], correctAnswer: 3, explanation: "'Those' se usa para algo lejano y plural. 'Birds' es plural y 'over there' indica lejanía. 'These' sería para algo cercano plural." },

  // 13. Articles: a / an / the
  { id: 25, topic: "Articles: a / an / the", text: "I saw ___ elephant at the zoo.", options: ["a", "an", "the", "no article"], correctAnswer: 1, explanation: "'An' se usa antes de vocales (a, e, i, o, u). 'Elephant' empieza con vocal, por lo tanto se dice 'an elephant'. 'A' se usa antes de consonantes." },
  { id: 26, topic: "Articles: a / an / the", text: "She is ___ best student in the class.", options: ["a", "an", "the", "no article"], correctAnswer: 2, explanation: "'The' se usa con superlativos porque se refiere a algo único/definido. 'The best' es la forma superlativa con artículo definido." },

  // 14. Imperative
  { id: 27, topic: "Imperative", text: "___ quiet in the library!", options: ["Be", "Are", "Is", "Do"], correctAnswer: 0, explanation: "En el imperativo se usa la forma base del verbo. 'Be' es la forma imperativa de 'to be'. 'Are' e 'Is' son formas conjugadas, 'Do' no funciona aquí." },
  { id: 28, topic: "Imperative", text: "___ late for class!", options: ["Don't be", "Isn't", "Not be", "Don't"], correctAnswer: 0, explanation: "Para imperativo negativo con 'to be' se usa 'Don't be' + adjetivo. 'Don't be late' = No llegues tarde. Las demás opciones son gramaticalmente incorrectas." },

  // 15. Adverbs of Frequency
  { id: 29, topic: "Adverbs of Frequency", text: "She ___ brushes her teeth before bed.", options: ["always", "never", "sometimes", "rarely"], correctAnswer: 0, explanation: "'Always' (siempre) indica una acción que ocurre cada vez. Se usa con una rutina diaria como cepillarse los dientes antes de dormir. 'Never' sería la negación." },
  { id: 30, topic: "Adverbs of Frequency", text: "I ___ eat fast food because it's unhealthy.", options: ["always", "usually", "sometimes", "hardly ever"], correctAnswer: 3, explanation: "'Hardly ever' (casi nunca) indica una frecuencia muy baja, lo cual tiene sentido porque la comida rápida es 'unhealthy' (poco saludable)." },

  // 16. Object Pronouns & Prepositions
  { id: 31, topic: "Object Pronouns & Prepositions", text: "Give ___ the book, please.", options: ["I", "me", "my", "mine"], correctAnswer: 1, explanation: "'Me' es el pronombre de objeto para 'I'. Después de un verbo como 'give' se usa el pronombre de objeto. 'I' es sujeto, 'my' es posesivo, 'mine' es posesivo absoluto." },
  { id: 32, topic: "Object Pronouns & Prepositions", text: "The cat is sitting ___ the table.", options: ["on", "in", "at", "between"], correctAnswer: 0, explanation: "'On' se usa para superficies. El gato está sentado sobre (encima de) la mesa. 'In' es para dentro, 'at' para ubicaciones generales, 'between' es entre dos cosas." },

  // 17. There is / There are
  { id: 33, topic: "There is / There are", text: "___ a book on the desk.", options: ["There is", "There are", "There has", "It is"], correctAnswer: 0, explanation: "'There is' se usa con sustantivos singulares. 'A book' es singular. 'There are' es para plurales, 'There has' no existe, 'It is' no introduce existencia." },
  { id: 34, topic: "There is / There are", text: "___ many students in the classroom.", options: ["There is", "There are", "There has", "It is"], correctAnswer: 1, explanation: "'There are' se usa con sustantivos plurales. 'Many students' es plural. 'There is' es para singular, 'There has' no existe." },

  // 18. Was / Were
  { id: 35, topic: "Was / Were", text: "I ___ at home yesterday.", options: ["was", "were", "am", "is"], correctAnswer: 0, explanation: "'Was' es la forma pasado de 'to be' para I/he/she/it. 'Were' es para you/we/they. 'Am' e 'Is' son presente." },
  { id: 36, topic: "Was / Were", text: "They ___ at the park last Sunday.", options: ["was", "were", "are", "is"], correctAnswer: 1, explanation: "'Were' es la forma pasado de 'to be' para you/we/they. 'They' es plural, por lo tanto 'were'. 'Was' es para singular." },

  // 19. Expressing Past Events
  { id: 37, topic: "Expressing Past Events", text: "We ___ to the beach last summer.", options: ["go", "went", "goes", "going"], correctAnswer: 1, explanation: "'Went' es el pasado del verbo 'go'. 'Last summer' indica tiempo pasado. 'Go' es presente, 'goes' es presente tercera persona, 'going' es gerundio." },
  { id: 38, topic: "Expressing Past Events", text: "She ___ a letter yesterday.", options: ["write", "wrote", "written", "writes"], correctAnswer: 1, explanation: "'Wrote' es el pasado del verbo 'write'. 'Yesterday' indica tiempo pasado. 'Write' es presente, 'written' es participio, 'writes' es presente tercera persona." },

  // 20. Yes/No & Information Questions (Past)
  { id: 39, topic: "Questions in the Past", text: "___ you go to the party last night?", options: ["Do", "Does", "Did", "Are"], correctAnswer: 2, explanation: "'Did' es el auxiliar del pasado para formar preguntas. 'Last night' indica pasado. 'Do' y 'Does' son presente, 'Are' es del verbo 'to be'." },
  { id: 40, topic: "Questions in the Past", text: "Where ___ they go on vacation?", options: ["do", "did", "does", "are"], correctAnswer: 1, explanation: "Con preguntas en pasado se usa 'did'. 'They' en pasado requiere 'did' como auxiliar. 'Do' y 'does' son presente, 'are' es del verbo 'to be'." },

  // 21. Expressing Possibility (Can)
  { id: 41, topic: "Expressing Possibility (Can)", text: "___ you swim?", options: ["Do", "Are", "Can", "Is"], correctAnswer: 2, explanation: "'Can' se usa para preguntar sobre habilidades. ¿Puedes nadar? 'Do' es para acciones generales, 'Are' e 'Is' son del verbo 'to be'." },
  { id: 42, topic: "Expressing Possibility (Can)", text: "No, I ___. I don't know how.", options: ["can't", "don't", "am not", "won't"], correctAnswer: 0, explanation: "'Can't' es la negación de 'can' (no puedo). La respuesta a 'Can you...?' se da con can/can't. 'Don't' es para acciones generales, 'am not' es de 'to be', 'won't' es futuro." },

  // 22. Expressing Continuous Actions
  { id: 43, topic: "Continuous Actions", text: "Look! The baby ___.", options: ["sleeps", "is sleeping", "sleep", "slept"], correctAnswer: 1, explanation: "'Look!' indica una acción en desarrollo ahora mismo, por eso se usa presente continuo: 'is sleeping'. 'Sleeps' es presente simple, 'sleep' es forma base, 'slept' es pasado." },
  { id: 44, topic: "Continuous Actions", text: "It ___ outside. Take an umbrella.", options: ["rains", "is raining", "rained", "rain"], correctAnswer: 1, explanation: "'Is raining' indica que está lloviendo en este momento. La sugerencia de llevar paraguas indica una acción actual en progreso." },

  // 23. Questions in Continuous
  { id: 45, topic: "Questions in Continuous", text: "___ she working at the moment?", options: ["Is", "Does", "Do", "Are"], correctAnswer: 0, explanation: "El presente continuo usa 'is/am/are + verbo-ing'. 'She' (tercera persona singular) usa 'Is'. 'At the moment' indica acción actual." },
  { id: 46, topic: "Questions in Continuous", text: "What ___ they eating?", options: ["do", "are", "is", "does"], correctAnswer: 1, explanation: "En presente continuo con 'they' se usa 'are'. 'What are they eating?' = ¿Qué están comiendo? 'Do/does' son para presente simple, 'is' es para singular." },

  // 24. Future with Will
  { id: 47, topic: "Future with Will", text: "I ___ call you tomorrow.", options: ["will", "am", "do", "did"], correctAnswer: 0, explanation: "'Will' se usa para acciones futuras. 'Tomorrow' indica futuro. 'Am' es del verbo 'to be', 'do' es presente, 'did' es pasado." },
  { id: 48, topic: "Future with Will", text: "___ she come to the meeting?", options: ["Does", "Is", "Will", "Did"], correctAnswer: 2, explanation: "'Will' se usa para preguntas sobre el futuro. ¿Vendrá ella a la reunión? 'Does' es presente, 'Is' es del verbo 'to be', 'Did' es pasado." },

  // 25. Indefinite Quantities
  { id: 49, topic: "Indefinite Quantities", text: "There are ___ apples on the table.", options: ["a lot of", "a little", "much", "any"], correctAnswer: 0, explanation: "'A lot of' se usa con sustantivos contables en plural (apples). 'A little' es para incontables, 'much' para negativas/preguntas, 'any' para negativas/preguntas." },
  { id: 50, topic: "Indefinite Quantities", text: "How ___ water do you drink per day?", options: ["many", "much", "a lot", "any"], correctAnswer: 1, explanation: "'Much' se usa con sustantivos incontables (water) en preguntas y negativas. 'Many' es para contables, 'a lot' necesita 'of', 'any' no va con 'how'." },
];

// Helper to get a random subset of questions
export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
