/**
 * Product catalogue for Afordz.
 *
 * Add a product by copying an object into `products`. The shop page builds its
 * category, format, tool, and price filters from this list — there is no
 * separate filter list to maintain.
 *
 * Fields the catalogue reads:
 * - saleType: "direct" (Afordz products) or "affiliate" (partner offers)
 * - status: "live" listings can be purchased. "coming-soon" listings appear in
 *   the catalogue without add to cart or checkout. "draft" listings are hidden.
 * - category, format, and framework: shop filters
 * - learningTrack: Training hub path id (ui-ux, ai-video, ai-image, content-ideas, fundamentals)
 * - level: Beginner or Intermediate (shown on Training cards)
 * - priceInr: INR price for direct products with a verified numeric amount
 * - addedAt: YYYY-MM-DD date used by the Newest sort
 * - name, title, tagline, description, topics, and vendor: catalogue search
 * - images[0]: card preview. Set src to a file in /public, such as
 *   "/previews/business.webp", or leave src empty to keep the CSS mockup
 *   chosen by variant (business, portfolio, agency, saas, ecommerce, landing,
 *   data, fields, export, prompts, ebook, canva)
 *
 * Training courses use category "Training", saleType "direct", and a learningTrack.
 * They check out through Razorpay like other Afordz downloads.
 *
 * How to publish an affiliate listing:
 * 1. Paste your real Digistore24 promo URL into affiliateUrl (full https URL).
 *    Never build a tracking link from marketplaceId.
 * 2. Put an authorised vendor image in public/previews/ and set images[0].src
 *    to that path, for example "/previews/prompt-library.webp".
 * 3. Change status from "draft" to "live" so the listing appears in the catalogue.
 *
 * placeholders.* stays true until you confirm that field.
 * Set detailsStatus to "confirmed" only after every draft field is checked.
 * Never put a paid ZIP, or any direct download URL, in this file or in /public.
 */

