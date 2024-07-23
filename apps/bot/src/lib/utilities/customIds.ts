/**
 * Echo
 */
export const EchoCustomIds = {
	Detailed: 'echo-detailed' as const
};

export const EchoFields = {
	Text: 'text-to-send'
} as const;

/**
 * Eval
 */
export const EvalCustomIds = {
	Eval: 'eval-code' as const
};

export const EvalFields = {
	Code: 'code-to-eval'
} as const;

/**
 * Resources - Add emote/sticker
 */
export const ResourceCustomIds = {
	Emote: 'emote-resource-name' as const,
	Sticker: 'sticker-resource-name' as const
};

export const ResourceFields = {
	Name: 'resourceName'
} as const;

/**
 * Credits
 */
export const enum CreditType {
	Emote = 'e',
	Sticker = 's'
}