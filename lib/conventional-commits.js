// await npm("@iconify/iconify");

// import Iconify from "@iconify/iconify";
const kP = dirname(dirname(import.meta.url.replace(/file:\/\//, "")));

const conventionalCommits = [
  {
    type: "feat",
    description: "A new feature",
    name: "Features",
    emoji: "✨",
    img: `${kP}/assets/emoji/sparkles.svg`
  },
  {
    type: "fix",
    description: "A bug fix",
    name: "Bug Fixes",
    emoji: "🐛",
    img: `${kP}/assets/emoji/bug.svg`
  },
  {
    type: "docs",
    description: "Documentation only changes",
    name: "Documentation",
    emoji: "📖",
    img: `${kP}/assets/emoji/openbook.svg`
  },
  {
    type: "style",
    description:
      "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
    name: "Styles",
    emoji: "💎",
    img: `${kP}/assets/emoji/gem.svg`
  },
  {
    type: "refactor",
    description: "A code change that neither fixes a bug nor adds a feature",
    name: "Code Refactoring",
    emoji: "📦",
    img: `${kP}/assets/emoji/package.svg`
  },
  {
    type: "perf",
    description: "A code change that improves performance",
    name: "Performance Improvements",
    emoji: "🚀",
    img: `${kP}/assets/emoji/rocket.svg`
  },
  {
    type: "test",
    description: "Adding missing tests or correcting existing tests",
    name: "Tests",
    emoji: "🚨",
    img: `${kP}/assets/emoji/police-light.svg`
  },
  {
    type: "build",
    description:
      "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
    name: "Builds",
    emoji: "👷",
    img: `${kP}/assets/emoji/construction.svg`
  },
  {
    type: "ci",
    description:
      "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
    name: "Continuous Integrations",
    emoji: "💻",
    img: `${kP}/assets/emoji/computer.svg`
  },
  {
    type: "chore",
    description: "Other changes that don't modify src or test files",
    name: "Chores",
    emoji: "🎫",
    img: `${kP}/assets/emoji/ticket.svg`
  },
  {
    type: "revert",
    description: "Reverts a previous commit",
    name: "Reverts",
    emoji: "🔙",
    img: `${kP}/assets/emoji/back.svg`
  }
];
export default conventionalCommits;
