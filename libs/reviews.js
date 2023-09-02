import { readdir, readFile } from 'node:fs/promises';
import { marked } from 'marked';
import matter from 'gray-matter';

export const getReview = async (slug) => {
    const markedDownText = await readFile(`./content/reviews/${slug}.md`, 'utf8');
    const { content, data: { title, date, image } } = matter(markedDownText);
    const body = marked(content);

    return { slug, title, date, image, body };
};

export const getSlugs = async () => {
    const files = await readdir('./content/reviews');
    return files.filter(file => file.endsWith('.md'))
                .map(file => file.slice(0, -'.md'.length));
};

export const getReviews = async () => {
    const slugs = await getSlugs();
    const reviews = [];

    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }

    return reviews.sort((a, b) => b.date.localeCompare(a.date));
};


export const getFeaturedReview = async () => {
    const featuredReview = await getReviews();
    return featuredReview[0];
};