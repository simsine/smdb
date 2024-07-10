// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("lucia").User | null
			session: import("lucia").Session | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}

// svelte-fa
declare module "@fortawesome/free-solid-svg-icons/index.js" {
	export * from "@fortawesome/free-solid-svg-icons"
}
