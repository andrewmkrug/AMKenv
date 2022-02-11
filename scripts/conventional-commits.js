const conventionalCommits = [
  {
    value: "build",
    name: "Build system or external dependencies (example scopes: gulp, broccoli, npm)",
  },
  {
    value: "ci",
    name: "Changes to our CI configuration files",
  },
  { value: "docs", name: "Documentation only changes" },
  { value: "feat", name: "A new feature" },
  { value: "fix", name: "A bug fix" },
  { value: "perf", name: "A code change that improves performance" },
  {
    value: "refactor",
    name: "A code change that neither fixes a bug nor adds a feature",
  },
  {
    value: "style",
    name: "white-space, formatting, missing semi-colons, etc",
  },
  { value: "test", name: "Adding missing tests or correcting existing tests" },
];
export default conventionalCommits;