export const products = [
  {
    id: "bootstrap-templates-bundle",
    slug: "bootstrap-templates-bundle",
    saleType: "direct",
    status: "live",
    type: "digital",
    name: "500 Bootstrap5 and 500 Tailwind HTML Templates",
    title: "500 Bootstrap 5 + 500 Tailwind HTML Templates",
    category: "Website Templates",
    format: "Digital download",
    language: "English",
    vendor: "Afordz",
    affiliateUrl: "",
    topics: ["Bootstrap 5", "Tailwind CSS", "HTML"],
    framework: "Bootstrap & Tailwind",
    addedAt: "2026-03-18",
    tagline:
      "1,000 single-page HTML files: 500 Bootstrap 5 pages and 500 Tailwind CSS pages that load styles from a CDN.",
    description:
      "A ZIP of 1,000 standalone HTML pages: 500 Bootstrap 5 files and 500 Tailwind CSS files. Each page is a single HTML file. Styles and icons load from a CDN, so an internet connection is required to view them as designed. The download does not include local CSS, JavaScript, or image assets, and it is not a set of 1,000 separate multi-file website kits.",
    priceInr: 99,
    currency: "INR",
    detailsStatus: "confirmed",
    previewNote:
      "These are screenshots of the top of six HTML files in the download, opened in a desktop browser. Placeholder copy and remote images are part of those files. They are not a view of every page in the ZIP.",
    contents: [
      {
        title: "500 Bootstrap 5 pages",
        detail:
          "The BS500DEAL folder contains 500 HTML files named index1.html through index500.html. Each file is a single page that loads Bootstrap 5 from a CDN.",
      },
      {
        title: "500 Tailwind CSS pages",
        detail:
          "The TW500DEAL folder contains 500 HTML files named index1.html through index500.html. Each file is a single page that loads Tailwind CSS from a CDN.",
      },
      {
        title: "What is not included",
        detail:
          "There are no local CSS, JavaScript, or image files. There are no per-template project folders. Font Awesome and other libraries used in the pages also load from a CDN.",
      },
    ],
    compatibility: [
      "A current web browser that can open an HTML file.",
      "An internet connection, so the CDN copies of Bootstrap 5, Tailwind CSS, and related libraries can load.",
      "These pages are not an offline kit and are not separate multi-file website projects.",
    ],
    images: [
      {
        id: "dark-hero",
        label: "Dark hero",
        variant: "business",
        src: "/previews/dark-hero.png",
        alt: "Screenshot of the top of BS500DEAL/index1.html, a dark Bootstrap hero with feature cards",
        summary: "BS500DEAL/index1.html. A dark hero, two buttons, and a row of feature cards.",
      },
      {
        id: "cover-header",
        label: "Cover header",
        variant: "portfolio",
        src: "/previews/cover-header.png",
        alt: "Screenshot of the top of BS500DEAL/index481.html, a photo cover with a heading and a Get Started button",
        summary: "BS500DEAL/index481.html. A photo cover, a heading, and a Get Started button.",
      },
      {
        id: "marketing-page",
        label: "Marketing page",
        variant: "agency",
        src: "/previews/marketing-page.png",
        alt: "Screenshot of the top of BS500DEAL/index496.html, a Bootstrap marketing page with an action button",
        summary: "BS500DEAL/index496.html. A centered marketing heading and an action button.",
      },
      {
        id: "product-page",
        label: "Product page",
        variant: "ecommerce",
        src: "/previews/product-page.png",
        alt: "Screenshot of the top of TW500DEAL/index262.html, a product layout with a price and an Add to Cart button",
        summary: "TW500DEAL/index262.html. A product title, a price, and an Add to Cart button. Checkout is not included.",
      },
      {
        id: "landing-page",
        label: "Landing page",
        variant: "landing",
        src: "/previews/landing-page.png",
        alt: "Screenshot of the top of TW500DEAL/index75.html, a landing layout with one action button",
        summary: "TW500DEAL/index75.html. One headline, one action, and an illustration.",
      },
      {
        id: "feature-hero",
        label: "Feature list",
        variant: "saas",
        src: "/previews/feature-hero.png",
        alt: "Screenshot of the top of BS500DEAL/index257.html, a blue hero above a grid of features",
        summary: "BS500DEAL/index257.html. A blue hero, a Contact Us button, and a feature grid.",
      },
    ],
  },
  {
    id: "marketing-contact-email-list",
    slug: "marketing-contact-email-list",
    saleType: "direct",
    status: "draft",
    type: "digital",
    name: "Marketing Contact Email List",
    title: "Marketing Contact Email List",
    category: "Marketing Data",
    format: "Digital download",
    language: "English",
    vendor: "Afordz",
    affiliateUrl: "",
    topics: [],
    framework: "CSV",
    addedAt: "2026-10-01",
    tagline: "A digital file of contact records for marketing campaigns. Record count, source, and consent status are placeholders.",
    description:
      "A single digital licence for a contact list intended for marketing use. This demo does not include real names or email addresses, and it does not deliver a file. Confirm how the records were collected, whether people agreed to be contacted, and which laws apply before you sell or use a list like this.",
    priceInr: 1999,
    currency: "INR",
    detailsStatus: "placeholder",
    placeholderNote:
      "Price, record count, columns, source, consent, licence, and support window are drafts. Confirm each one, including lawful collection, before you accept orders.",
    previewNote:
      "These previews are original CSS mockups of a spreadsheet-style file. They are not a sample of real contacts, and they are not the download.",
    placeholders: {
      price: true,
      recordCount: true,
      contents: true,
      compatibility: true,
      licence: true,
      support: true,
      source: true,
      fileFormat: true,
    },
    fileFormat: "CSV",
    fileFormatNote:
      "Placeholder. Confirm the delimiter, character encoding, and whether a spreadsheet workbook will also ship.",
    images: [
      {
        id: "spreadsheet",
        label: "Spreadsheet view",
        variant: "data",
        src: "",
        alt: "CSS mockup of a contact list spreadsheet",
        summary: "A table layout with columns for name, email, role, and region. The rows are bars, not real contacts.",
      },
      {
        id: "fields",
        label: "Fields",
        variant: "fields",
        src: "",
        alt: "CSS mockup of contact list fields",
        summary: "Draft columns only. Confirm the field names you will actually deliver.",
      },
      {
        id: "export",
        label: "File export",
        variant: "export",
        src: "",
        alt: "CSS mockup of a file export panel",
        summary: "A file is planned after a verified payment. This demo does not create a download.",
      },
    ],
    contents: [
      {
        title: "Contact records",
        detail:
          "Placeholder. Confirm the number of rows, and do not treat any count on this site as final until you check the file.",
      },
      {
        title: "Draft columns",
        detail:
          "Name, email, role, and region are a draft. Replace this list with the headers in the file you will deliver.",
      },
      {
        title: "Source and consent",
        detail:
          "Placeholder. Confirm where the records came from and whether each person agreed to marketing contact. This listing is not a claim that the data is opted-in.",
      },
      {
        title: "File format",
        detail: "A CSV download is planned. It is not part of this store demo.",
      },
    ],
    compatibility: [
      "Spreadsheet apps that can open a UTF-8 CSV file. Placeholder — confirm the encoding and delimiter.",
      "This demo does not include a sample file you can import.",
    ],
    licence: {
      summary:
        "Draft only: one digital licence for the buyer’s own marketing use. Resale of the list, sharing the file, and contacting people without a lawful basis are not decided in this text.",
      points: [
        "This is not a licence grant and it is not legal advice.",
        "Replace it with terms that match how the list was collected and how it may be used.",
        "The demo checkout does not create a paid licence and does not transfer any contacts.",
      ],
    },
    support: {
      summary:
        "Draft only: a placeholder window of 30 days for questions about a missing or damaged file. That window is not a promise.",
      points: [
        "Support hours are not confirmed.",
        "This demo does not open a support ticket.",
        "Publish a real contact address before you offer help.",
      ],
    },
  },
  {
    id: "canva-subscription",
    slug: "canva-subscription",
    saleType: "direct",
    status: "coming-soon",
    type: "digital",
    name: "Canva Subscription",
    title: "Canva Subscription",
    category: "Design Tools",
    format: "Subscription",
    language: "English",
    vendor: "Afordz",
    affiliateUrl: "",
    topics: [],
    framework: "Canva",
    addedAt: "2026-10-06",
    subscriptionTerm: "one year",
    tagline: "One year of Canva access for ₹99. Plan name, seats, and how access is delivered are not confirmed.",
    description:
      "A one-year Canva subscription listed at ₹99. This page is not an official Canva storefront. The plan name, the number of seats, and how access is delivered are not confirmed. The preview is an original CSS mockup, not a Canva screenshot. This listing does not include a download file.",
    priceInr: 99,
    currency: "INR",
    detailsStatus: "placeholder",
    placeholderNote:
      "Plan name, seat count, and how access is delivered are not confirmed. The listed price is ₹99 for one year. This listing does not include a download file.",
    previewNote:
      "This preview is an original CSS placeholder for a design-tool subscription. It is not a Canva screenshot and it does not use Canva brand assets.",
    placeholders: {
      price: false,
      contents: true,
      compatibility: true,
      licence: true,
      support: true,
      plan: true,
      delivery: true,
    },
    images: [
      {
        id: "workspace",
        label: "Workspace",
        variant: "canva",
        src: "",
        alt: "Original CSS placeholder for a design subscription listing",
        summary: "An original placeholder graphic of a design workspace. It is not a Canva screenshot.",
      },
    ],
    contents: [
      {
        title: "Access term",
        detail: "Listed as one year from the date you actually grant access. Confirm when the year starts and ends.",
      },
      {
        title: "Plan and seats",
        detail:
          "Placeholder. Confirm whether this is a personal or team plan, and how many people may use it.",
      },
      {
        title: "How access is delivered",
        detail:
          "Placeholder. Confirm the method you will use after a verified payment. This listing does not create an account or send login details.",
      },
    ],
    compatibility: [
      "A current web browser that can open Canva. Placeholder — confirm the devices you will support.",
      "This listing does not include a Canva login or a download.",
    ],
    licence: {
      summary:
        "Draft only: one subscription listing for the buyer’s own use for the listed term. Canva’s own terms still apply. Resale of logins, shared passwords, and unofficial access methods are not decided in this text.",
      points: [
        "This is not a licence grant from Canva and it is not legal advice.",
        "Replace it with terms that match how you will actually deliver access.",
        "This listing cannot be purchased yet and does not create a paid Canva subscription.",
      ],
    },
    support: {
      summary:
        "Draft only: a placeholder window of 30 days for questions about access that was not granted after a verified payment. That window is not a promise.",
      points: [
        "Support hours are not confirmed.",
        "This listing does not open a support ticket.",
        "Questions can be sent from the contact page.",
      ],
    },
  },
  {
    id: "ui-ux-fundamentals-course",
    slug: "ui-ux-fundamentals-course",
    saleType: "direct",
    status: "coming-soon",
    type: "digital",
    name: "UI/UX Fundamentals Course Pack",
    title: "UI/UX Fundamentals Course Pack",
    category: "Training",
    format: "Course download",
    language: "English",
    vendor: "Afordz",
    affiliateUrl: "",
    learningTrack: "ui-ux",
    level: "Beginner",
    topics: ["UI design", "UX basics", "Figma", "Wireframes"],
    framework: "Figma",
    addedAt: "2026-10-09",
    tagline:
      "A downloadable beginner pack for UI/UX fundamentals: core concepts, Figma workflow notes, and practice checklists.",
    description:
      "One digital licence for an Afordz Training course pack on UI/UX fundamentals. Materials are delivered as a private download after a captured Razorpay payment. This is not a live cohort, streaming classroom, or mentorship programme. The archive and final lesson list will be confirmed before the listing is marked live.",
    priceInr: 499,
    currency: "INR",
    detailsStatus: "placeholder",
    placeholderNote:
      "Lesson list, file formats inside the ZIP, and licence wording are drafts until the course archive is final. The listing is coming soon and cannot be purchased yet.",
    previewNote:
      "This preview is an original CSS placeholder for a Training course. It is not a screenshot of the download.",
    placeholders: {
      contents: true,
      licence: true,
      support: true,
    },
    images: [
      {
        id: "overview",
        label: "Course overview",
        variant: "portfolio",
        src: "",
        alt: "Original CSS placeholder for the UI/UX Fundamentals course pack",
        summary: "Placeholder graphic for this Training listing.",
      },
    ],
    contents: [
      {
        title: "Fundamentals lessons",
        detail:
          "Placeholder. Confirm the lesson count and topics that will ship in the ZIP (layout, hierarchy, basic UX flows).",
      },
      {
        title: "Figma workflow notes",
        detail:
          "Placeholder. Confirm whether Figma file links, local .fig files, or PDF notes are included.",
      },
      {
        title: "Practice checklists",
        detail: "Placeholder. Confirm the checklist formats (PDF or Markdown) before going live.",
      },
    ],
    compatibility: [
      "A device that can open PDF or Markdown notes from a ZIP.",
      "Figma in a current browser if the pack includes Figma-based exercises.",
      "This listing does not include live mentoring or a progress tracker.",
    ],
    licence: {
      summary:
        "Draft only: one digital licence for the buyer’s own learning use. Resale and redistribution of the course files are not decided in this text.",
      points: [
        "This is not legal advice.",
        "Replace with final terms before accepting orders.",
        "Coming soon — checkout is not open yet.",
      ],
    },
    support: {
      summary:
        "Draft only: a placeholder window of 30 days for questions about a missing download after a verified payment.",
      points: [
        "Support hours are not confirmed.",
        "There is no live classroom support channel for this pack.",
      ],
    },
  },
  {
    id: "ai-video-creation-course",
    slug: "ai-video-creation-course",
    saleType: "direct",
    status: "coming-soon",
    type: "digital",
    name: "AI Video Creation Course Pack",
    title: "AI Video Creation Course Pack",
    category: "Training",
    format: "Video + PDF",
    language: "English",
    vendor: "Afordz",
    affiliateUrl: "",
    learningTrack: "ai-video",
    level: "Beginner",
    topics: ["AI video", "Short-form video", "CapCut", "Social export"],
    framework: "CapCut",
    addedAt: "2026-10-09",
    tagline:
      "A downloadable beginner pack for AI-assisted video: tool overview, workflow steps, and export notes for social formats.",
    description:
      "One digital licence for an Afordz Training course pack on AI video creation. Materials are delivered as a private download after a captured Razorpay payment. This is not a live workshop or an hosted video streaming platform. Confirm the final archive before marking the listing live.",
    priceInr: 599,
    currency: "INR",
    detailsStatus: "placeholder",
    placeholderNote:
      "Video lesson count, tool versions, and sample project files are drafts until the ZIP is final. Coming soon — not available to purchase yet.",
    previewNote:
      "This preview is an original CSS placeholder for a Training course. It is not a sample of the video lessons.",
    placeholders: {
      contents: true,
      licence: true,
      support: true,
    },
    images: [
      {
        id: "overview",
        label: "Course overview",
        variant: "saas",
        src: "",
        alt: "Original CSS placeholder for the AI Video Creation course pack",
        summary: "Placeholder graphic for this Training listing.",
      },
    ],
    contents: [
      {
        title: "AI video workflow lessons",
        detail:
          "Placeholder. Confirm how many lessons ship and whether they are MP4 files, links, or PDF walkthroughs.",
      },
      {
        title: "Editor notes (CapCut-oriented)",
        detail:
          "Placeholder. Confirm the editor versions you document and any project files included.",
      },
      {
        title: "Social export checklist",
        detail:
          "Placeholder. Confirm aspect ratios and platform notes included in the pack.",
      },
    ],
    compatibility: [
      "A device that can open PDF notes and common video files from a ZIP.",
      "CapCut or a similar editor if you follow the practical exercises.",
      "This listing does not include cloud rendering credits or a streaming LMS.",
    ],
    licence: {
      summary:
        "Draft only: one digital licence for the buyer’s own learning use. Resale of the pack is not decided in this text.",
      points: [
        "This is not legal advice.",
        "Third-party tools keep their own terms.",
        "Coming soon — checkout is not open yet.",
      ],
    },
    support: {
      summary:
        "Draft only: a placeholder window of 30 days for questions about a missing download after a verified payment.",
      points: [
        "Support hours are not confirmed.",
        "There is no live workshop support for this pack.",
      ],
    },
  },
  {
    id: "premium-affiliate-prompt-library",
    slug: "premium-affiliate-prompt-library",
    saleType: "affiliate",
    status: "draft",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "47710",
    name: "The Premium Prompt Library for Smarter Affiliate Execution",
    title: "The Premium Prompt Library for Smarter Affiliate Execution",
    category: "AI & Marketing Resources",
    format: "Digital resource",
    language: "English",
    vendor: "HeikoBoos",
    affiliateUrl: "http://heikoboos.com/1000-prompts-for-affiliate-marketing#aff=nlsweb27",
    addedAt: "2026-10-06",
    tagline: "A structured collection of 1,000+ ChatGPT prompts for affiliate marketing tasks.",
    description:
      "A structured collection of 1,000+ ChatGPT prompts for affiliate marketing tasks. These contents are vendor-described, not independently tested.",
    topics: [
      "Niche research",
      "Offer selection",
      "Funnel planning",
      "Content creation",
      "Email writing",
      "SEO",
      "Advertising",
    ],
    audience:
      "People who want prompt starting points for affiliate marketing tasks such as niche research, offer selection, funnel planning, content, email, SEO, and advertising.",
    previewNote:
      "This preview is an original CSS placeholder. It is not a vendor screenshot and it is not a sample of the prompt library.",
    images: [
      {
        id: "prompts",
        label: "Prompt library",
        variant: "prompts",
        src: "",
        alt: "Original CSS placeholder for a prompt library listing",
        summary: "An original placeholder graphic for this partner listing. It is not a vendor screenshot.",
      },
    ],
  },
  {
    id: "start-affiliate-marketing",
    slug: "start-affiliate-marketing",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "47713",
    name: "Start Affiliate Marketing like a Pro",
    title: "Start Affiliate Marketing like a Pro",
    category: "Ebooks",
    format: "Ebook",
    language: "English",
    vendor: "HeikoBoos",
    // Digistore redir/597360 was pasted for this title in error (that ID is the Busy Moms guide).
    affiliateUrl: "http://heikoboos.com/start-am-like-a-pro/#aff=nlsweb27",
    addedAt: "2026-10-06",
    tagline: "A beginner-focused ebook introducing affiliate marketing, funnels, traffic strategies and email sequences.",
    description:
      "A beginner-focused ebook introducing affiliate marketing, funnels, traffic strategies and email sequences. These contents are vendor-described, not independently tested.",
    topics: [
      "Affiliate marketing",
      "Funnels",
      "Traffic strategies",
      "Email sequences",
    ],
    audience:
      "Beginners looking for an introduction to affiliate marketing, funnels, traffic strategies, and email sequences.",
    previewNote:
      "This preview is an original CSS placeholder. It is not a vendor screenshot and it is not a sample of the ebook.",
    images: [
      {
        id: "ebook",
        label: "Ebook",
        variant: "ebook",
        src: "",
        alt: "Original CSS placeholder for an ebook listing",
        summary: "An original placeholder graphic for this partner listing. It is not a vendor screenshot.",
      },
    ],
  },
  {
    id: "forbidden-keto-code",
    slug: "forbidden-keto-code",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "630881",
    name: "Unlock the Forbidden Keto Secrets to Accelerate Your Fat Loss",
    title: "Unlock the Forbidden Keto Secrets to Accelerate Your Fat Loss",
    category: "Ebooks",
    format: "Downloads",
    language: "English",
    vendor: "Digistore24 partner",
    affiliateUrl: "https://www.checkout-ds24.com/redir/630881/nlsweb27/",
    addedAt: "2026-10-09",
    tagline:
      "A vendor keto guide with eat/avoid food lists, ketosis tips, and PDF, PNG, and video formats.",
    description:
      "A Digistore24 partner offer described as The Forbidden Keto Code: step-by-step keto food lists, daily tips to stay in ketosis, and guidance on common mistakes that kick people out of keto. Formats include PDF, PNG, and video. These contents are vendor-described, not independently tested. Checkout, delivery, and support are handled by the vendor.",
    topics: ["Keto", "Fat loss", "Meal guidance", "Low-carb"],
    audience:
      "People looking for a digital keto guide with food lists and practical tips for staying in ketosis.",
    previewNote:
      "This preview is the authorised vendor product image from Digistore24. It is not a sample of the downloadable files.",
    images: [
      {
        id: "cover",
        label: "Cover",
        variant: "ebook",
        src: "/previews/forbidden-keto-code.webp",
        alt: "Cover for Unlock the Forbidden Keto Secrets to Accelerate Your Fat Loss",
        summary: "Vendor product cover from Digistore24 for this partner listing.",
      },
    ],
  },
  {
    id: "busy-moms-make-money-online",
    slug: "busy-moms-make-money-online",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "597360",
    name: "10 Easy Ways for Busy Moms to Make Money Online",
    title: "10 Easy Ways for Busy Moms to Make Money Online",
    category: "Ebooks",
    format: "Downloads",
    language: "English",
    vendor: "Digistore24 partner",
    affiliateUrl: "https://www.checkout-ds24.com/redir/597360/nlsweb27/",
    addedAt: "2026-10-09",
    tagline: "Discover the Perfect Roadmap for Busy Moms!",
    description:
      "Learn 10 simple and effective ways to make money online while balancing motherhood. Whether you are a stay-at-home mom or juggling a busy schedule, this roadmap gives you actionable strategies to start earning from home, even with little time or experience. Perfect for moms who want flexibility, freedom, and financial independence. Delivered as a downloadable PDF. These contents are vendor-described, not independently tested. Checkout, delivery, and support are handled by the vendor.",
    topics: ["Make money online", "Side income", "Work from home", "Busy moms"],
    audience:
      "Stay-at-home and busy moms who want flexible ways to earn online with limited time or experience.",
    previewNote:
      "This preview is the authorised vendor product image from Digistore24. It is not a sample of the downloadable PDF.",
    images: [
      {
        id: "cover",
        label: "Cover",
        variant: "ebook",
        src: "/previews/busy-moms-make-money-online.png",
        alt: "Cover for 10 Easy Ways for Busy Moms to Make Money Online",
        summary: "Vendor product cover from Digistore24 for this partner listing.",
      },
    ],
  },
  {
    id: "power-of-positive-thinking",
    slug: "power-of-positive-thinking",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "566028",
    name: "The Power of Positive Thinking",
    title: "The Power of Positive Thinking",
    category: "Ebooks",
    format: "Ebook",
    language: "English",
    vendor: "Digistore24 partner",
    affiliateUrl: "https://www.checkout-ds24.com/redir/566028/nlsweb27/",
    addedAt: "2026-10-09",
    tagline:
      "A PDF ebook on attitude, positive thinking, creative ideas, and problem-solving.",
    description:
      "This Digistore24 partner ebook is delivered in PDF format. Vendor-described contents include: how to make your attitude your ally; the power of positive thinking and turning frustrating moments into a productive environment; secrets of innovative thinking; how to adopt creative thinking; and the art of solving problems. These contents are vendor-described, not independently tested. Checkout, delivery, and support are handled by the vendor.",
    topics: [
      "Positive thinking",
      "Attitude",
      "Creative thinking",
      "Problem solving",
    ],
    audience:
      "Readers looking for a short PDF guide on attitude, positive thinking, creativity, and handling obstacles.",
    previewNote:
      "This preview is the authorised vendor product image from Digistore24. It is not a sample of the ebook.",
    images: [
      {
        id: "cover",
        label: "Cover",
        variant: "ebook",
        src: "/previews/power-of-positive-thinking.webp",
        alt: "Cover for The Power of Positive Thinking ebook",
        summary: "Vendor product cover from Digistore24 for this partner listing.",
      },
    ],
  },
  {
    id: "freelancer-productivity-action-kit",
    slug: "freelancer-productivity-action-kit",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "630882",
    name: "Boost Your Freelance Productivity – All-in-One Action Kit",
    title: "Boost Your Freelance Productivity – All-in-One Action Kit",
    category: "Ebooks",
    format: "Downloads",
    language: "English",
    vendor: "Digistore24 partner",
    affiliateUrl: "https://www.checkout-ds24.com/redir/630882/nlsweb27/",
    addedAt: "2026-10-09",
    tagline: "Boost Focus, Plan Smarter, Win as a Freelancer",
    description:
      "A Digistore24 partner toolkit described as the Freelancer Productivity Action Kit: weekly planners, mini-project templates, and social media content ideas in PDF and PNG formats. These contents are vendor-described, not independently tested. Checkout, delivery, and support are handled by the vendor.",
    topics: [
      "Freelance productivity",
      "Weekly planners",
      "Project templates",
      "Social media ideas",
    ],
    audience:
      "Freelancers who want a simple planning and content system to stay organised and focused.",
    previewNote:
      "This preview is the authorised vendor product image from Digistore24. It is not a sample of the downloadable files.",
    images: [
      {
        id: "cover",
        label: "Cover",
        variant: "ebook",
        src: "/previews/freelancer-productivity-action-kit.webp",
        alt: "Cover for Boost Your Freelance Productivity All-in-One Action Kit",
        summary: "Vendor product cover from Digistore24 for this partner listing.",
      },
    ],
  },
  {
    id: "tshirt-typography-printing-designs",
    slug: "tshirt-typography-printing-designs",
    saleType: "affiliate",
    status: "live",
    // Operator note only. Never construct a tracking or checkout URL from marketplaceId.
    marketplaceId: "626667",
    name: "T-shirt Typography Printing Designs",
    title: "T-shirt Typography Printing Designs",
    category: "Ebooks",
    format: "Downloads",
    language: "English",
    vendor: "Digistore24 partner",
    affiliateUrl: "https://www.checkout-ds24.com/redir/626667/nlsweb27/",
    addedAt: "2026-10-09",
    tagline:
      "250+ editable typography designs for print-on-demand and t-shirt stores.",
    description:
      "A Digistore24 partner bundle of 250+ typography t-shirt designs as editable vector EPS files for print-on-demand and apparel. Vendor-described features include diverse styles and quotes, commercial use, and instant download. These contents are vendor-described, not independently tested. Checkout, delivery, and support are handled by the vendor.",
    topics: [
      "T-shirt designs",
      "Typography",
      "Print-on-demand",
      "EPS vectors",
    ],
    audience:
      "Print-on-demand sellers and apparel creators who want ready-to-edit typography designs for t-shirts and related merch.",
    previewNote:
      "This preview is the authorised vendor product image from Digistore24. It is not a sample of the downloadable design files.",
    images: [
      {
        id: "cover",
        label: "Cover",
        variant: "ebook",
        src: "/previews/tshirt-typography-printing-designs.webp",
        alt: "Cover for T-shirt Typography Printing Designs bundle",
        summary: "Vendor product cover from Digistore24 for this partner listing.",
      },
    ],
  },
];

