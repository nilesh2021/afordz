/**
 * Training hub tracks. Courses themselves live in products.js with
 * category "Training" and a matching learningTrack id.
 */

export const LEARNING_TRACKS = [
  {
    id: "ui-ux",
    slug: "ui-ux",
    title: "UI / UX",
    shortTitle: "UI / UX",
    description:
      "Design fundamentals, Figma workflows, and portfolio-oriented packs you download and study at your own pace.",
    audience: "Designers and builders who want structured UI/UX materials without a live cohort.",
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
    body: "Open a Training listing, check what is in the download, and add one digital licence to the cart.",
  },
  {
    title: "Pay in INR",
    body: "Checkout asks for a name and email. Card and UPI details are entered on Razorpay for the catalogue price.",
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
