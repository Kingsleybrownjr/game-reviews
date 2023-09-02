import qs from 'qs';
import { marked } from 'marked';

import { fetch } from 'next/dist/compiled/@edge-runtime/primitives';

const CMS_URL = 'http://localhost:1337';

export const getSlugs = async () => {
    const { data } = await fetchReviews({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    });

    return data.map(item => item.attributes.slug);
};

const fetchReviews = async (params) => {
    const urlConfig = qs.stringify(params, { encodeValuesOnly: true });
    const response = await fetch(`${CMS_URL}/api/reviews?${urlConfig}`);

    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${response}`);
    }

    return await response.json();
};

const toReview = (item) => {
    const { attributes: { slug, title, publishedAt, image } } = item;

    return {
        slug,
        title,
        date: publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + image.data.attributes.url,
    };
};

export const getReview = async (slug) => {
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 1, withCount: false }
    });

    const item = data[0];

    return {
        ...toReview(item),
        body: marked(item.attributes.body),
    };
};

export const getReviews = async () => {
    const { data } = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 6 }
    });

    return data.map(toReview);
};

export const getFeaturedReview = async () => {
    const featuredReview = await getReviews();
    return featuredReview[0];
};