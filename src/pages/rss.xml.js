import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const chapters = await getCollection('chapters');
	const novels = await getCollection('novels');
	const novelMap = new Map(novels.map((n) => [n.data.slug, n.data.title]));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: chapters.map((ch) => {
			const parts = ch.id.split('/');
			const novelSlug = parts[0];
			const chapterSlug = parts.slice(1).join('/');
			const novelTitle = novelMap.get(novelSlug) ?? novelSlug;
			return {
				...ch.data,
				title: `[${novelTitle}] ${ch.data.title}`,
				link: `/novels/${novelSlug}/${chapterSlug}/`,
			};
		}),
	});
}
