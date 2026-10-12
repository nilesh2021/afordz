/**
 * Training hub tracks.
 *
 * Tracks with a `course` object are on-site courses (syllabus on the track page).
 * Paid downloadable packs still live in products.js with category "Training"
 * and a matching learningTrack id.
 */

export const UI_UX_COURSE = {
  isFree: true,
  title: "UI/UX Fundamentals",
  tagline:
    "Free UI UX design course — self-paced lessons on users, structure, and screens you can actually ship.",
  description:
    "Free UI UX design course for beginners. Learn how UI and UX work together, then practise discover, define, ideate, prototype, and test. Includes Figma practice and Jakob Nielsen’s 10 usability heuristics. Read the full course on this page — no checkout, account, or live classroom.",
  keywords: [
    "free UI UX design course",
    "UI UX fundamentals",
    "UI UX course for beginners",
    "learn UI UX online",
    "Figma UI UX course",
    "Jakob Nielsen heuristics",
    "free UI UX course",
  ],
  level: "Beginner",
  duration: "About 8 hours",
  format: "Self-paced reading and exercises",
  language: "English",
  audience:
    "Beginners, developers, and marketers who want a structured UI/UX path without paying for a downloadable pack yet.",
  process: [
    {
      id: "discovery",
      title: "Discover",
      body: "Stakeholder interviews, competitor analysis, and user research (the empathy step).",
    },
    {
      id: "define",
      title: "Define",
      body: "User persona, empathy map, and research docs so the problem is agreed.",
    },
    {
      id: "ideate",
      title: "Ideate",
      body: "Information architecture, flow charts, and the user journey.",
    },
    {
      id: "design",
      title: "Prototype",
      body: "Wireframes or layouts that show how the product will function.",
    },
    {
      id: "testing",
      title: "Test",
      body: "Try the prototype with real people, then change the work from feedback.",
    },
  ],
  principles: {
    title: "Jakob Nielsen’s 10 usability heuristics",
    intro: "Use these in testing, and keep them in mind while you design.",
    items: [
      {
        title: "Visibility of system status",
        body: "Show loading, saved, error, and the next step.",
      },
      {
        title: "Match between system and the real world",
        body: "Use the user’s words and order, not jargon.",
      },
      {
        title: "User control and freedom",
        body: "Undo, back, and cancel. Do not trap people.",
      },
      {
        title: "Consistency and standards",
        body: "Same action, same look, same place.",
      },
      {
        title: "Error prevention",
        body: "Stop mistakes before they happen.",
      },
      {
        title: "Recognition rather than recall",
        body: "Show options. Do not make people remember.",
      },
      {
        title: "Flexibility and efficiency of use",
        body: "Shortcuts for frequent users, a clear path for beginners.",
      },
      {
        title: "Aesthetic and minimalist design",
        body: "Cut anything that does not help the task.",
      },
      {
        title: "Help users recognize, diagnose, and recover from errors",
        body: "Plain language: what went wrong and how to fix it.",
      },
      {
        title: "Help and documentation",
        body: "Searchable, task-focused help when the UI is not enough.",
      },
    ],
  },
  outcomes: [
    "Explain what UX is, why it matters, and how it balances user needs, business goals, and technology.",
    "Walk a piece of work through discover, define, ideate, prototype, and test.",
    "Write a stakeholder interview document and pick a mobile-app topic for later modules.",
    "Run competitor research, build a comparison table, and map the experience of using a competing app.",
    "Plan user research with interviews, field notes, and surveys — then write findings and a key insight.",
    "Build a user persona, empathy map, and customer journey map from your research.",
    "Shape information architecture with card sorting, clear labels, and the right navigation pattern.",
    "Draw a user flow chart and low-fidelity wireframes before visual design.",
    "Map a user journey on your wireframes, check usability, and run early user testing.",
    "Present a connected UX case study for your mobile app, ready for a portfolio.",
    "Apply layout, type, colour, and hierarchy so a screen is readable and scannable.",
    "Review a flow with Jakob Nielsen’s 10 usability heuristics, then refine the case study.",
  ],
  includes: [
    "A full lesson syllabus on this page, from introduction through discovery, structure, case study, UI, Figma, and review.",
    "The process used on this course: discover, define, ideate, prototype, test.",
    "Jakob Nielsen’s 10 usability heuristics as the review checklist.",
    "Exercises you complete in your own notes or Figma file.",
    "No account, payment, or email required to start.",
  ],
  excludes: [
    "Live mentoring, cohorts, or scheduled classes.",
    "A streaming classroom, quizzes, or a completion certificate.",
    "A paid ZIP download. This course is the on-site syllabus, not a shop listing.",
  ],
  faqs: [
    {
      id: "free",
      question: "Is this course really free?",
      answer:
        "Yes. UI/UX Fundamentals is free to read on this page. There is no cart, Razorpay checkout, or licence fee for this course.",
    },
    {
      id: "tools",
      question: "Do I need Figma or other design software?",
      answer:
        "A free Figma account is enough for the later modules. Earlier modules can be done with paper, a whiteboard, or any notes app. You do not need Photoshop, Adobe XD, or a paid plugin pack.",
    },
    {
      id: "certificate",
      question: "Do I get a certificate or live classes?",
      answer:
        "No. This is a self-paced syllabus you work through on your own. There is no live cohort, progress tracker, or certificate.",
    },
    {
      id: "shop-packs",
      question: "How is this different from Training packs in the shop?",
      answer:
        "This page is a free on-site course. Other Training tracks may still be paid digital downloads when those listings go live. This UI/UX course does not use checkout.",
    },
    {
      id: "who",
      question: "Who is this for?",
      answer:
        "People who are new to UI/UX, plus developers and marketers who already ship screens and want a clearer process. You do not need a design degree or a portfolio to start.",
    },
    {
      id: "process",
      question: "What process does this course follow?",
      answer:
        "Discover, define, ideate, prototype, and test. You research first, write a stakeholder brief, sketch structure, prototype the path, then review it — including Jakob Nielsen’s 10 usability heuristics at testing.",
    },
  ],
  modules: [
    {
      id: "ui-ux-work",
      phase: "Start",
      title: "Introduction to UX",
      summary:
        "What UX is, why it matters, the design-thinking process, the deliverables you will build, and how to start with a stakeholder interview.",
      duration: "80 min",
      lessons: [
        {
          slug: "ui-vs-ux",
          title: "What UX is",
          duration: "20 min",
          summary:
            "UX is how someone experiences a product — their needs, values, abilities, and limits. Big products win when that experience works.",
          content: {
            lede: "UX (user experience) is what someone feels while they use a product, system, or service. It covers what they need, what they value, what they can do, and where they get stuck — all while trying to solve a problem.",
            sections: [
              {
                id: "definition",
                heading: "What is user experience?",
                paragraphs: [
                  "The user experience is how a person experiences a product. It includes how easy it is to use and how efficiently they can finish the job they came for.",
                  "UX design is the process of creating evidence-based designs for people. Decisions come from research, data, and testing — not from a personal taste for how a screen should look.",
                ],
              },
              {
                id: "elements",
                heading: "UX sits between three forces",
                paragraphs: [
                  "Good UX balances what people need, what the business needs to achieve, and what the technology can support. If you only design for one of these, the product usually breaks in real use.",
                ],
                bullets: [
                  "User needs — the jobs, pains, and limits of the people who will use it.",
                  "Business goal — how the product makes money or delivers value (sales, ads, bookings, and so on).",
                  "Technology — what the platform and tools can actually ship.",
                ],
              },
              {
                id: "importance",
                heading: "Why UX matters",
                paragraphs: [
                  "Familiar products succeed because the experience works, not only because they look polished. Think of apps you open every day without thinking — that ease is UX.",
                  "Recall a time you struggled with a new product, got stuck while travelling, or felt lost learning a new skill. That friction is what this course trains you to notice and remove.",
                ],
              },
              {
                id: "ui",
                heading: "Where UI fits",
                paragraphs: [
                  "UI is the look and controls: colour, type, buttons, and layout. UX is the path and the feeling while someone uses those controls. You need both. Later modules design the UI after the UX path is clear.",
                ],
              },
            ],
          },
        },
        {
          slug: "design-process",
          title: "The UX design process",
          duration: "20 min",
          summary:
            "Design thinking in five stages: discover, define, ideate, prototype, and test — then the step list for a new mobile app.",
          content: {
            lede: "UX work follows a design-thinking loop. You research first, turn findings into clear documents, sketch structure, build a prototype people can try, then change the work from feedback.",
            heroImage: {
              src: "/training/ux-design-thinking-loop.jpg",
              alt: "Five-stage UX design thinking loop: Discover, Define, Ideate, Prototype, and Test",
              width: 1280,
              height: 720,
              caption: "The five stages loop — after testing, you often return to discover or define.",
            },
            processStrip: [
              { id: "strip-discover", label: "Discover", icon: "search" },
              { id: "strip-define", label: "Define", icon: "document" },
              { id: "strip-ideate", label: "Ideate", icon: "lightbulb" },
              { id: "strip-prototype", label: "Prototype", icon: "phone" },
              { id: "strip-test", label: "Test", icon: "check" },
            ],
            sections: [
              {
                id: "discover",
                icon: "search",
                heading: "1. Discover (empathy)",
                paragraphs: [
                  "Understand business goals and user goals. Stakeholder interviews, competitor analysis, and user research belong here. This stage is also called the empathy step — you learn before you invent.",
                ],
              },
              {
                id: "define",
                icon: "document",
                heading: "2. Define",
                paragraphs: [
                  "Use what you learned in discover to make shared documents: a user persona, an empathy map, and related research summaries so the problem is agreed before you design screens.",
                ],
              },
              {
                id: "ideate",
                icon: "lightbulb",
                heading: "3. Ideate",
                paragraphs: [
                  "Design the structure of the product: information architecture, flow charts, and the user journey. You explore more than one path before locking a layout.",
                ],
              },
              {
                id: "prototype",
                icon: "phone",
                heading: "4. Prototype",
                paragraphs: [
                  "A prototype can be wireframes or higher-fidelity layouts. It shows how the product will function so someone can try the path without a finished app.",
                ],
                image: {
                  src: "/training/ux-mobile-wireframe-prototype.jpg",
                  alt: "Two smartphone wireframes showing low-fidelity and mid-fidelity prototype layouts",
                  width: 960,
                  height: 720,
                  caption: "Start with rough wireframes. Add detail only after the path is clear.",
                },
              },
              {
                id: "test",
                icon: "check",
                heading: "5. Test",
                paragraphs: [
                  "Test the prototype with real people. Change the work from their feedback. You can loop back to an earlier stage — do not skip discover because a screen looked interesting.",
                ],
                image: {
                  src: "/training/ux-user-testing.jpg",
                  alt: "Illustration of a designer observing someone testing a phone prototype and taking feedback notes",
                  width: 960,
                  height: 720,
                  caption: "Watch people try the prototype. Notes from testing beat opinions about how it should look.",
                },
              },
              {
                id: "mobile-steps",
                icon: "list",
                heading: "Steps for a new mobile app",
                paragraphs: [
                  "On a typical mobile-app project, the same process shows up as a practical checklist. Later modules walk each step in more detail.",
                ],
                bullets: [
                  "Competitor research and analysis",
                  "User research",
                  "User persona and empathy mapping",
                  "Information architecture",
                  "User flow and low-fidelity wireframes",
                  "User journey and user testing",
                  "UX case study presentation",
                ],
              },
            ],
          },
        },
        {
          slug: "ux-deliverables",
          title: "UX deliverables and design steps",
          duration: "20 min",
          summary:
            "The documents and sketches that make up a UX portfolio — and how to keep them consistent so the work looks professional.",
          content: {
            lede: "UX deliverables are the pieces you produce while you design. Together they become your case study and portfolio. Start with tools you already know; move polished versions into Figma or similar later.",
            sections: [
              {
                id: "research-docs",
                heading: "Research and definition documents",
                paragraphs: [
                  "These prove you understood the problem before you drew screens.",
                ],
                bullets: [
                  "Stakeholder interview summary — what the business wants and who it is for.",
                  "Experience map — how people experience competitor apps today.",
                  "Competitor research table — who you compared and what you learned.",
                  "User research findings — graphs or notes plus a clear problem statement.",
                  "User persona — a concrete person, not a vague “everyone”.",
                  "Empathy map — what they say, think, do, and feel.",
                  "Customer journey map — touchpoints inside your app.",
                ],
              },
              {
                id: "structure-docs",
                heading: "Structure, flows, and testing",
                paragraphs: [
                  "These show how the product is organised and whether real people can use it.",
                ],
                bullets: [
                  "Information architecture — a navigation diagram.",
                  "User flow — a flow chart of a key task.",
                  "Low-fidelity wireframes — sketches of screens, not final colour.",
                  "User journey sketch — the path across moments.",
                  "User testing report — what people tried and what changed.",
                  "UX case study — the story of the project for your portfolio.",
                ],
              },
              {
                id: "presentation",
                heading: "Keep the portfolio consistent",
                paragraphs: [
                  "Consistency makes the work look professional. Pick one font family and at most two colours for all UX documents in a project. Mixing many fonts and colours makes the same research look unfinished.",
                  "Free fonts from Google Fonts work well for case studies. Common choices include Open Sans, Montserrat, Lato, Verdana, and Arial. You can draft in a notes app or spreadsheet first, then rebuild clean versions in Figma when you present.",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-stakeholder",
          title: "Exercise: pick a topic and interview stakeholders",
          duration: "20 min",
          summary:
            "Choose a mobile-app idea, build domain knowledge, and write a stakeholder interview document you will use for the rest of the course.",
          content: {
            lede: "This lesson is practice. Pick one mobile-app topic, learn the domain, and write a short stakeholder interview document. You will reuse it in later modules.",
            sections: [
              {
                id: "topic",
                heading: "Select your topic",
                paragraphs: [
                  "Choose one product area and stick with it for the course. Examples: handicrafts, security products, plant nursery, watches, clothing, eyewear, toys, sports, healthcare, gift shop, pet care, grocery, furniture, shoes, bags, or home appliances.",
                ],
              },
              {
                id: "domain",
                heading: "Build domain knowledge",
                paragraphs: [
                  "Domain knowledge means understanding the content and current trends in that space. Visit websites in the domain and install a few related mobile apps so you have a starting point.",
                  "Desk research uses information already available online. An expert interview means talking to someone who already knows the domain when you need sharper answers.",
                ],
                bullets: [
                  "List two or three top competitors (for example Flipkart and Amazon for general shopping, or BookMyShow for movie tickets).",
                  "Note whether the idea is B2C (selling to individual consumers) or B2B (selling between businesses).",
                ],
              },
              {
                id: "interview",
                heading: "Stakeholder interview document",
                paragraphs: [
                  "Write answers as if you interviewed the product owner. Use a Google Doc or any notes file. Include every heading below.",
                ],
                bullets: [
                  "Description — what the app is in one clear sentence (for example: an e-commerce app to sell bags online).",
                  "Objective — why it exists (for example: one place to buy household products online).",
                  "Business goal — how it makes money (sales, ads, bookings, in-app purchases).",
                  "Target audience — age, gender, location, income, education, profession, interests.",
                  "User role — what the person does in the app (buyer, listener, booker, and so on).",
                  "Competitors — who you are comparing against.",
                  "Business model — B2B or B2C.",
                ],
              },
              {
                id: "questions",
                heading: "Questions to ask (or answer yourself)",
                paragraphs: [
                  "If you can talk to a real stakeholder, use these. If you are inventing a practice project, answer them honestly as the owner.",
                ],
                bullets: [
                  "What is the objective of this app?",
                  "Who is the target audience?",
                  "What is the business goal?",
                  "How and where will the app be used?",
                  "What is the user role?",
                  "What are the requirements?",
                  "Who are the competitors?",
                  "Is the model B2B or B2C?",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example snapshot",
                paragraphs: [
                  "Here is a short stakeholder interview document for a practice app called Bazaar. Use the same headings in your own file — your answers can be longer.",
                ],
                snapshot: {
                  eyebrow: "Stakeholder interview",
                  title: "Bazaar App",
                  subtitle: "E-commerce app for online shopping of household products.",
                  badge: "B2C",
                  fields: [
                    {
                      label: "Description",
                      value: "E-commerce app for online shopping.",
                    },
                    {
                      label: "Objective",
                      value: "One place to buy household products online.",
                    },
                    {
                      label: "Business goal",
                      value: "Generate revenue by selling products online.",
                    },
                    {
                      label: "User role",
                      value: "Buyer",
                    },
                    {
                      label: "Competitors",
                      value: "Flipkart and Amazon",
                    },
                    {
                      label: "Business model",
                      value: "B2C — business to consumers",
                    },
                  ],
                  audienceLabel: "Target audience",
                  audience: [
                    { label: "Age", value: "25–40 years" },
                    { label: "Gender", value: "Female" },
                    { label: "Location", value: "Metro cities" },
                    { label: "Income", value: "₹3 lakh+ per year" },
                    { label: "Education", value: "Graduates" },
                    { label: "Profession", value: "Housewives and working" },
                  ],
                  note: "Keep one font and at most two colours so this document can sit in a portfolio later.",
                },
              },
            ],
          },
        },
      ],
    },
    {
      id: "users-problems",
      phase: "Discover",
      title: "Discovery: competitor research",
      summary:
        "Learn what already exists: competitor research, analysis parameters, experience maps, and a short report for your app.",
      duration: "80 min",
      lessons: [
        {
          slug: "competitor-research",
          title: "What competitor research is",
          duration: "15 min",
          summary:
            "Compare apps and websites to learn strengths, gaps, and where your product can stand in the market.",
          content: {
            lede: "Competitor research is a method for analysing and comparing data about mobile apps and websites that people already use. It is a core Discover step — you learn the landscape before you invent a new path.",
            sections: [
              {
                id: "what",
                icon: "search",
                heading: "What is competitor research?",
                paragraphs: [
                  "You look at similar products, collect facts, and compare them side by side. The goal is a clear picture of what exists today — features, content, audience, and how usable the apps feel.",
                ],
              },
              {
                id: "why",
                icon: "map",
                heading: "Why do it?",
                paragraphs: [
                  "A competitor look gives you evidence for design choices. It does not replace talking to users — it shows what is already in the market.",
                ],
                bullets: [
                  "Know the strengths and weaknesses of competing apps.",
                  "See where your product or service stands in the market.",
                  "Focus effort on a clear target market.",
                  "Spot usability problems you can avoid or fix better.",
                  "Back product changes with reliable evidence, not only opinion.",
                ],
              },
              {
                id: "parameters",
                icon: "list",
                heading: "What to compare",
                paragraphs: [
                  "Keep the comparison focused. These parameters cover most mobile-app reviews.",
                ],
                bullets: [
                  "Products and services offered",
                  "User demographics — age, location, and related traits",
                  "Product features and how people use them",
                  "Content and language — labels, tone, and clarity",
                ],
              },
            ],
          },
        },
        {
          slug: "competitor-analysis-process",
          title: "How to run a competitor analysis",
          duration: "25 min",
          summary:
            "Keep goals in view, list direct and indirect competitors, then analyse, summarise, and build a comparison table.",
          content: {
            lede: "A useful analysis follows a short process: know your goals, know who you are comparing, collect the same points for each app, then write a summary that can convince a teammate or stakeholder.",
            processStrip: [
              { id: "ca-goals", label: "Goals", icon: "document" },
              { id: "ca-list", label: "Competitors", icon: "people" },
              { id: "ca-points", label: "Compare", icon: "list" },
              { id: "ca-summary", label: "Summarise", icon: "check" },
            ],
            sections: [
              {
                id: "goals",
                icon: "document",
                heading: "Step 1 — Understand your goals",
                paragraphs: [
                  "Keep your product goals in front of you while you analyse. Refer back to them so you do not collect random facts that never affect the design.",
                ],
              },
              {
                id: "competitors",
                icon: "people",
                heading: "Step 2 — Know your competitors",
                paragraphs: [
                  "Direct competitors do what your app does already — same kind of product or service. Example for a Bazaar shopping app: Flipkart.",
                  "Indirect competitors offer something similar, even if it is not their main focus. Example for Bazaar: Myntra.",
                ],
              },
              {
                id: "points",
                icon: "list",
                heading: "Common points to capture",
                paragraphs: [
                  "Use the same checklist for every app so the comparison is fair.",
                ],
                bullets: [
                  "App description",
                  "Ratings on the app store",
                  "Target audience — age, gender, location, income",
                  "Product categories",
                  "Common features",
                  "Unique features",
                  "Look and feel — design and aesthetic",
                  "Usability — easy or difficult to use, and where",
                ],
              },
              {
                id: "summarise",
                icon: "check",
                heading: "Step 4 — Analyse and summarise",
                paragraphs: [
                  "Write a short summary of what you found and what impact it has on your design. Use that summary to argue for a change or for innovation with teammates and stakeholders.",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example: Bazaar competitor report",
                paragraphs: [
                  "Here is a sample comparison table for a practice shopping app. Fill a similar table for your own topic from Module 1.",
                ],
                comparison: {
                  eyebrow: "Competitor research report",
                  title: "Bazaar — competitor snapshot",
                  subtitle: "Same parameters, two direct competitors.",
                  rowHeader: "Parameter",
                  columns: ["Amazon", "Flipkart"],
                  rows: [
                    {
                      label: "Description",
                      values: ["US-based e-commerce app", "India-based e-commerce app"],
                    },
                    {
                      label: "Store rating",
                      values: ["4.3 (example)", "Note the live rating when you research"],
                    },
                    {
                      label: "Target audience",
                      values: ["Broad — about 12 to 60", "Broad household shoppers"],
                    },
                    {
                      label: "Categories",
                      values: ["Household and electronics", "Household and electronics"],
                    },
                    {
                      label: "Common features",
                      values: ["Search, sort, and filter", "Search, sort, and filter"],
                    },
                    {
                      label: "Unique feature",
                      values: ["Search using camera", "Flipkart Plus Zone"],
                    },
                    {
                      label: "Look and feel",
                      values: ["Good", "Average"],
                    },
                    {
                      label: "Usability",
                      values: ["Easy to use", "Easy to use"],
                    },
                  ],
                  note: "Update ratings and notes from the live apps. The table is a template, not a final truth.",
                },
              },
            ],
          },
        },
        {
          slug: "experience-mapping",
          title: "Experience mapping",
          duration: "20 min",
          summary:
            "Record feelings, experiences, and expectations at each stage of using a competitor app.",
          content: {
            lede: "An experience map captures what it feels like to use a competitor app step by step. You record feelings, experiences, and expectations — based on your own use as a user.",
            sections: [
              {
                id: "feelings",
                icon: "people",
                heading: "Categorise your feelings",
                paragraphs: [
                  "At each stage, mark how the app made you feel, then write what happened and what you expected.",
                ],
                bullets: [
                  "Very happy",
                  "Overall satisfied",
                  "Unhappy",
                ],
              },
              {
                id: "stages",
                icon: "map",
                heading: "Common stages to map",
                paragraphs: [
                  "For a shopping app, these stages cover most of the journey. Adjust the list if your topic is different.",
                ],
                bullets: [
                  "App installation",
                  "Sign up",
                  "Shopping",
                  "Payment",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example: Amazon experience map notes",
                paragraphs: [
                  "Use three columns: activities, feelings, and expectations. Write short notes from real use.",
                ],
                snapshot: {
                  eyebrow: "Experience map",
                  title: "Amazon — sample notes",
                  subtitle: "Fill one of these for each competitor you study.",
                  badge: "As a user",
                  fields: [
                    {
                      label: "Install",
                      value: "Feeling: yes / easy. Experience: easy to install.",
                    },
                    {
                      label: "Sign up",
                      value: "Feeling: mixed. Experience: not always easy. Expectation: make it easier.",
                    },
                    {
                      label: "Shopping",
                      value: "Feeling: satisfied. Experience: easy to find items. Needed features are available.",
                    },
                    {
                      label: "Payment",
                      value: "Feeling: yes. Experience: easy to pay. Look and feel could be more pleasing.",
                    },
                    {
                      label: "Expectations overall",
                      value: "Easier flows, stronger aesthetics, and ideas like augmented reality where they help.",
                    },
                  ],
                  note: "Be honest. Unhappy moments are the most useful for your own design.",
                },
              },
              {
                id: "limit",
                icon: "check",
                heading: "What competitor analysis cannot tell you",
                paragraphs: [
                  "A competitive analysis tells you what exists, not why it exists. You might see a long feature list and still not know which features people value most.",
                  "To understand why people behave as they do, you need user research — the next module. Competitor work and user research work together.",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-competitor-report",
          title: "Exercise: competitor report and experience map",
          duration: "20 min",
          summary:
            "Build a competitor research table and an experience map for your app topic from Module 1.",
          content: {
            lede: "This is practice. Use the topic and stakeholder document from Module 1. Produce two deliverables you can keep in a portfolio folder.",
            sections: [
              {
                id: "report",
                icon: "list",
                heading: "1. Competitor research analysis report",
                paragraphs: [
                  "Pick two or three competitors (direct and at least one indirect if you can). Use a spreadsheet or doc with the same parameters for each.",
                ],
                bullets: [
                  "App description and store rating",
                  "Target audience",
                  "Product categories",
                  "Common and unique features",
                  "Look and feel",
                  "Usability notes",
                  "A short summary of impact on your design",
                ],
              },
              {
                id: "emap",
                icon: "map",
                heading: "2. Experience map",
                paragraphs: [
                  "Install or open one competitor app. Walk install → sign up (or login) → main task → payment or checkout if it applies. For each stage, note feeling, experience, and expectation.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "Someone else should be able to read your table and map and say what your product should copy, avoid, or invent — without you explaining in person.",
                ],
                bullets: [
                  "At least two competitors compared on the same parameters.",
                  "One experience map with feelings marked at each stage.",
                  "A three-to-five sentence summary of design impact.",
                  "One font and a tidy layout so both files can sit in a portfolio.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "user-research",
      phase: "Discover",
      title: "Discovery: user research",
      summary:
        "Questionnaires and interviews: pick methods by audience size, ask better questions, and turn answers into findings and a key insight.",
      duration: "80 min",
      lessons: [
        {
          slug: "research-types",
          title: "Types of user research",
          duration: "15 min",
          summary:
            "Interviews for a small audience, field studies for a medium one, surveys for a large one — use more than one method when you can.",
          content: {
            lede: "User research explains why people behave as they do. Competitor analysis showed what exists; research shows what people need, feel, and struggle with.",
            processStrip: [
              { id: "rt-interview", label: "Interview", icon: "people" },
              { id: "rt-field", label: "Field", icon: "map" },
              { id: "rt-survey", label: "Survey", icon: "list" },
            ],
            sections: [
              {
                id: "mix",
                icon: "search",
                heading: "Use more than one method",
                paragraphs: [
                  "Each method fits a different audience size. Mixing them gives you both emotion and numbers.",
                ],
                bullets: [
                  "Interviews — small audience. Talk one-to-one (video call is fine).",
                  "Field studies — medium audience. Watch people where they will use the app.",
                  "Surveys — large audience. Collect quantitative answers at scale.",
                ],
              },
              {
                id: "interview",
                icon: "people",
                heading: "Interviews",
                paragraphs: [
                  "Interviews help you understand emotions you will later use on an empathy map. Observe the person as they talk, and ask follow-up questions when something feels unfinished.",
                  "A video call works when you cannot meet in person. Keep the tone open — you are learning, not selling the app.",
                ],
              },
              {
                id: "field",
                icon: "map",
                heading: "Field studies",
                paragraphs: [
                  "Run field sessions in a place where people would actually use your app — home, commute, shop floor, or office. Context changes what “easy” means.",
                ],
              },
              {
                id: "survey",
                icon: "list",
                heading: "Surveys",
                paragraphs: [
                  "Use a form tool (Google Forms or similar) for quantitative data. Balance open-ended and closed questions. Responses land in a spreadsheet and charts that help you see patterns fast.",
                ],
              },
            ],
          },
        },
        {
          slug: "questionnaire-design",
          title: "Preparing a questionnaire",
          duration: "20 min",
          summary:
            "Cover process, pain points, and wishlist — and rewrite leading or binary questions into clearer ones.",
          content: {
            lede: "A good questionnaire covers how people do the job today, where they get stuck, and what they wish existed. How you ask matters as much as what you ask.",
            sections: [
              {
                id: "themes",
                icon: "document",
                heading: "What the questionnaire should cover",
                paragraphs: [
                  "Build questions around three themes before you worry about fancy wording.",
                ],
                bullets: [
                  "Process — how are people doing this job currently?",
                  "Pain points — what gets in the way?",
                  "Wishlist — what do they want that they do not have yet?",
                ],
              },
              {
                id: "asking",
                icon: "check",
                heading: "Asking better questions",
                paragraphs: [
                  "Avoid leading questions that push someone toward your preferred answer. Avoid binary yes/no when you need the real story — ask which difficulties they face, not only whether they face any.",
                ],
                comparison: {
                  eyebrow: "Question checklist",
                  title: "Don’t vs do",
                  subtitle: "Same topic, clearer wording.",
                  rowHeader: "Problem",
                  columns: ["Weak question", "Better question"],
                  rows: [
                    {
                      label: "Leading",
                      values: [
                        "Do you use a credit card to buy products online?",
                        "Which payment method do you prefer?",
                      ],
                    },
                    {
                      label: "Binary only",
                      values: [
                        "Do you face difficulties while buying products online?",
                        "Which difficulties or limits do you face while buying products online?",
                      ],
                    },
                  ],
                  note: "Closed questions are fine for counts. Follow them with an open prompt when you need detail.",
                },
              },
              {
                id: "bazaar-q",
                icon: "list",
                heading: "Example questions for a shopping app",
                paragraphs: [
                  "For a practice app like Bazaar, split questions into persona details, process, pain, and wishlist.",
                ],
                bullets: [
                  "Persona — name, age group, gender, education, hobbies, brands they use, location, income, how tech-savvy they are, devices, and one line about themselves.",
                  "Process — which app do you use to buy household products? Which payment method do you prefer?",
                  "Pain — which difficulties or limits do you face while buying products online?",
                  "Wishlist — which household products would you like to buy online? Which functions or facilities would you want in this app?",
                ],
              },
            ],
          },
        },
        {
          slug: "research-findings",
          title: "Findings and key insights",
          duration: "20 min",
          summary:
            "Summarise what users said, then name the insight that links their motivation to your business goal.",
          content: {
            lede: "Findings are what you heard and saw. An insight is a discovery about the motivations that drive people toward a business goal — the sharp point you design around.",
            sections: [
              {
                id: "findings",
                icon: "document",
                heading: "Example findings: Bazaar",
                paragraphs: [
                  "After forms and interviews, write a short findings list in plain language. Here is a sample summary for the Bazaar practice app.",
                ],
                snapshot: {
                  eyebrow: "User research findings",
                  title: "Bazaar — summary",
                  subtitle: "Patterns from questionnaires and interviews.",
                  badge: "Discover",
                  fields: [
                    {
                      label: "What people want to buy",
                      value: "Fresh vegetables, fruit, household goods, clothing, and electronics online.",
                    },
                    {
                      label: "Product confidence",
                      value: "Correct product images, full details, and genuine reviews and ratings.",
                    },
                    {
                      label: "Main pain",
                      value: "Sometimes the product shown online and the product delivered are different.",
                    },
                    {
                      label: "Speed and control",
                      value: "Quick delivery, and the ability to set a delivery time for home delivery.",
                    },
                    {
                      label: "Wishlist extras",
                      value: "Product compare, plus a clear return and exchange policy.",
                    },
                  ],
                  note: "Your findings should quote real answers where you can. Patterns beat one-off comments.",
                },
              },
              {
                id: "insight",
                icon: "lightbulb",
                heading: "Key insight",
                paragraphs: [
                  "An insight connects user motivation to the business goal. For Bazaar, a key insight from this research set is: people want to select a delivery time that fits their convenience.",
                  "That insight is sharper than “users want delivery.” It tells you what to design first and how to measure success later.",
                ],
              },
              {
                id: "next",
                icon: "map",
                heading: "What comes next",
                paragraphs: [
                  "Findings and insights feed personas, empathy maps, and journey maps in the next module. Keep the raw notes — you will reuse quotes.",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-user-research",
          title: "Exercise: run light user research",
          duration: "25 min",
          summary:
            "Collect survey answers, run two short interviews, and write a findings summary with one key insight.",
          content: {
            lede: "This is practice for your Module 1 app topic. You do not need a lab — a form, two video calls, and a short doc are enough.",
            sections: [
              {
                id: "collect",
                icon: "list",
                heading: "What to collect",
                paragraphs: [
                  "Aim for a small but real sample. Quality of questions matters more than a huge count.",
                ],
                bullets: [
                  "At least 10 survey responses (Google Forms or any form tool).",
                  "At least 2 user interviews on a video call or in person.",
                  "Notes on emotions and follow-ups you asked during interviews.",
                ],
              },
              {
                id: "report",
                icon: "document",
                heading: "What to write in the summary",
                bullets: [
                  "Who you talked to (count, rough demographics).",
                  "Process — how they do the job today.",
                  "Pain points — ranked if you can.",
                  "Wishlist — features or facilities they asked for.",
                  "One key insight that links motivation to your business goal.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "A teammate should understand the main pain and the key insight without hearing your interview recordings.",
                ],
                bullets: [
                  "Survey and interview counts meet the minimums above.",
                  "Findings are written as patterns, not a dump of every answer.",
                  "One insight sentence you could put on a sticky note.",
                  "Same tidy font as your competitor report so both sit in a portfolio.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "define-maps",
      phase: "Define",
      title: "Define: persona, empathy, journey",
      summary:
        "Turn research into a persona, an empathy map, and a customer journey map so the whole team designs for the same person.",
      duration: "80 min",
      lessons: [
        {
          slug: "user-persona",
          title: "User persona",
          duration: "20 min",
          summary:
            "A fictional character built from research that represents most potential users — so you design in their shoes, not your own.",
          content: {
            lede: "A persona is one or more fictional characters that represent most potential users of an app or website, with conventional user demands. You build them from quantitative and qualitative research — not from guesswork.",
            sections: [
              {
                id: "why",
                icon: "people",
                heading: "Why personas help",
                paragraphs: [
                  "Personas make the design task less complex. They guide the process and help you aim for a good experience for the target user instead of designing for “everyone.”",
                ],
                bullets: [
                  "You stop designing only from your own habits and step into the persona’s shoes.",
                  "You recognise that different people have different needs and expectations.",
                  "You get clearer on needs, experiences, behaviours, and goals.",
                ],
              },
              {
                id: "impact",
                icon: "map",
                heading: "Impact across the team",
                paragraphs: [
                  "A shared persona helps more than the UX designer alone.",
                ],
                bullets: [
                  "Stakeholders evaluate feature ideas against a real target user.",
                  "Information architects build better wireframes, labels, and behaviours.",
                  "Visual designers set look and feel for the right audience.",
                  "Engineers choose flows and approaches based on user behaviour.",
                  "Writers match content tone to the appropriate audience.",
                ],
              },
              {
                id: "elements",
                icon: "list",
                heading: "Elements of a user persona",
                paragraphs: [
                  "Include enough detail that the character feels real, without inventing a novel.",
                ],
                bullets: [
                  "Demographics",
                  "User scenario — when and why they use the product",
                  "User needs",
                  "Pain points",
                  "Technology — devices and comfort level",
                  "Personality",
                  "Brands they like",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example persona: Bazaar",
                paragraphs: [
                  "Use your Module 3 research to fill a card like this for your own app.",
                ],
                snapshot: {
                  eyebrow: "User persona",
                  title: "Priya — household shopper",
                  subtitle: "Primary persona for the Bazaar practice app.",
                  badge: "Define",
                  fields: [
                    {
                      label: "Demographics",
                      value: "Woman, 28–35, metro city, graduate, household budget of about ₹3 lakh+ per year.",
                    },
                    {
                      label: "Scenario",
                      value: "Orders household goods on her phone after work when she cannot visit a store.",
                    },
                    {
                      label: "Needs",
                      value: "Correct product images and details, genuine reviews, quick delivery, and a clear return policy.",
                    },
                    {
                      label: "Pain points",
                      value: "Products that look different from the listing; rigid delivery windows; hard-to-compare options.",
                    },
                    {
                      label: "Technology",
                      value: "Comfortable on Android or iPhone; uses UPI and cards; moderately tech-savvy.",
                    },
                    {
                      label: "Brands & personality",
                      value: "Shops on Flipkart or Amazon today; practical, time-pressed, trusts ratings more than ads.",
                    },
                  ],
                  note: "Base every line on research notes. If you cannot point to evidence, cut or rewrite the line.",
                },
              },
            ],
          },
        },
        {
          slug: "empathy-map",
          title: "Empathy map",
          duration: "20 min",
          summary:
            "Four quadrants — said, did, thought, and felt — to organise what you learned about the person.",
          content: {
            lede: "An empathy map has four quadrants: what the user said, did, thought, and felt. It turns interview and observation notes into a shared picture of the person.",
            sections: [
              {
                id: "quadrants",
                icon: "people",
                heading: "The four quadrants",
                paragraphs: [
                  "Fill each quadrant with short notes from research. Quotes go in Said. Observable actions go in Did. Inferences about inner voice go in Thought and Felt — mark them as inferences when you are unsure.",
                ],
                bullets: [
                  "Said — words from interviews or surveys",
                  "Did — actions you watched or they described",
                  "Thought — what seems to be on their mind",
                  "Felt — emotions across the experience",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example: Bazaar empathy map",
                paragraphs: [
                  "A sample map for the shopping persona. Replace these lines with notes from your own interviews.",
                ],
                empathy: {
                  eyebrow: "Empathy map",
                  title: "Priya — Bazaar",
                  subtitle: "Said · Did · Thought · Felt",
                  quadrants: [
                    {
                      label: "Said",
                      items: [
                        "I want to see real product photos.",
                        "Delivery should fit my schedule.",
                        "Returns need to be simple.",
                      ],
                    },
                    {
                      label: "Did",
                      items: [
                        "Compared two listing pages before buying.",
                        "Checked ratings before adding to cart.",
                        "Abandoned checkout when delivery time was unclear.",
                      ],
                    },
                    {
                      label: "Thought",
                      items: [
                        "Will this look like the picture?",
                        "Can I be home when it arrives?",
                        "Is this seller trustworthy?",
                      ],
                    },
                    {
                      label: "Felt",
                      items: [
                        "Frustrated when the item differed from the listing.",
                        "Relieved by clear tracking status.",
                        "Confident when reviews felt genuine.",
                      ],
                    },
                  ],
                  note: "Keep sticky-note length. Long essays belong in the research summary, not on the map.",
                },
              },
            ],
          },
        },
        {
          slug: "customer-journey-map",
          title: "Customer journey map",
          duration: "20 min",
          summary:
            "Map the path to a goal stage by stage — delights to keep, opportunities to improve.",
          content: {
            lede: "A customer journey map is a visual of the process a customer goes through to achieve a goal with your product. It helps you choose features that delight people and keeps the team customer-focused.",
            sections: [
              {
                id: "why",
                icon: "map",
                heading: "Why journey maps help",
                paragraphs: [
                  "You see the full path — not only the happy homepage. Delights show what to protect. Opportunities show where to invent.",
                ],
              },
              {
                id: "example",
                icon: "list",
                heading: "Example: Bazaar journey",
                paragraphs: [
                  "Five stages for a shopping app. Add or remove stages to match your topic.",
                ],
                journey: {
                  eyebrow: "Customer journey",
                  title: "Bazaar — end to end",
                  subtitle: "Sign up → shopping → payment → tracking → return / exchange",
                  stages: [
                    {
                      title: "Sign up",
                      delights: ["Quick sign-up process"],
                      opportunities: ["Biometric sign-up"],
                    },
                    {
                      title: "Shopping",
                      delights: [
                        "Products organised by category",
                        "Multiple images per product",
                        "Reviews and ratings",
                      ],
                      opportunities: [
                        "Promote new arrivals",
                        "Suggest other brands and products",
                      ],
                    },
                    {
                      title: "Payment",
                      delights: ["Easy and secure payment options", "Variety of payment methods"],
                      opportunities: ["Bank collaboration for EMI"],
                    },
                    {
                      title: "Tracking",
                      delights: ["Clear delivery status"],
                      opportunities: ["Change delivery date and location"],
                    },
                    {
                      title: "Return / exchange",
                      delights: ["Easy return options", "Easy exchange options"],
                      opportunities: ["Clearer policy language at the moment of doubt"],
                    },
                  ],
                  note: "Tie each opportunity back to a research finding or insight so it is not a random feature wishlist.",
                },
              },
            ],
          },
        },
        {
          slug: "exercise-define-maps",
          title: "Exercise: persona, empathy, journey",
          duration: "20 min",
          summary:
            "Make a persona, empathy map, and customer journey map for your app using Module 3 research.",
          content: {
            lede: "This is practice. Use your research summary and key insight. Three tidy documents beat one long essay.",
            sections: [
              {
                id: "make",
                icon: "document",
                heading: "What to make",
                bullets: [
                  "One primary user persona with the elements from this module.",
                  "One empathy map with Said, Did, Thought, and Felt.",
                  "One customer journey map with stages, delights, and opportunities.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "A teammate should recognise the same person across all three files and see which journey stages matter most.",
                ],
                bullets: [
                  "Persona lines point back to research, not invention.",
                  "Empathy quadrants use short notes and at least one real quote.",
                  "Journey stages include both delights and opportunities.",
                  "Same font family as your earlier Discover documents.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "structure",
      phase: "Ideate",
      title: "Ideate: information architecture",
      summary:
        "Organise content from user needs, sort cards into navigation, label clearly, and pick the right navigation system.",
      duration: "80 min",
      lessons: [
        {
          slug: "information-architecture",
          title: "Why information architecture matters",
          duration: "20 min",
          summary:
            "Good IA makes products and services easy to find. Easy to find makes the app usable — and usability drives UX.",
          content: {
            lede: "Information architecture (IA) is how you organise, classify, and label content so people can find what they need without much effort. If they cannot find it, the rest of the experience fails.",
            sections: [
              {
                id: "why",
                icon: "search",
                heading: "Usability starts with findability",
                paragraphs: [
                  "Good IA makes it easy to find a product or service. When finding is easy, the app feels usable. Usability is a vital part of a good user experience.",
                ],
              },
              {
                id: "from-needs",
                icon: "people",
                heading: "IA from user needs",
                paragraphs: [
                  "Start from what people need, then shape content and classification. Separate conventions (what users already expect) from non-conventions (ideas unique to your product).",
                ],
                bullets: [
                  "User needs — jobs and expectations from research",
                  "Content — what the app must contain",
                  "Convention — patterns people already know",
                  "Non-convention — new ideas that still need clear placement",
                  "Classification — how items are grouped and named",
                ],
              },
              {
                id: "bazaar-content",
                icon: "list",
                heading: "Example: Bazaar content map",
                paragraphs: [
                  "For a shopping app, conventions cover the familiar shopping path. Non-conventions are the extras your research justified.",
                ],
                comparison: {
                  eyebrow: "IA from user needs",
                  title: "Bazaar — conventions vs extras",
                  subtitle: "Put familiar patterns where people expect them.",
                  rowHeader: "Type",
                  columns: ["Examples"],
                  rows: [
                    {
                      label: "Conventions",
                      values: [
                        "Search, sort, filter, wishlist, add to cart, account, order, payment, tracking, products, images, reviews, ratings",
                      ],
                    },
                    {
                      label: "Non-conventions",
                      values: ["Setting a product delivery time (from the Bazaar key insight)"],
                    },
                  ],
                  note: "Non-conventional features still need a clear home in the IA — do not hide them in a random menu.",
                },
              },
            ],
          },
        },
        {
          slug: "card-sorting-ia",
          title: "Guidelines and card sorting",
          duration: "20 min",
          summary:
            "Build bottom-up, keep choices mindless, then sort and label cards into a navigation diagram.",
          content: {
            lede: "Strong IA follows a few guidelines, then uses card sorting so groups and labels come from how people think — not only from the team’s org chart.",
            sections: [
              {
                id: "guidelines",
                icon: "check",
                heading: "Guidelines for IA",
                paragraphs: [
                  "Work from the lowest level of content up to top-level sections. Do not mind if people click a few times — mindless choices beat a crowded first screen.",
                ],
                bullets: [
                  "Bottom to top — start with detailed content, then roll up into sections.",
                  "I don’t mind if you make me click — depth is fine when each step is obvious.",
                  "Making choices mindless — clear labels and groups so people do not have to think hard.",
                ],
              },
              {
                id: "sorting",
                icon: "document",
                heading: "Card sorting",
                paragraphs: [
                  "Write one content item or feature per card. Ask people (or sort yourself using research) to group cards and name the groups. Photograph or export: cards before sorting, cards after sorting, and labeled groups.",
                  "Online card-sorting tools work when you cannot sit in a room with sticky notes. Keep the same three artefacts either way.",
                ],
              },
              {
                id: "diagram",
                icon: "map",
                heading: "From sorted cards to an IA diagram",
                paragraphs: [
                  "Turn labeled groups into a navigation diagram: home, main sections, and key utilities. That diagram is the deliverable stakeholders review before wireframes.",
                ],
                snapshot: {
                  eyebrow: "IA diagram sketch",
                  title: "Bazaar — navigation outline",
                  subtitle: "Example structure after sorting and labeling.",
                  badge: "Ideate",
                  fields: [
                    {
                      label: "Home",
                      value: "Featured products, search entry, promotions.",
                    },
                    {
                      label: "Browse",
                      value: "Categories → product list → product detail (images, reviews, ratings).",
                    },
                    {
                      label: "Utilities",
                      value: "Cart, wishlist / favorites, account, orders, payment, tracking.",
                    },
                    {
                      label: "Insight feature",
                      value: "Delivery time selection placed where checkout and tracking meet the need.",
                    },
                  ],
                  note: "Your labels must match the words from card sorting and research — not internal database names.",
                },
              },
            ],
          },
        },
        {
          slug: "navigation-systems",
          title: "Navigation systems and gestures",
          duration: "20 min",
          summary:
            "Persistent chrome, hierarchical menus, adaptive suggestions, search/sort/filter — plus common touch gestures.",
          content: {
            lede: "Navigation is how people move through your IA. Mobile apps usually combine a persistent shell with one or more navigation patterns for content.",
            sections: [
              {
                id: "persistent",
                icon: "phone",
                heading: "Persistent navigation",
                paragraphs: [
                  "Persistent navigation stays available as people move around the app.",
                ],
                bullets: [
                  "App identity and a clear home link",
                  "Primary sections",
                  "Utilities such as shopping cart, favorites, and account",
                ],
              },
              {
                id: "types",
                icon: "map",
                heading: "Types of navigation system",
                paragraphs: [
                  "Pick the pattern that matches the job. Large catalogues need search tools; recommendation-heavy apps lean on adaptive suggestions.",
                ],
                bullets: [
                  "Hierarchical — the main navigation tree from section to detail.",
                  "Adaptive — suggestions based on earlier behaviour (often AI-assisted).",
                  "Search, sort, and filter — essential when the number of products or services is huge.",
                ],
              },
              {
                id: "gestures",
                icon: "check",
                heading: "Gestures for interaction",
                paragraphs: [
                  "Touch gestures are part of how people navigate and act. Keep them familiar and consistent with platform norms.",
                ],
                bullets: [
                  "Tap — primary select and open",
                  "Swipe — move between related views or dismiss",
                  "Scroll — browse long lists and pages",
                  "Pinch — zoom when images or maps need it",
                  "Long-press — secondary actions when the platform expects it",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-ia-diagram",
          title: "Exercise: card sort and IA diagram",
          duration: "20 min",
          summary:
            "Sort cards for your app, label the groups, and draw an IA / navigation diagram.",
          content: {
            lede: "This is practice. Use your persona and journey stages so the structure matches a real person, not a random feature dump.",
            sections: [
              {
                id: "make",
                icon: "list",
                heading: "What to produce",
                bullets: [
                  "Cards before sorting — one feature or content item per card.",
                  "Cards after sorting — clear groups.",
                  "Labeled groups — names in the user’s words.",
                  "IA / navigation diagram — home, sections, utilities, and any non-conventional feature from your insight.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "Someone else should find the main shopping (or core) job without asking where you hid it.",
                ],
                bullets: [
                  "Conventions sit where people expect them.",
                  "Non-conventional features have an intentional place.",
                  "Labels match research language.",
                  "Diagram is tidy enough for a portfolio PDF or slide.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "flows-wireframes",
      phase: "Ideate",
      title: "Ideate: flows and wireframes",
      summary:
        "Chart the path through onboarding, information architecture, and payment — then sketch low-fidelity screens.",
      duration: "80 min",
      lessons: [
        {
          slug: "user-flows",
          title: "User flow charts",
          duration: "20 min",
          summary:
            "Map how someone moves through the app — usually onboarding or login, browsing via your IA, and payment.",
          content: {
            lede: "A user flow chart shows the path from entry to a goal. It sits on top of your IA: navigation says what exists; the flow says in what order people move.",
            processStrip: [
              { id: "uf-onboard", label: "Onboard", icon: "people" },
              { id: "uf-ia", label: "Browse", icon: "map" },
              { id: "uf-pay", label: "Pay", icon: "check" },
            ],
            sections: [
              {
                id: "parts",
                icon: "list",
                heading: "Divide the flow into parts",
                paragraphs: [
                  "For a shopping app like Bazaar, split the chart into three parts so it stays readable. Other app types use the same idea with different middle and end goals.",
                ],
                bullets: [
                  "Onboarding / way to dashboard / login",
                  "Information architecture — browse, search, product detail",
                  "Payment process — cart, checkout, confirmation",
                ],
              },
              {
                id: "guidelines",
                icon: "check",
                heading: "Flow chart guidelines",
                paragraphs: [
                  "Keep each step one clear action. Show decisions as branches. Include the unhappy paths you already know from research — empty cart, failed payment, blocked login.",
                ],
                bullets: [
                  "Start with entry (splash, sign up, or login).",
                  "Name screens and decisions in the user’s words.",
                  "Mark success and failure exits.",
                  "Reuse your IA labels so the flow and navigation match.",
                ],
              },
              {
                id: "example",
                icon: "document",
                heading: "Example: Bazaar user flow",
                paragraphs: [
                  "A compressed outline of the three parts. Your chart can show more decision diamonds.",
                ],
                snapshot: {
                  eyebrow: "User flow chart",
                  title: "Bazaar — three parts",
                  subtitle: "Onboarding → browse (IA) → payment",
                  badge: "Ideate",
                  fields: [
                    {
                      label: "Onboarding",
                      value: "Open app → sign up or login → land on home / dashboard.",
                    },
                    {
                      label: "Browse (IA)",
                      value: "Home → search or category → product list → product detail → wishlist or add to cart.",
                    },
                    {
                      label: "Payment",
                      value: "Cart → checkout → choose payment → set delivery time → order confirmed → tracking.",
                    },
                    {
                      label: "Branches to plan",
                      value: "Wrong password, empty cart, payment failed, change delivery address.",
                    },
                  ],
                  note: "Delivery time appears because it was a key insight — put insight-backed steps in the flow, not only in a feature list.",
                },
              },
            ],
          },
        },
        {
          slug: "wireframe-fidelity",
          title: "Wireframe fidelity levels",
          duration: "20 min",
          summary:
            "Low, medium, and high fidelity — what detail belongs at each stage, and why you start rough.",
          content: {
            lede: "A wireframe is a layout of screens before final visual design. Fidelity means how much detail you add. Start low so you can change structure cheaply.",
            sections: [
              {
                id: "low",
                icon: "phone",
                heading: "Low-fidelity wireframes",
                paragraphs: [
                  "Very rough layouts. Little detail about specific content. You may divide the screen into zones or blocks. There is no strong sense of scale, grid, or pixel accuracy.",
                ],
              },
              {
                id: "medium",
                icon: "document",
                heading: "Medium-fidelity wireframes",
                paragraphs: [
                  "A more accurate layout. Specific components get size. Buttons look different from text links. Text weight can separate headings from body copy. Still black and white, or shades of grey to show prominence — avoid final images, colours, and font styles.",
                ],
              },
              {
                id: "high",
                icon: "check",
                heading: "High-fidelity wireframes",
                paragraphs: [
                  "Pixel-specific layouts, often on a grid. Real images, typography styles, and colour when appropriate. Little or no placeholder text. Responsive behaviour and fluid widths if you are prototyping.",
                ],
                comparison: {
                  eyebrow: "Fidelity checklist",
                  title: "What to include",
                  subtitle: "Raise detail only after structure is agreed.",
                  rowHeader: "Level",
                  columns: ["Focus", "Avoid for now"],
                  rows: [
                    {
                      label: "Low",
                      values: ["Zones, labels, flow order", "Colour, photos, final type"],
                    },
                    {
                      label: "Medium",
                      values: ["Component size, hierarchy in grey", "Brand colour systems"],
                    },
                    {
                      label: "High",
                      values: ["Real content, grid, colour if needed", "Skipping low-fi entirely"],
                    },
                  ],
                  note: "This session’s homework is low fidelity. Higher fidelity comes after the path is clear.",
                },
              },
            ],
          },
        },
        {
          slug: "low-fi-wireframes",
          title: "Mobile low-fidelity wireframes",
          duration: "20 min",
          summary:
            "Sketch phone screens as blocks for the main flow — home, list, detail, cart, and checkout.",
          content: {
            lede: "Mobile LF wireframes turn your flow chart into screen-shaped sketches. Keep them rough. You are testing structure and words, not decoration.",
            heroImage: {
              src: "/training/ux-mobile-wireframe-prototype.jpg",
              alt: "Two smartphone wireframe sketches showing low and mid fidelity layouts",
              width: 960,
              height: 720,
              caption: "Start with blocks and labels. Add grey hierarchy only when the path is stable.",
            },
            sections: [
              {
                id: "screens",
                icon: "phone",
                heading: "Screens to sketch for Bazaar",
                paragraphs: [
                  "Match screens to the flow parts. Paper frames or simple Figma rectangles are enough.",
                ],
                bullets: [
                  "Login or sign up",
                  "Home / dashboard",
                  "Category or search results",
                  "Product detail",
                  "Cart",
                  "Checkout with delivery time",
                  "Order confirmation or tracking",
                ],
              },
              {
                id: "tips",
                icon: "list",
                heading: "Keep them low fidelity",
                paragraphs: [
                  "Boxes for images. Lines for text. Labels on buttons. Notes for behaviour (“tap opens filters”). Skip brand colour and stock photos.",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-flow-wireframes",
          title: "Exercise: flow chart and LF wireframes",
          duration: "20 min",
          summary:
            "Draw a user flow chart for your app, then low-fidelity wireframes for the main path.",
          content: {
            lede: "This is practice. Use your IA diagram and persona. Two deliverables: one flow chart, one set of LF screens.",
            sections: [
              {
                id: "make",
                icon: "document",
                heading: "What to make",
                bullets: [
                  "User flow chart — onboarding, main IA path, and the goal process (payment or equivalent).",
                  "Low-fidelity wireframes — one sketch per key screen on the happy path.",
                  "At least one alternate path (error, empty, or failed payment).",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "Someone else should walk the flow and match each step to a wireframe without you narrating.",
                ],
                bullets: [
                  "Flow labels match IA labels.",
                  "Wireframes stay grey and blocky — no final UI polish.",
                  "Insight-backed features appear in both the flow and a screen.",
                  "Files are tidy enough to sit next to your IA diagram in a portfolio.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "journey-testing",
      phase: "Test",
      title: "Test: journey, usability, testing",
      summary:
        "Connect wireframes into a user journey, learn what usability means, and test low-fidelity prototypes with real people.",
      duration: "80 min",
      lessons: [
        {
          slug: "user-journey-wireframes",
          title: "User journey with wireframes",
          duration: "20 min",
          summary:
            "Walk your low-fidelity screens as a journey — what the person does, feels, and needs at each step.",
          content: {
            lede: "A user journey ties your LF wireframes into a story: the person moves from screen to screen toward a goal. It is wider than a single flow chart — you note moments, feelings, and friction along the path.",
            sections: [
              {
                id: "connect",
                icon: "map",
                heading: "Connect screens into a journey",
                paragraphs: [
                  "Lay your LF wireframes in order. For each step, note the action, what success looks like, and where someone might hesitate. Use your persona so the journey is about them, not about you clicking through.",
                ],
              },
              {
                id: "example",
                icon: "phone",
                heading: "Example: Bazaar journey on LF screens",
                paragraphs: [
                  "Match journey stages to the wireframes you already sketched.",
                ],
                journey: {
                  eyebrow: "User journey + LF screens",
                  title: "Bazaar — wireframe walkthrough",
                  subtitle: "Same stages as define, now tied to low-fidelity screens.",
                  stages: [
                    {
                      title: "Sign up / login",
                      delights: ["Short form, clear next step"],
                      opportunities: ["Biometric option later; test for confusion on first launch"],
                    },
                    {
                      title: "Browse and choose",
                      delights: ["Categories and search find products fast"],
                      opportunities: ["Watch whether people miss filters or reviews"],
                    },
                    {
                      title: "Cart and pay",
                      delights: ["Clear totals and payment choices"],
                      opportunities: ["Delivery time control — validate the key insight here"],
                    },
                    {
                      title: "Track and return",
                      delights: ["Status is visible without support chat"],
                      opportunities: ["Test if return entry points are findable"],
                    },
                  ],
                  note: "Photograph or export the wireframe sequence next to these notes for your portfolio.",
                },
              },
            ],
          },
        },
        {
          slug: "usability-basics",
          title: "What usability means",
          duration: "15 min",
          summary:
            "Usability is how people understand and use things — effectiveness, efficiency, engagement, error tolerance, and ease of learning.",
          content: {
            lede: "Usability is about the user and how they understand and use things. Human-centred design lowers complexity so the tool fits the task and feels understandable.",
            sections: [
              {
                id: "quotes",
                icon: "document",
                heading: "Two useful reminders",
                paragraphs: [
                  "Steve Krug (Don’t Make Me Think): usability is about the user and how they understand and use things.",
                  "Don Norman (The Design of Everyday Things): the point of human-centred design is to lower complexity — turn a complicated tool into one that fits the task and is usable.",
                ],
              },
              {
                id: "elements",
                icon: "check",
                heading: "Usability elements",
                paragraphs: [
                  "Use these five checks when you review a flow or a wireframe set.",
                ],
                bullets: [
                  "Effectiveness — people complete actions accurately.",
                  "Efficiency — they finish through the easiest process, quickly.",
                  "Engagement — it feels pleasant and worth using again.",
                  "Error tolerance — many actions are supported; errors show only when they are real.",
                  "Ease of learning — new users reach goals, and return visits get easier.",
                ],
              },
            ],
          },
        },
        {
          slug: "user-testing",
          title: "User research vs user testing",
          duration: "25 min",
          summary:
            "Research finds the problem; testing finds where people get stuck on your prototype — when, how, and what to ask.",
          content: {
            lede: "User research and user testing are related but not the same. Research discovers whether a problem is real. Testing watches people try your solution and shows where they jam.",
            heroImage: {
              src: "/training/ux-user-testing.jpg",
              alt: "Illustration of observing someone testing a phone prototype",
              width: 960,
              height: 720,
              caption: "Test as soon as you have low-fidelity screens — then test again after each improvement.",
            },
            sections: [
              {
                id: "story",
                icon: "people",
                heading: "A short story",
                paragraphs: [
                  "Research: on a rainy day someone cannot go out to buy household goods. They ask friends and others whether an app that delivers on a click would help — enough people say yes.",
                  "Testing: they build an early pilot prototype, ask those people to book an order, watch where they get stuck, fix it, and show it again.",
                ],
                comparison: {
                  eyebrow: "Research vs testing",
                  title: "Different questions",
                  subtitle: "Both matter. Do not skip either.",
                  rowHeader: "Mode",
                  columns: ["Main question", "Typical output"],
                  rows: [
                    {
                      label: "User research",
                      values: [
                        "Is this a real problem, and for whom?",
                        "Findings, insights, persona inputs",
                      ],
                    },
                    {
                      label: "User testing",
                      values: [
                        "Where do people get jammed using this design?",
                        "Task results, stuck points, fixes",
                      ],
                    },
                  ],
                  note: "Ideally test with people from the same group you researched.",
                },
              },
              {
                id: "when",
                icon: "map",
                heading: "When to test",
                paragraphs: [
                  "As soon as you have low-fidelity wireframes or a simple prototype. Repeat after each major step forward — do not wait for polished UI.",
                ],
              },
              {
                id: "how",
                icon: "list",
                heading: "How to test",
                bullets: [
                  "Prefer the same user group you researched with.",
                  "Minimum about 5–7 people; more is better when you can.",
                  "Give a small, important task.",
                  "Ask them to perform it on the LF prototype.",
                  "Record or observe quietly — note where they pause or fail.",
                  "Improve those spots, then test again.",
                ],
              },
              {
                id: "ask",
                icon: "document",
                heading: "What to ask",
                paragraphs: [
                  "Scale the task to what you need to learn.",
                ],
                bullets: [
                  "Small — “Can you get this done immediately?”",
                  "Medium — “Can you try doing this: [name the task]?”",
                  "Large — “How would you like to [achieve this goal]?”",
                ],
              },
              {
                id: "template",
                icon: "check",
                heading: "Summary table template",
                paragraphs: [
                  "Log each task with size and outcome. Example rows for a shopping app:",
                ],
                comparison: {
                  eyebrow: "User testing summary",
                  title: "Task results",
                  subtitle: "Mark easy / able / difficult / not able for each person or as a group note.",
                  rowHeader: "Task",
                  columns: ["Size", "Result notes"],
                  rows: [
                    {
                      label: "Select a product and pay with a card",
                      values: ["Large", "Watch payment and delivery-time steps"],
                    },
                    {
                      label: "Complete onboarding to the dashboard",
                      values: ["Medium", "Note drop-offs on sign up"],
                    },
                    {
                      label: "Add a product to cart from favorites",
                      values: ["Small", "Check if favorites are findable"],
                    },
                  ],
                  note: "Add columns for each participant if you want richer evidence.",
                },
              },
            ],
          },
        },
        {
          slug: "exercise-user-testing",
          title: "Exercise: journey and testing summary",
          duration: "20 min",
          summary:
            "Make a user journey on your LF wireframes, run a short test, and fill a summary table.",
          content: {
            lede: "This is practice. You need your LF screens from the previous module and a few people willing to try a task.",
            sections: [
              {
                id: "make",
                icon: "document",
                heading: "What to produce",
                bullets: [
                  "User journey notes mapped to your LF wireframe sequence.",
                  "At least one small, one medium, and one large test task.",
                  "A testing summary table (task, size, easy / able / difficult / not able).",
                  "A short list of fixes you will make next.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "You can point to at least one stuck moment you would not have noticed by clicking the screens yourself.",
                ],
                bullets: [
                  "Tested with ideally 5+ people from your research audience when possible.",
                  "Results written in the table, not only remembered.",
                  "Fixes ranked — change the worst jam first.",
                  "Journey and table sit cleanly in your portfolio folder.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "ux-case-study",
      phase: "Case study",
      title: "UX case study presentation",
      summary:
        "Turn your Discover → Test work into one story for a portfolio — sequence, simplicity, and presentation tips.",
      duration: "70 min",
      lessons: [
        {
          slug: "what-is-ux-case-study",
          title: "What a UX case study is",
          duration: "15 min",
          summary:
            "A case study is a story of your design work — text and images that show skill and thinking to recruiters.",
          content: {
            lede: "UX case studies are examples of design work for a portfolio. Designers tell a clear story in text and images so recruiters see skills, process, and judgment — not only pretty screens.",
            sections: [
              {
                id: "why",
                icon: "document",
                heading: "Why it matters",
                paragraphs: [
                  "A strong narrative shows how you think. That maximizes appeal as a potential hire more than a pile of disconnected screenshots.",
                ],
                bullets: [
                  "Show the problem and who it was for.",
                  "Show the process you used, in order.",
                  "Show what changed after research or testing.",
                ],
              },
            ],
          },
        },
        {
          slug: "case-study-structure",
          title: "Case study structure",
          duration: "20 min",
          summary:
            "Follow the UX process sequence — from app intro through testing — so every artefact connects.",
          content: {
            lede: "Show projects in the sequence of the UX process. Every piece should connect to the next. UX case studies are not visual design decks — do not decorate them into moodboards.",
            processStrip: [
              { id: "cs-intro", label: "Intro", icon: "document" },
              { id: "cs-research", label: "Research", icon: "search" },
              { id: "cs-structure", label: "Structure", icon: "map" },
              { id: "cs-test", label: "Test", icon: "check" },
            ],
            sections: [
              {
                id: "sections",
                icon: "list",
                heading: "What to include for a mobile app",
                paragraphs: [
                  "Use this outline for your Bazaar practice app or your own topic.",
                ],
                bullets: [
                  "Introduction — app description and objective",
                  "UX process diagram — Discover → Define → Ideate → Prototype → Test",
                  "Competitor research and analysis — including experience map",
                  "User research — key findings, insight / problem statement, persona, empathy map",
                  "Information architecture — card sorting and navigation",
                  "User flow chart",
                  "User journey with low-fidelity wireframes",
                  "Usability test report and actions you took",
                ],
              },
              {
                id: "rules",
                icon: "check",
                heading: "Presentation rules",
                bullets: [
                  "Keep the sequence of the UX process.",
                  "Connect every document to the same product story.",
                  "Do not treat UX pages like final UI mockups.",
                  "Avoid heavy colour — one accent is enough.",
                  "Make text easy to read.",
                  "Keep it simple to understand.",
                  "Look at Behance UX case studies for layout inspiration; bookmark strong references.",
                ],
              },
            ],
          },
        },
        {
          slug: "case-study-layout",
          title: "Layout tips for the deck",
          duration: "15 min",
          summary:
            "Wide canvas, calm margins, one sans-serif family, one colour — then publish somewhere public if you want.",
          content: {
            lede: "A readable case study beats a flashy one. Use a consistent template so the work looks intentional.",
            sections: [
              {
                id: "specs",
                icon: "document",
                heading: "Suggested layout (example)",
                paragraphs: [
                  "These specs match a common Behance-style board. Adjust if your tool uses a different default size.",
                ],
                snapshot: {
                  eyebrow: "Presentation template",
                  title: "Bazaar UX case study",
                  subtitle: "Simple specs you can copy into Figma, Slides, or Behance.",
                  badge: "Portfolio",
                  fields: [
                    {
                      label: "Canvas",
                      value: "About 1440px wide, with generous side margins (about 100px left and right).",
                    },
                    {
                      label: "Type",
                      value: "One sans-serif family — for example Roboto, Lato, or Rubik.",
                    },
                    {
                      label: "Colour",
                      value: "One accent colour plus neutrals. Avoid rainbow decoration.",
                    },
                    {
                      label: "Publish",
                      value: "Export PDF/PNG for your records; upload to Behance or a similar portfolio host if you want it public.",
                    },
                  ],
                  note: "This course does not require an LMS upload. Keep files in your own portfolio folder.",
                },
              },
            ],
          },
        },
        {
          slug: "exercise-ux-case-study",
          title: "Exercise: assemble your UX case study",
          duration: "20 min",
          summary:
            "Build one connected case study from your Module 1 deliverables — intro through test actions.",
          content: {
            lede: "This is practice. Pull the documents you already made. Do not start new decoration — sequence and clarity come first.",
            sections: [
              {
                id: "make",
                icon: "list",
                heading: "What to assemble",
                bullets: [
                  "One intro slide — description and objective from your stakeholder brief.",
                  "Process diagram.",
                  "Competitor table + experience map highlights.",
                  "Research findings, insight, persona, empathy map.",
                  "IA diagram and user flow.",
                  "Journey with LF wireframes.",
                  "Testing summary and what you fixed.",
                ],
              },
              {
                id: "done",
                icon: "check",
                heading: "How to know you are done",
                paragraphs: [
                  "A stranger should follow the story from problem to test without asking you to reorder the pages.",
                ],
                bullets: [
                  "Artefacts appear in process order.",
                  "Same product name and persona throughout.",
                  "Little or no decorative colour.",
                  "Readable type; export ready for PDF or Behance.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "visual-ui",
      phase: "Visual UI",
      title: "Visual UI fundamentals",
      summary: "Design: make the interface readable, scannable, and consistent before you chase a visual style.",
      duration: "90 min",
      lessons: [
        {
          slug: "layout-spacing",
          title: "Layout, spacing, and alignment",
          duration: "20 min",
          summary: "Use a simple spacing scale, align to a grid, and keep related items close.",
          content: {
            lede: "Layout is how things sit on the page. Good spacing and alignment make a screen calm and easy to scan.",
            sections: [
              {
                id: "scale",
                heading: "Use a spacing scale",
                paragraphs: [
                  "Pick a small set of gaps — for example 8, 16, 24, 32 — and reuse them. Random gaps make the UI feel messy.",
                ],
              },
              {
                id: "align",
                heading: "Align and group",
                paragraphs: [
                  "Align edges to a grid. Put related items close together. Separate unrelated groups with more space.",
                ],
                bullets: [
                  "One clear column or grid, not floating boxes.",
                  "Related fields share one block.",
                  "Breathing room around the primary button.",
                ],
              },
            ],
          },
        },
        {
          slug: "typography",
          title: "Typography that reads",
          duration: "20 min",
          summary: "Limit fonts, set clear sizes, and keep line length and contrast easy to read.",
          content: {
            lede: "Type does most of the talking. If people cannot read it, the rest of the design does not matter.",
            sections: [
              {
                id: "ladder",
                heading: "A clear size ladder",
                paragraphs: [
                  "Use one or two typefaces. Set sizes for title, section, body, and helper text. Keep the differences obvious.",
                ],
              },
              {
                id: "comfort",
                heading: "Comfort",
                paragraphs: [
                  "Keep line length short enough to follow. Give lines room. Check contrast so text does not fade into the background.",
                ],
                bullets: [
                  "Body text large enough on a phone.",
                  "Strong contrast between text and background.",
                  "Hierarchy: title bigger than body, body bigger than captions.",
                ],
              },
            ],
          },
        },
        {
          slug: "colour-states",
          title: "Colour, contrast, and states",
          duration: "25 min",
          summary: "Default, hover, focus, disabled, error, and success must look different. Colour alone is not enough.",
          content: {
            lede: "Colour guides attention. States tell people what they can do. Both must stay clear for everyone, including people who cannot rely on colour alone.",
            sections: [
              {
                id: "states",
                heading: "Design the states",
                paragraphs: [
                  "Every control needs more than one look: default, hover or press, focus for keyboard, disabled, error, and success where it matters.",
                ],
                bullets: [
                  "Focus — a clear ring or outline for keyboard users.",
                  "Error — text plus colour, not colour alone.",
                  "Disabled — clearly not clickable, not just pale.",
                ],
              },
              {
                id: "contrast",
                heading: "Contrast and colour harmony",
                paragraphs: [
                  "Check contrast so text stays readable. Colour harmony (complementary, analogous, or triadic) can help a palette feel calm, but contrast and meaning come first.",
                ],
              },
            ],
          },
        },
        {
          slug: "hierarchy-components",
          title: "Hierarchy and reusable components",
          duration: "25 min",
          summary: "One main action per screen. Reuse buttons, inputs, and cards so the product feels like one system.",
          content: {
            lede: "Hierarchy tells people what matters first. Components keep the product consistent from screen to screen.",
            sections: [
              {
                id: "one-primary",
                heading: "One primary action",
                paragraphs: [
                  "Each view should have one main next step. Make that button the strongest. Secondary actions stay quieter.",
                ],
              },
              {
                id: "reuse",
                heading: "Reuse components",
                paragraphs: [
                  "Buttons, inputs, cards, and alerts should look and behave the same across the product. That builds recognition and speeds handoff to developers.",
                ],
                bullets: [
                  "Same button style for the same kind of action.",
                  "Same input pattern for forms.",
                  "Same error pattern everywhere.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "figma-workflow",
      phase: "Visual UI",
      title: "Figma workflow",
      summary: "Design in Figma: move the same thinking into a file you can prototype and share.",
      duration: "90 min",
      lessons: [
        {
          slug: "frames-auto-layout",
          title: "Frames, auto layout, and components",
          duration: "25 min",
          summary: "Build screens that grow with content. Turn repeated pieces into components early.",
          content: {
            lede: "Figma works in the browser, so the team can share one file. Frames hold screens. Auto layout keeps spacing tidy as content changes. Components keep buttons and inputs consistent.",
            sections: [
              {
                id: "why-figma",
                heading: "Why Figma fits this work",
                bullets: [
                  "Cloud file — no heavy install required.",
                  "Real-time collaboration — more than one person in the same file.",
                  "Design and prototype in one place.",
                  "Reusable components, variants, and styles.",
                  "Auto layout for responsive structure.",
                  "Dev handoff — inspect, CSS hints, and export.",
                ],
              },
              {
                id: "build",
                heading: "Build with structure",
                paragraphs: [
                  "Start with frames for phone or desktop. Use auto layout so lists and buttons resize with content. Make a component for any piece you will reuse twice.",
                ],
              },
            ],
          },
        },
        {
          slug: "prototyping",
          title: "Prototyping a click-through",
          duration: "20 min",
          summary: "Link the happy path so someone else can click through without you explaining.",
          content: {
            lede: "A prototype is a clickable sketch. Connect the main path so a client or teammate can try the job.",
            sections: [
              {
                id: "link",
                heading: "Link the happy path",
                paragraphs: [
                  "Connect primary buttons to the next frame. Include success at the end. Add one error branch if you can.",
                ],
              },
              {
                id: "share",
                heading: "Share for feedback",
                paragraphs: [
                  "Send a prototype link. Ask people to complete the job and talk out loud. Note where they pause. That feedback is testing, not taste.",
                ],
              },
            ],
          },
        },
        {
          slug: "naming-handoff",
          title: "Naming, variants, and handoff",
          duration: "20 min",
          summary: "Name layers, use variants for states, and give developers what they need to build.",
          content: {
            lede: "Clean files save time. Names, variants, and clear specs make handoff to developers smoother.",
            sections: [
              {
                id: "names",
                heading: "Names and variants",
                paragraphs: [
                  "Name frames and layers in plain English. Use variants for button states and sizes instead of duplicate frames.",
                ],
              },
              {
                id: "handoff",
                heading: "What developers need",
                paragraphs: [
                  "Share spacing, type sizes, colours, and assets. Walk through the flow together. If something is hard to build, listen, then look for a simpler option that still keeps the core experience.",
                ],
                bullets: [
                  "Inspectable styles and measurements.",
                  "Exported icons and images as needed.",
                  "Notes on behaviour: empty, error, loading.",
                ],
              },
            ],
          },
        },
        {
          slug: "exercise-rebuild-screen",
          title: "Exercise: rebuild a simple screen",
          duration: "25 min",
          summary: "Rebuild one wireframe in Figma with auto layout, a component, and a prototype link.",
          content: {
            lede: "Pick one screen from your flow. Rebuild it in Figma. Keep the layout honest to the wireframe.",
            sections: [
              {
                id: "steps",
                heading: "Steps",
                bullets: [
                  "Create a frame for your device size.",
                  "Build the layout with auto layout.",
                  "Turn the primary button into a component.",
                  "Add a second frame for success or error.",
                  "Link them in prototype mode and share the link.",
                ],
              },
              {
                id: "done",
                heading: "How to know you are done",
                bullets: [
                  "Someone else can click the happy path without you.",
                  "Spacing uses a clear scale, not random gaps.",
                  "The button component is reused, not redrawn.",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "review-case-study",
      phase: "Review",
      title: "Usability, accessibility, and a case study",
      summary: "Testing: check the work with Nielsen’s heuristics, then explain it as a small case study.",
      duration: "85 min",
      lessons: [
        {
          slug: "heuristic-review",
          title: "Heuristic review",
          duration: "20 min",
          summary: "Walk your flow against Nielsen’s 10 heuristics and write what to fix first.",
          content: {
            lede: "A heuristic review is a structured look at your design using known usability rules. Use Jakob Nielsen’s 10 as the checklist.",
            sections: [
              {
                id: "walk",
                heading: "Walk the flow",
                paragraphs: [
                  "Open the prototype. For each step, ask whether the product shows status, uses real language, lets people undo, stays consistent, prevents errors, shows options, stays efficient, stays simple, recovers from errors, and offers help when needed.",
                ],
              },
              {
                id: "list",
                heading: "Write findings",
                paragraphs: [
                  "List issues with the heuristic name and a short fix. Prioritise blockers first — things that stop the job — then polish.",
                ],
                bullets: [
                  "Issue — what went wrong.",
                  "Heuristic — which rule it breaks.",
                  "Fix — the smallest change that helps.",
                ],
              },
            ],
          },
        },
        {
          slug: "accessibility-basics",
          title: "Accessibility that ships",
          duration: "20 min",
          summary: "Contrast, text size, labels, focus, and keyboard use. Ship these basics even on a first project.",
          content: {
            lede: "Accessibility means more people can use the product. Follow WCAG basics: contrast, readable type, labels, keyboard paths, and clear focus.",
            sections: [
              {
                id: "checks",
                heading: "Checks that ship",
                bullets: [
                  "Colour contrast — text readable on its background.",
                  "Typography — size and spacing that stay readable.",
                  "Keyboard — tabs and buttons usable without a mouse.",
                  "Alt text — describe meaningful images and icons.",
                  "Forms — clear labels, errors, and focus states. Colour is not the only signal.",
                  "Touch targets — big enough to tap on a phone.",
                ],
              },
              {
                id: "tools",
                heading: "Tools and people",
                paragraphs: [
                  "Use a contrast checker or a Figma accessibility plugin. When you can, watch someone with different needs use the flow. Keep learning as standards update.",
                ],
              },
            ],
          },
        },
        {
          slug: "critique",
          title: "Giving and taking critique",
          duration: "15 min",
          summary: "Talk about the user and the task, not taste. Ask for the next decision.",
          content: {
            lede: "Feedback improves the work. Treat it as part of the process, not a personal attack.",
            sections: [
              {
                id: "receive",
                heading: "When you receive feedback",
                bullets: [
                  "Listen without interrupting.",
                  "Ask clarifying questions to find the real concern.",
                  "Act fast on clear, useful changes.",
                  "If it conflicts with good UX, explain your reasoning calmly.",
                  "Offer options that still meet the client’s goal.",
                ],
              },
              {
                id: "give",
                heading: "When you give feedback",
                paragraphs: [
                  "Point to the user and the task. Say what is unclear or blocking. Ask what decision is needed next. Avoid “I just don’t like it.”",
                ],
              },
            ],
          },
        },
        {
          slug: "capstone-case-study",
          title: "Capstone: refine your case study",
          duration: "30 min",
          summary:
            "Extend your UX case study with heuristic findings, an accessibility check, and one clear before/after.",
          content: {
            lede: "You already assembled a UX case study after the mobile-app process. Now refine it with this module’s review work so the story includes heuristics, accessibility, and a sharper outcome.",
            sections: [
              {
                id: "extend",
                heading: "What to add",
                bullets: [
                  "Heuristic findings — issues, which Nielsen rule, and the fix.",
                  "One accessibility check you actually ran.",
                  "A key mockup or Figma screen if you have moved past LF wireframes.",
                  "Result — what you changed and what you would do next.",
                ],
              },
              {
                id: "done",
                heading: "How to know you are done",
                paragraphs: [
                  "A reader should understand the problem, the process, and one clear outcome without you in the room. Keep the language simple. Show, then explain.",
                ],
                bullets: [
                  "Still follows the UX process sequence from your earlier case study.",
                  "One before/after or one key fix called out.",
                  "Nielsen or accessibility mentioned with a real example.",
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

export const LEARNING_TRACKS = [
  {
    id: "ui-ux",
    slug: "ui-ux",
    title: "UI / UX",
    shortTitle: "UI / UX",
    description:
      "Free UI UX design course: users, flows, visual UI, Figma practice, and a small case study. Self-paced on this site.",
    audience: UI_UX_COURSE.audience,
    course: UI_UX_COURSE,
  },
  {
    id: "ai-video",
    slug: "ai-video",
    title: "AI video creation",
    shortTitle: "AI video",
    description:
      "Tools, workflows, and export habits for short-form and social video made with AI-assisted editors.",
    audience: "Creators who want a downloadable path into AI-assisted video, not a streaming classroom.",
  },
  {
    id: "content-ideas",
    slug: "content-ideas",
    title: "Content ideas",
    shortTitle: "Content ideas",
    description:
      "Idea packs and planning resources such as large video-idea libraries for consistent publishing.",
    audience: "Creators who need structured idea lists more than another editing tutorial.",
  },
  {
    id: "ai-image",
    slug: "ai-image",
    title: "AI image generation",
    shortTitle: "AI images",
    description:
      "Prompt craft, generation workflows, and commercial-use caveats for AI image tools.",
    audience: "Marketers and makers who generate visuals and need a clear, downloadable starting kit.",
  },
  {
    id: "fundamentals",
    slug: "fundamentals",
    title: "Fundamentals",
    shortTitle: "Fundamentals",
    description: "Cross-cutting foundations that support the other Training tracks.",
    audience: "Beginners who want a short foundation before a specialised track.",
  },
];

export const TRAINING_STEPS = [
  {
    title: "Choose a course",
    body: "Open a Training listing, check what is in the download, and add one digital licence to the cart. The UI/UX course is free on its track page and does not use checkout.",
  },
  {
    title: "Pay in INR",
    body: "Paid packs ask for a name and email at checkout. Card and UPI details are entered on Razorpay for the catalogue price.",
  },
  {
    title: "Download the materials",
    body: "After payment is captured, a private download opens for 48 hours. There is no live classroom or progress tracker.",
  },
];

export function getLearningTrackBySlug(slug) {
  return LEARNING_TRACKS.find((track) => track.slug === slug) ?? null;
}

export function getLearningTrackById(id) {
  return LEARNING_TRACKS.find((track) => track.id === id) ?? null;
}

export function isFreeOnSiteCourse(track) {
  return Boolean(track?.course?.isFree);
}

export function getCourseLessonCount(course) {
  if (!course?.modules) {
    return 0;
  }
  return course.modules.reduce((total, module) => total + (module.lessons?.length ?? 0), 0);
}

export function getPublishedLessons(course) {
  if (!course?.modules) {
    return [];
  }
  const published = [];
  course.modules.forEach((module, moduleIndex) => {
    (module.lessons ?? []).forEach((lesson, lessonIndex) => {
      if (lesson.content) {
        published.push({
          ...lesson,
          moduleId: module.id,
          moduleTitle: module.title,
          moduleIndex,
          lessonIndex,
        });
      }
    });
  });
  return published;
}

export function getLessonBySlug(course, slug) {
  if (!slug) {
    return null;
  }
  return getPublishedLessons(course).find((lesson) => lesson.slug === slug) ?? null;
}

export function getAdjacentLessons(course, slug) {
  const published = getPublishedLessons(course);
  const index = published.findIndex((lesson) => lesson.slug === slug);
  if (index < 0) {
    return { prev: null, next: null };
  }
  return {
    prev: published[index - 1] ?? null,
    next: published[index + 1] ?? null,
  };
}

export function getPublishedLessonParams() {
  return LEARNING_TRACKS.flatMap((track) => {
    if (!isFreeOnSiteCourse(track)) {
      return [];
    }
    return getPublishedLessons(track.course).map((lesson) => ({
      track: track.slug,
      lesson: lesson.slug,
    }));
  });
}
