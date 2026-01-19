// Allow importing CSS modules in TypeScript without extra typings
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';

// Allow importing SVGs (and other static assets) as module URLs
declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
