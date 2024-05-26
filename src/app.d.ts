// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: string
				name: string
			}
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