export function getAllProducts() {
  return products;
}

export function isDraftProduct(product) {
  return product?.status === "draft";
}

export function isComingSoon(product) {
  return product?.status === "coming-soon";
}

export function isCatalogueVisible(product) {
  return product?.status === "live" || isComingSoon(product);
}

export function isPurchasable(product) {
  return product?.status === "live" && !isAffiliateProduct(product);
}

/** Live listings with confirmed details may be indexed and listed in the sitemap. */
export function isIndexableProduct(product) {
  return product?.status === "live" && product?.detailsStatus === "confirmed";
}

export function getIndexableProducts() {
  return products.filter(isIndexableProduct);
}

export function getVisibleProducts() {
  return products.filter(isCatalogueVisible);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getVisibleProductBySlug(slug) {
  const product = getProductBySlug(slug);
  return isCatalogueVisible(product) ? product : null;
}

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function isTrainingProduct(product) {
  return product?.category === "Training" && isDirectProduct(product);
}

export function getTrainingProducts() {
  return getVisibleProducts().filter(isTrainingProduct);
}

export function getProductsByTrack(trackId) {
  if (!trackId) {
    return [];
  }
  return getTrainingProducts().filter((product) => product.learningTrack === trackId);
}

export function isAffiliateProduct(product) {
  return product?.saleType === "affiliate";
}

export function isDirectProduct(product) {
  return product?.saleType !== "affiliate";
}

export function hasVerifiedPrice(product) {
  return Number.isFinite(product?.priceInr);
}

export function hasAffiliateUrl(product) {
  if (!product || typeof product.affiliateUrl !== "string") {
    return false;
  }
  try {
    const url = new URL(product.affiliateUrl.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function productTitle(product) {
  return product?.title || product?.name || "";
}

export function fieldIsPlaceholder(product, field) {
  if (!product || product.detailsStatus === "confirmed") {
    return false;
  }
  return Boolean(product.placeholders?.[field]);
}

export function hasPlaceholders(product) {
  if (!product || product.detailsStatus === "confirmed") {
    return false;
  }
  return Object.values(product.placeholders ?? {}).some(Boolean);
}

export function formatInr(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
