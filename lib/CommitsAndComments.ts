// await npm("@iconify/iconify");
import dirname, { type Choice } from "@johnlindquist/kit";
// import Iconify from "@iconify/iconify";
const kP = await dirname(
	await dirname(import.meta.url.replace(/file:\/\//, "")),
);

export interface conventionalMetaData extends Choice {
	name: string;
	description: string;
	img: string;
	type: string;
	ctype: string;
	emoji: string;
}
export const commentsAndCommits: conventionalMetaData[] = [
	{
		type: "feat",
		description: "A new feature",
		name: "Features",
		emoji: "✨",
		img: `${kP}/assets/emoji/sparkles.svg`,
		ctype: "commit",
	},
	{
		type: "fix",
		description: "A bug fix",
		name: "Bug Fixes",
		emoji: "🐛",
		img: `${kP}/assets/emoji/bug.svg`,
		ctype: "commit",
	},
	{
		type: "docs",
		description: "Documentation only changes",
		name: "Documentation",
		emoji: "📖",
		img: `${kP}/assets/emoji/openbook.svg`,
		ctype: "commit",
	},
	{
		type: "style",
		description:
			"Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
		name: "Styles",
		emoji: "💎",
		img: `${kP}/assets/emoji/gem.svg`,
		ctype: "commit",
	},
	{
		type: "refactor",
		description: "A code change that neither fixes a bug nor adds a feature",
		name: "Code Refactoring",
		emoji: "📦",
		img: `${kP}/assets/emoji/package.svg`,
		ctype: "commit",
	},
	{
		type: "perf",
		description: "A code change that improves performance",
		name: "Performance Improvements",
		emoji: "🚀",
		img: `${kP}/assets/emoji/rocket.svg`,
		ctype: "commit",
	},
	{
		type: "test",
		description: "Adding missing tests or correcting existing tests",
		name: "Tests",
		emoji: "🚨",
		img: `${kP}/assets/emoji/police-light.svg`,
		ctype: "commit",
	},
	{
		type: "build",
		description:
			"Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
		name: "Builds",
		emoji: "👷",
		img: `${kP}/assets/emoji/construction.svg`,
		ctype: "commit",
	},
	{
		type: "ci",
		description:
			"Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
		name: "Continuous Integrations",
		emoji: "💻",
		img: `${kP}/assets/emoji/computer.svg`,
		ctype: "commit",
	},
	{
		type: "chore",
		description: "Other changes that don't modify src or test files",
		name: "Chores",
		emoji: "🎫",
		img: `${kP}/assets/emoji/ticket.svg`,
		ctype: "commit",
	},
	{
		type: "revert",
		description: "Reverts a previous commit",
		name: "Reverts",
		emoji: "🔙",
		img: `${kP}/assets/emoji/back.svg`,
		ctype: "commit",
	},
	{
		type: "suggestion",
		description:
			"Suggestions propose improvements to the current subject. It's important to be explicit and clear on what is being suggested and why it is an improvement. Consider using patches and the blocking or non-blocking decorations to further communicate your intent.",
		name: "Suggestion",
		emoji: "🎯",
		img: "",
		decoration: ["non-blocking", "blocking"],
		ctype: "comment",
	},
	{
		type: "question",
		description:
			"Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
		name: "Question",
		emoji: "❔",
		img: "",
		ctype: "comment",
	},
	{
		type: "praise",
		description:
			"Praises highlight something positive. Try to leave at least one of these comments per review. Do not leave false praise (which can actually be damaging). Do look for something to sincerely praise.",
		name: "Praise",
		emoji: "👏",
		img: "",
		ctype: "comment",
	},
	{
		type: "nitpick",
		description:
			"Nitpicks are trivial preference-based requests. These should be non-blocking by nature.",
		name: "Nitpick",
		emoji: "🤓",
		img: "",
		decoration: "non-blocking",
		ctype: "comment",
	},
	{
		type: "issue",
		description:
			"Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question.",
		name: "Issue",
		emoji: "❗️",
		img: "",
		ctype: "comment",
	},
	{
		type: "thought",
		description:
			"Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.",
		name: "Thought",
		emoji: "💭",
		img: "",
		ctype: "comment",
	},
	{
		type: "chore",
		description:
			"Chores are simple tasks that must be done before the subject can be “officially” accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.",
		name: "Chore",
		emoji: "💣",
		img: "",
		decoration: "non-blocking",
		ctype: "comment",
	},
	{
		type: "todo",
		description:
			"TODO's are small, trivial, but necessary changes. Distinguishing todo comments from issues: or suggestions: helps direct the reader's attention to comments requiring more involvement.",
		name: "TODO",
		emoji: "🔨",
		img: "",
		ctype: "comment",
	},
	{
		type: "note",
		description:
			"Notes are always non-blocking and simply highlight something the reader should take note of.",
		name: "Note",
		emoji: "✏️",
		img: "",
		decoration: "non-blocking",
		ctype: "comment",
	},
];
