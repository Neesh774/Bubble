import Head from 'next/head';

export default function MetaTags({
	title = 'Bubble',
	description = 'Bubble is the easiest way for you to quickly write down a thought.',
	image = '/bubble.svg',
	favicon = '/favicon.ico',
	color = '#BCF1CE',
}) {
	return (
		<Head>
			<title>{title}</title>

			<meta name='description' content={description} />
			<link rel='icon' type='image/png' href={favicon} />
			<meta name='image' content={image} />
			<meta name='theme-color' content={color} />

			<meta name='twitter:card' content='summary' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={image} />

			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={image} />
		</Head>
	);
}
