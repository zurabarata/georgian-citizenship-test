export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  stem: string;
  options: Option[];
  answer: string;
}

export interface TestCategory {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  questions: Question[];
}

export const testCategories: TestCategory[] = [
  {
    id: 'georgian',
    title: 'ქართული ენა — მოქალაქეობის ტესტი',
    titleEnglish: 'Georgian Language — Citizenship Test',
    description: 'Test your knowledge of Georgian language and grammar',
    questions: [
      {
        id: 1,
        stem: 'რა არის ქართული ენის ოფიციალური სახელი?',
        options: [
          { id: 'A', text: 'ქართული' },
          { id: 'B', text: 'საქართველური' },
          { id: 'C', text: 'კართული' },
          { id: 'D', text: 'გეორგიული' }
        ],
        answer: 'A'
      },
      {
        id: 2,
        stem: 'რამდენი ასოა ქართულ ანბანში?',
        options: [
          { id: 'A', text: '30' },
          { id: 'B', text: '33' },
          { id: 'C', text: '28' },
          { id: 'D', text: '35' }
        ],
        answer: 'B'
      },
      {
        id: 3,
        stem: 'რა ეწოდება ქართული ანბანის თანამედროვე სახეობას?',
        options: [
          { id: 'A', text: 'ასომთავრული' },
          { id: 'B', text: 'მხედრული' },
          { id: 'C', text: 'ნუსხური' },
          { id: 'D', text: 'ხუცური' }
        ],
        answer: 'B'
      },
      {
        id: 4,
        stem: 'როგორ ვთქვათ "გმარჯობა" ქართულად?',
        options: [
          { id: 'A', text: 'გამარჯობა' },
          { id: 'B', text: 'ნახვამდის' },
          { id: 'C', text: 'მადლობა' },
          { id: 'D', text: 'გმარჯობთ' }
        ],
        answer: 'A'
      },
      {
        id: 5,
        stem: 'რა ნიშნავს სიტყვა "მადლობა"?',
        options: [
          { id: 'A', text: 'გამარჯობა' },
          { id: 'B', text: 'მადლობა' },
          { id: 'C', text: 'ნახვამდის' },
          { id: 'D', text: 'გმარჯობთ' }
        ],
        answer: 'B'
      },
      {
        id: 6,
        stem: 'რა არის "წყალი" ქართულად?',
        options: [
          { id: 'A', text: 'წყალი' },
          { id: 'B', text: 'ხაჭაპური' },
          { id: 'C', text: 'ღვინო' },
          { id: 'D', text: 'პური' }
        ],
        answer: 'A'
      },
      {
        id: 7,
        stem: 'რა ეწოდება ტრადიციულ ქართულ პურს?',
        options: [
          { id: 'A', text: 'ხაჭაპური' },
          { id: 'B', text: 'შოთი' },
          { id: 'C', text: 'ლავაში' },
          { id: 'D', text: 'პიტა' }
        ],
        answer: 'B'
      },
      {
        id: 8,
        stem: 'როგორ ვთქვათ "მე შენ მიყვარხარ" ქართულად?',
        options: [
          { id: 'A', text: 'მე შენ მიყვარხარ' },
          { id: 'B', text: 'გმარჯობთ' },
          { id: 'C', text: 'ნახვამდის' },
          { id: 'D', text: 'მადლობა' }
        ],
        answer: 'A'
      },
      {
        id: 9,
        stem: 'რა არის "მეგობარი" ქართულად?',
        options: [
          { id: 'A', text: 'მეგობარი' },
          { id: 'B', text: 'ძმა' },
          { id: 'C', text: 'დედა' },
          { id: 'D', text: 'მამა' }
        ],
        answer: 'A'
      },
      {
        id: 10,
        stem: 'რა ნიშნავს "საქართველო"?',
        options: [
          { id: 'A', text: 'თბილისი' },
          { id: 'B', text: 'საქართველო' },
          { id: 'C', text: 'კავკასია' },
          { id: 'D', text: 'რესპუბლიკა' }
        ],
        answer: 'B'
      }
    ]
  },
  {
    id: 'history',
    title: 'საქართველოს ისტორია — მოქალაქეობის ტესტი',
    titleEnglish: 'Georgian History — Citizenship Test',
    description: 'Learn about Georgia\'s rich historical heritage',
    questions: [
      {
        id: 1,
        stem: 'საქართველოს ტერიტორიაზე სად აღმოაჩინეს ჰომო გეორგიკუსი?',
        options: [
          { id: 'A', text: 'შულავერში' },
          { id: 'B', text: 'დმანისში' },
          { id: 'C', text: 'თრიალეთში' },
          { id: 'D', text: 'ბოლნისში' }
        ],
        answer: 'B'
      },
      {
        id: 2,
        stem: 'რამდენი წლისაა დმანისში აღმოჩენილი ნაშთები?', 
        options: [
          { id: 'A', text: '1.200 მილიონი წლის' },
          { id: 'B', text: '1.800 მილიონი წლის' },
          { id: 'C', text: '800 ათასი წლის' },
          { id: 'D', text: '200 ათასი წლის' }
        ],
        answer: 'B'
      },
      {
        id: 3,
        stem: 'რას აღნიშნავს ტერმინი „ნეოლითური რევოლუცია"?',
        options: [
          { id: 'A', text: 'მიწათმოქმედების დაწყებას' },
          { id: 'B', text: 'ფეოდალური ურთიერთობების წარმოშობას' },
          { id: 'C', text: 'ქვის იარაღების დახვეწას' },
          { id: 'D', text: 'ბრინჯაოს დამუშავებას' }
        ],
        answer: 'A'
      },
      {
        id: 4,
        stem: 'რა ეწოდება ადრეულ ბრინჯაოს ხანის კულტურას?',
        options: [
          { id: 'A', text: 'კოლხური' },
          { id: 'B', text: 'თრიალეთის' },
          { id: 'C', text: 'შულავერის' },
          { id: 'D', text: 'მტკვარ-არაქსის' }
        ],
        answer: 'D'
      },
      {
        id: 5,
        stem: 'რომელი ქალაქი იყო ქართლის სამეფოს დედაქალაქი?',
        options: [
          { id: 'A', text: 'უფლისციხე' },
          { id: 'B', text: 'მცხეთა' },
          { id: 'C', text: 'თბილისი' },
          { id: 'D', text: 'დმანისი' }
        ],
        answer: 'B'
      },
      {
        id: 6,
        stem: 'რა წელს გახდა საქართველო ქრისტიანული ქვეყანა?',
        options: [
          { id: 'A', text: '337 წელი' },
          { id: 'B', text: '387 წელი' },
          { id: 'C', text: '451 წელი' },
          { id: 'D', text: '527 წელი' }
        ],
        answer: 'A'
      },
      {
        id: 7,
        stem: 'ვინ იყო საქართველოს პირველი ქალი მმართველი?',
        options: [
          { id: 'A', text: 'თამარ მეფე' },
          { id: 'B', text: 'რუსუდან მეფე' },
          { id: 'C', text: 'ქეთევან მეფე' },
          { id: 'D', text: 'მარიამ მეფე' }
        ],
        answer: 'A'
      },
      {
        id: 8,
        stem: 'რომელი ქალაქი იყო ოქროს ხანის დედაქალაქი?',
        options: [
          { id: 'A', text: 'თბილისი' },
          { id: 'B', text: 'ქუთაისი' },
          { id: 'C', text: 'მცხეთა' },
          { id: 'D', text: 'თელავი' }
        ],
        answer: 'A'
      },
      {
        id: 9,
        stem: 'რა წელს გახდა საქართველო რუსეთის იმპერიის ნაწილი?',
        options: [
          { id: 'A', text: '1801' },
          { id: 'B', text: '1810' },
          { id: 'C', text: '1829' },
          { id: 'D', text: '1830' }
        ],
        answer: 'A'
      },
      {
        id: 10,
        stem: 'რა წელს გამოაცხადა საქართველომ დამოუკიდებლობა საბჭოთა კავშირისგან?',
        options: [
          { id: 'A', text: '1991 წლის 9 აპრილი' },
          { id: 'B', text: '1991 წლის 26 მაისი' },
          { id: 'C', text: '1991 წლის 15 ივნისი' },
          { id: 'D', text: '1991 წლის 4 ივლისი' }
        ],
        answer: 'A'
      }
    ]
  },
  {
    id: 'law',
    title: 'საქართველოს კანონმდებლობა — მოქალაქეობის ტესტი',
    titleEnglish: 'Georgian Law — Citizenship Test',
    description: 'Understand Georgia\'s legal system and constitution',
    questions: [
      {
        id: 1,
        stem: 'რა წელს მიღებულ იქნა საქართველოს მიმდინარე კონსტიტუცია?',
        options: [
          { id: 'A', text: '1991' },
          { id: 'B', text: '1995' },
          { id: 'C', text: '2004' },
          { id: 'D', text: '2010' }
        ],
        answer: 'B'
      },
      {
        id: 2,
        stem: 'რა არის საქართველოში ხმის მიცემის მინიმალური ასაკი?',
        options: [
          { id: 'A', text: '16 წელი' },
          { id: 'B', text: '17 წელი' },
          { id: 'C', text: '18 წელი' },
          { id: 'D', text: '21 წელი' }
        ],
        answer: 'C'
      },
      {
        id: 3,
        stem: 'რამდენი წევრია საქართველოს პარლამენტში?',
        options: [
          { id: 'A', text: '100' },
          { id: 'B', text: '120' },
          { id: 'C', text: '150' },
          { id: 'D', text: '180' }
        ],
        answer: 'C'
      },
      {
        id: 4,
        stem: 'რა არის საქართველოს ოფიციალური ენა?',
        options: [
          { id: 'A', text: 'ქართული' },
          { id: 'B', text: 'რუსული' },
          { id: 'C', text: 'ინგლისური' },
          { id: 'D', text: 'ქართული და რუსული' }
        ],
        answer: 'A'
      },
      {
        id: 5,
        stem: 'რა არის საქართველოში ალკოჰოლის მოხმარების ლეგალური ასაკი?',
        options: [
          { id: 'A', text: '16 წელი' },
          { id: 'B', text: '17 წელი' },
          { id: 'C', text: '18 წელი' },
          { id: 'D', text: '21 წელი' }
        ],
        answer: 'C'
      },
      {
        id: 6,
        stem: 'რა არის საქართველოში მართვის ასაკი?',
        options: [
          { id: 'A', text: '16 წელი' },
          { id: 'B', text: '17 წელი' },
          { id: 'C', text: '18 წელი' },
          { id: 'D', text: '21 წელი' }
        ],
        answer: 'C'
      },
      {
        id: 7,
        stem: 'რა არის საქართველოს ვალუტა?',
        options: [
          { id: 'A', text: 'ქართული ლარი' },
          { id: 'B', text: 'ქართული რუბლი' },
          { id: 'C', text: 'ქართული დოლარი' },
          { id: 'D', text: 'ქართული ევრო' }
        ],
        answer: 'A'
      },
      {
        id: 8,
        stem: 'რა ეწოდება საქართველოს ეროვნულ დროშას?',
        options: [
          { id: 'A', text: 'ხუთჯვრიანი დროშა' },
          { id: 'B', text: 'ვარდის დროშა' },
          { id: 'C', text: 'ლომის დროშა' },
          { id: 'D', text: 'არწივის დროშა' }
        ],
        answer: 'A'
      },
      {
        id: 9,
        stem: 'რა ეწოდება საქართველოს ეროვნულ ჰიმნს?',
        options: [
          { id: 'A', text: 'თავისუფლება' },
          { id: 'B', text: 'დიდება' },
          { id: 'C', text: 'საქართველო' },
          { id: 'D', text: 'მამული' }
        ],
        answer: 'A'
      },
      {
        id: 10,
        stem: 'რომელი ქალაქი არის საქართველოს დედაქალაქი?',
        options: [
          { id: 'A', text: 'თბილისი' },
          { id: 'B', text: 'ბათუმი' },
          { id: 'C', text: 'ქუთაისი' },
          { id: 'D', text: 'რუსთავი' }
        ],
        answer: 'A'
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

export const calculateScore = (answers: string[], questions: Question[]) => {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (answer === questions[index].answer) {
      correct++;
    }
  });
  return correct;
};

export const isPassingScore = (score: number) => {
  return score >= 7; // Need at least 7 out of 10 to pass
};
