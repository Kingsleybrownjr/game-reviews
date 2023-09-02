import Link from 'next/link';

import { Heading } from '@/components/Heading';
import { Image } from '@/components/Image';
import { getFeaturedReview } from '@/libs/reviews';

export default async function HomePage() {
    const { slug, image, title } = await getFeaturedReview();

    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p className="pb-3">Only the best indie games, reviewed for you.</p>

            <div className="border bg-white w-80 rounded shadow hover:shadow-xl sm:w-full">
                <Link className="flex flex-col sm:flex-row" href={`/reviews/${slug}`}>
                    <Image altClass="sm:rounded-l sm:rounded-r-none" src={image} width="320"
                           height="180"/>
                    <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">{title}</h2>
                </Link>
            </div>
        </>
    );
}
