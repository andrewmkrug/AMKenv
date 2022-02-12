const conventionalCommits = [
  {
    type: "feat",
    description: "A new feature",
    title: "Features",
    emoji: "✨",
  },
  {
    type: "fix",
    description: "A bug fix",
    title: "Bug Fixes",
    emoji: "🐛",
  },
  {
    type: "docs",
    description: "Documentation only changes",
    title: "Documentation",
    emoji: "📖",
  },
  {
    type: "style",
    description:
      "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
    title: "Styles",
    emoji: "💎",
  },
  {
    type: "refactor",
    description: "A code change that neither fixes a bug nor adds a feature",
    title: "Code Refactoring",
    emoji: "📦",
  },
  {
    type: "perf",
    description: "A code change that improves performance",
    title: "Performance Improvements",
    emoji: "🚀",
  },
  {
    type: "test",
    description: "Adding missing tests or correcting existing tests",
    title: "Tests",
    emoji: "🚨",
  },
  {
    type: "build",
    description:
      "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
    title: "Builds",
    emoji: "👷",
  },
  {
    type: "ci",
    description:
      "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
    title: "Continuous Integrations",
    emoji: "💻",
  },
  {
    type: "chore",
    description: "Other changes that don't modify src or test files",
    title: "Chores",
    emoji: "🎫",
  },
  {
    type: "revert",
    description: "Reverts a previous commit",
    title: "Reverts",
    emoji: "🔙",
  },
];
export default conventionalCommits;
