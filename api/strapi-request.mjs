import { writeFileSync } from 'node:fs';
import qs from 'qs';

const urlConfig = qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 }
}, { encodeValuesOnly: true });

const url = `http://localhost:1337/api/reviews?${urlConfig}`;

console.log(url);
const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = 'api/strapi-response.json';
writeFileSync(file, formatted, 'utf8');