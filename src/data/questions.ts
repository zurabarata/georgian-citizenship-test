export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  explanation?: string;
}

export interface TestCategory {
  id: string;
  name: string;
  nameGeorgian: string;
  description: string;
  questions: Question[];
}

export const testCategories: TestCategory[] = [
  {
    id: 'georgian',
    name: 'Georgian Language',
    nameGeorgian: 'ქართული ენა',
    description: 'Test your knowledge of Georgian language and grammar',
    questions: [
      {
        id: 1,
        question: 'What is the capital of Georgia?',
        options: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi'],
        correctAnswer: 0,
        explanation: 'Tbilisi is the capital and largest city of Georgia.'
      },
      {
        id: 2,
        question: 'How do you say "Hello" in Georgian?',
        options: ['გამარჯობა (Gamarjoba)', 'ნახვამდის (Nakhvamdis)', 'მადლობა (Madloba)', 'გმარჯობთ (Gmarchobt)'],
        correctAnswer: 0,
        explanation: 'გამარჯობა (Gamarjoba) is the standard greeting in Georgian.'
      },
      {
        id: 3,
        question: 'What is the Georgian alphabet called?',
        options: ['Georgian Script', 'Mkhedruli', 'Asomtavruli', 'Nuskhuri'],
        correctAnswer: 1,
        explanation: 'Mkhedruli is the modern Georgian alphabet used today.'
      },
      {
        id: 4,
        question: 'What does "მადლობა" (Madloba) mean in English?',
        options: ['Hello', 'Thank you', 'Goodbye', 'Please'],
        correctAnswer: 1,
        explanation: 'მადლობა (Madloba) means "Thank you" in Georgian.'
      },
      {
        id: 5,
        question: 'How many letters are in the Georgian alphabet?',
        options: ['30', '33', '28', '35'],
        correctAnswer: 1,
        explanation: 'The Georgian alphabet has 33 letters.'
      },
      {
        id: 6,
        question: 'What is the Georgian word for "water"?',
        options: ['წყალი (Tskhali)', 'ხაჭაპური (Khachapuri)', 'ღვინო (Gvino)', 'პური (Puri)'],
        correctAnswer: 0,
        explanation: 'წყალი (Tskhali) means "water" in Georgian.'
      },
      {
        id: 7,
        question: 'What is the traditional Georgian bread called?',
        options: ['Khachapuri', 'Shoti', 'Lavash', 'Pita'],
        correctAnswer: 1,
        explanation: 'Shoti is the traditional Georgian bread baked in a special oven called tone.'
      },
      {
        id: 8,
        question: 'How do you say "I love you" in Georgian?',
        options: ['მე შენ მიყვარხარ (Me shen miqvarxar)', 'გმარჯობთ (Gmarchobt)', 'ნახვამდის (Nakhvamdis)', 'მადლობა (Madloba)'],
        correctAnswer: 0,
        explanation: 'მე შენ მიყვარხარ (Me shen miqvarxar) means "I love you" in Georgian.'
      },
      {
        id: 9,
        question: 'What is the Georgian word for "friend"?',
        options: ['მეგობარი (Megobari)', 'ძმა (Dzma)', 'დედა (Deda)', 'მამა (Mama)'],
        correctAnswer: 0,
        explanation: 'მეგობარი (Megobari) means "friend" in Georgian.'
      },
      {
        id: 10,
        question: 'What does "საქართველო" (Sakartvelo) mean?',
        options: ['Tbilisi', 'Georgia', 'Caucasus', 'Republic'],
        correctAnswer: 1,
        explanation: 'საქართველო (Sakartvelo) is the Georgian name for Georgia.'
      }
    ]
  },
  {
    id: 'history',
    name: 'Georgian History',
    nameGeorgian: 'საქართველოს ისტორია',
    description: 'Learn about Georgia\'s rich historical heritage',
    questions: [
      {
        id: 1,
        question: 'When did Georgia gain independence from the Soviet Union?',
        options: ['1989', '1990', '1991', '1992'],
        correctAnswer: 2,
        explanation: 'Georgia declared independence from the Soviet Union on April 9, 1991.'
      },
      {
        id: 2,
        question: 'Who was the first President of independent Georgia?',
        options: ['Eduard Shevardnadze', 'Zviad Gamsakhurdia', 'Mikheil Saakashvili', 'Giorgi Margvelashvili'],
        correctAnswer: 1,
        explanation: 'Zviad Gamsakhurdia was the first President of independent Georgia (1991-1992).'
      },
      {
        id: 3,
        question: 'What year was the Georgian Orthodox Church established?',
        options: ['337 AD', '387 AD', '451 AD', '527 AD'],
        correctAnswer: 0,
        explanation: 'The Georgian Orthodox Church was established in 337 AD.'
      },
      {
        id: 4,
        question: 'What year did Georgia become a Christian country?',
        options: ['337 AD', '387 AD', '451 AD', '527 AD'],
        correctAnswer: 0,
        explanation: 'Georgia officially adopted Christianity as the state religion in 337 AD.'
      },
      {
        id: 5,
        question: 'Who was the first female ruler of Georgia?',
        options: ['Queen Tamar', 'Queen Rusudan', 'Queen Ketevan', 'Queen Mariam'],
        correctAnswer: 0,
        explanation: 'Queen Tamar (1184-1213) was the first female ruler of Georgia and is considered one of its greatest monarchs.'
      },
      {
        id: 6,
        question: 'What was the capital of Georgia during the Golden Age?',
        options: ['Tbilisi', 'Kutaisi', 'Mtskheta', 'Telavi'],
        correctAnswer: 0,
        explanation: 'Tbilisi was the capital during Georgia\'s Golden Age under Queen Tamar.'
      },
      {
        id: 7,
        question: 'When did Georgia become part of the Russian Empire?',
        options: ['1801', '1810', '1829', '1830'],
        correctAnswer: 0,
        explanation: 'Georgia was annexed by the Russian Empire in 1801.'
      },
      {
        id: 8,
        question: 'What year did Georgia declare independence from the Soviet Union?',
        options: ['April 9, 1991', 'May 26, 1991', 'June 15, 1991', 'July 4, 1991'],
        correctAnswer: 0,
        explanation: 'Georgia declared independence from the Soviet Union on April 9, 1991.'
      },
      {
        id: 9,
        question: 'Who was the first democratically elected President of Georgia?',
        options: ['Eduard Shevardnadze', 'Zviad Gamsakhurdia', 'Mikheil Saakashvili', 'Giorgi Margvelashvili'],
        correctAnswer: 1,
        explanation: 'Zviad Gamsakhurdia was the first democratically elected President of Georgia in 1991.'
      },
      {
        id: 10,
        question: 'What year did the Rose Revolution take place in Georgia?',
        options: ['2001', '2002', '2003', '2004'],
        correctAnswer: 2,
        explanation: 'The Rose Revolution took place in November 2003, leading to the resignation of President Shevardnadze.'
      }
    ]
  },
  {
    id: 'law',
    name: 'Georgian Law',
    nameGeorgian: 'საქართველოს კანონმდებლობა',
    description: 'Understand Georgia\'s legal system and constitution',
    questions: [
      {
        id: 1,
        question: 'When was the current Constitution of Georgia adopted?',
        options: ['1991', '1995', '2004', '2010'],
        correctAnswer: 1,
        explanation: 'The current Constitution of Georgia was adopted on August 24, 1995.'
      },
      {
        id: 2,
        question: 'What is the minimum voting age in Georgia?',
        options: ['16 years', '17 years', '18 years', '21 years'],
        correctAnswer: 2,
        explanation: 'The minimum voting age in Georgia is 18 years.'
      },
      {
        id: 3,
        question: 'How many members are in the Parliament of Georgia?',
        options: ['100', '120', '150', '180'],
        correctAnswer: 2,
        explanation: 'The Parliament of Georgia has 150 members.'
      },
      {
        id: 4,
        question: 'What is the official language of Georgia?',
        options: ['Georgian', 'Russian', 'English', 'Georgian and Russian'],
        correctAnswer: 0,
        explanation: 'Georgian is the official language of Georgia according to the Constitution.'
      },
      {
        id: 5,
        question: 'What is the legal drinking age in Georgia?',
        options: ['16 years', '17 years', '18 years', '21 years'],
        correctAnswer: 2,
        explanation: 'The legal drinking age in Georgia is 18 years.'
      },
      {
        id: 6,
        question: 'What is the driving age in Georgia?',
        options: ['16 years', '17 years', '18 years', '21 years'],
        correctAnswer: 2,
        explanation: 'The minimum driving age in Georgia is 18 years.'
      },
      {
        id: 7,
        question: 'What is the currency of Georgia?',
        options: ['Georgian Lari', 'Georgian Ruble', 'Georgian Dollar', 'Georgian Euro'],
        correctAnswer: 0,
        explanation: 'The official currency of Georgia is the Georgian Lari (GEL).'
      },
      {
        id: 8,
        question: 'What is the national flag of Georgia called?',
        options: ['Five Cross Flag', 'Rose Flag', 'Lion Flag', 'Eagle Flag'],
        correctAnswer: 0,
        explanation: 'The national flag of Georgia is called the Five Cross Flag, featuring five red crosses on a white background.'
      },
      {
        id: 9,
        question: 'What is the national anthem of Georgia called?',
        options: ['Tavisupleba', 'Dideba', 'Sakartvelo', 'Mamuli'],
        correctAnswer: 0,
        explanation: 'The national anthem of Georgia is called "Tavisupleba" (Freedom).'
      },
      {
        id: 10,
        question: 'What is the capital city of Georgia?',
        options: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi'],
        correctAnswer: 0,
        explanation: 'Tbilisi is the capital and largest city of Georgia.'
      }
    ]
  }
];

export const getRandomQuestions = (categoryId: string, count = 10): Question[] => {
  const category = testCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  const shuffled = [...category.questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calculateScore = (answers: number[], questions: Question[]) => {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++;
    }
  });
  return correct;
};

export const isPassingScore = (score: number) => {
  return score >= 7; // Need at least 7 out of 10 to pass
};
