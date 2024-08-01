// Name: conventional

import "@johnlindquist/kit";

import { commentsAndCommits, type conventionalMetaData } from "../lib/CommitsAndComments";
import type { Choice } from "@johnlindquist/kit";
import _ from "@johnlindquist/kit";

const conventionalTypeChoices: Choice[] = [
	{
		name: "Commit",
		value: "commit",
		shortcut: "c",
	},
	{
		name: "Comment",
		value: "comment",
		shortcut: "m",
	},
];

const conventionalType = await arg(
	"[C]ommit or Co[m]ment",
	conventionalTypeChoices,
);


const cc = commentsAndCommits
	.filter(({ ctype }) => ctype === conventionalType)
	.map((c) => {
		return {
			name: c.name,
			description: `${c.description}`,
			img: c.img,
			type: c.type,
			emoji: c.emoji,
		};
	});

const { scopes, write } = await db({ scopes: [] });

const type: conventionalMetaData = await arg(
	{ placeholder: "Commit type:", hint: "Enter a commit type" },
	cc,
);

const onNoChoices = async (input) => {
	if (input) setPanel(md(`# Enter to create "${input}"`));
	else setPanel(md("# Enter a scope name"));
};

const scopesConfig = {
	placeholder: "Enter a scope name",
	strict: false,
	onNoChoices,
	hint: "Enter a scope name",
};

const message = await arg({
	placeholder: "Commit message:",
	hint: "Enter a commit message",
});
const scope = await arg(scopesConfig, scopes);

if (typeof scope === "string") {
	scopes.push({
		name: scope,
		id: uuid(),
	});
	await write();
}

const scopeName = await _.find(scopes, scope)?.name;

const show = await arg(
	{
		placeholder: "Show emoji in commit message:",
		hint: "Choose to show the emoji",
	},
	[
		{
			name: "[Y]es",
			value: true,
		},
		{
			name: "[N]o",
			value: false,
		},
	],
);

// dev({ type, scopeName, message, show, scope });

const messageWithEmoji = show ? `${type.emoji} ${message}` : message;

const msg = `${type.type}(${scope}) ${messageWithEmoji}`;
await copy(msg);
await paste();
