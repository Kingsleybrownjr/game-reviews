import Link from 'next/link';
import { Image } from '@/components/Image';
import { getReviews } from '@/libs/reviews';

export const metadata = {
    title: 'Reviews'
};

export default async function ReviewsPage() {
    const reviews = await getReviews();

    return (
        <ul className="flex flex-row flex-wrap gap-3">
            {reviews.map(({ slug, title, image }) =>
                <li key={slug} className="border w-80 bg-white rounded shadow hover:shadow-xl">
                    <Link href={`/reviews/${slug}`}>
                        <Image src={image} width="320" height="180"/>
                        <h2 className="font-orbitron font-semibold py-1 text-center">{title}</h2>
                    </Link>
                </li>
            )}
        </ul>
    );
}
