export const projectsConfig = {
  title: "AI Product Demos",
  description: "Three focused, testable demos showing how I turn AI ideas into clear product experiences, useful workflows, and polished web applications.",
  backButton: "Back to Home",
  noProjects: "No projects found.",
  items: [
    {
      title: "DocPilot AI",
      description: "Summarize documents, extract action items, and turn messy notes into a clear next-step brief.",
      href: "/demos/document-assistant",
      imageUrl: "/assets/images/projects/project1.jpg"
    },
    {
      title: "SupportFlow AI",
      description: "A customer-support assistant that answers common questions and routes visitors toward the right action.",
      href: "/demos/customer-support",
      imageUrl: "/assets/images/projects/project2.jpg"
    },
    {
      title: "LaunchCraft AI",
      description: "Generate a campaign brief, content outline, and practical launch checklist from one business idea.",
      href: "/demos/content-workflow",
      imageUrl: "/assets/images/projects/project3.png"
    }
  ]
} as const; 