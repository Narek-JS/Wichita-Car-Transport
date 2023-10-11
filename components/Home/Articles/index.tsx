import { Container } from '@/components/ui/container';
import { PostCard } from '@/components/PostCard';
import classes from './index.module.css';
import useWindowSize from '@/hooks/useWindowSize';

const Articles: React.FC = () => {
    const { width } = useWindowSize();
    const latestPosts = {
        blogs: [
            {
                imagePath: '/assets/images/testLatestPost1.png',
                categoryName: 'Blogs',
                title: 'Open Car Transport: The Fresh Air Shipping Option',
                description: 'Here at Virginia Beach Auto Transport, we offer a variety of shipping options. We can do...',
                date: 'FEB 20, 2023',
                url: '/'
            },
            {
                imagePath: '/assets/images/testLatestPost1.png',
                categoryName: 'Blogs',
                title: 'How to Protect Your Car While Shipping It Across the Country',
                description: 'Shipping a car across the country means putting a lot of faith in your car shipper. You rely on the...',
                date: 'FEB 20, 2023',
                url: '/'
            }
        ],
        news: [
            {
                imagePath: '/assets/images/testLatestPost2.png',
                categoryName: 'News',
                title: 'Monster Trucks Take Over  Red Wing P Virginia Beach',
                description: 'Virginia Beach’s annual “Monsters on the Beach” event rides up to shore this weekend. Starting...',
                date: 'JAN 7, 2023',
                url: '/'
            },
            {
                imagePath: '/assets/images/testLatestPost2.png',
                categoryName: 'News',
                title: 'Cherry Blossom Season Peaks  Red Wing P At Red Wing Park',
                description: 'In spite of a recent freeze warning, cherry blossom trees are alive and well in Virginia...',
                date: 'JAN 7, 2023',
                url: '/'
            }
        ]
    };

    if(Number(width) <= 991) return null;

    return (
        <section className={classes.articlesSection}>
            <Container>
                <p className={classes.subTitle}>
                    Our Articles
                </p>
                <div className={classes.content}>
                    <div className={classes.blogs}>
                        <p className={classes.title}>LATEST BLOGS</p>
                        <div className={classes.flex}>
                            { latestPosts.blogs.map((post, index) => (
                                <PostCard key={index} {...post} />
                            ))}
                        </div>
                    </div>
                    <div className={classes.news}>
                        <p className={classes.title}>LATEST BLOGS</p>
                        <div className={classes.flex}>
                            { latestPosts.news.map((post, index) => (
                                <PostCard key={index} {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { Articles };