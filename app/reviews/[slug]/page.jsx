import { Heading } from '@/components/Heading';
import { Image } from '@/components/Image';
import { getReview, getSlugs } from '@/libs/reviews';
import { ShareLinkButton } from '@/components/ShareLinkButton';

export const generateStaticParams = async () => {
    const slugs = await getSlugs();
    return slugs.map(slug => ( { slug } ));
};

export const generateMetadata = async ({ params: { slug } }) => {
    const review = await getReview(slug);

    return { title: review.title, };
};

export default async function ReviewPage({ params: { slug } }) {
    const { title, date, image, body } = await getReview(slug);

    return (
        <>
            <Heading>{title}</Heading>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{date}</p>
                <ShareLinkButton/>
            </div>
            <Image src={image} width="640px" height="360"/>
            <article className="max-w-screen-sm prose prose-slate" dangerouslySetInnerHTML={{ __html: body }}/>
        </>
    );
}