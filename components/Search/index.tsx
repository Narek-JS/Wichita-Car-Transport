import { SearchIcon } from '@/public/assets/svgs/SearchIcon';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CloseIcon } from '@/public/assets/svgs/CloseIcon';
import { scrollIsArriveBottom } from '@/helper/search';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { useSearchMutation } from '@/store/search';
import { InputUI } from '@/components/ui/InputUI';
import { useDebounce } from '@/hooks/useDebounce';
import useWindowSize from '@/hooks/useWindowSize';
import classNames from 'classnames';
import Link from 'next/link';
import classes from './index.module.css';

export interface PostData {
    page: number;
    text: string;
};

type FindMessage = {
    slug: string;
    title: string; 
};

interface ApiResponse {
    pages: Array<FindMessage>;
    postByCategory: Array<FindMessage>;
    posts: Array<FindMessage>;
    empty?: boolean;
};

const Search = () => {
    const [ isOpen, setIsOpen ] = useState<Boolean>(false);
    const [ value, setValue ] = useState<string | null>(null);
    const [ page, setPage ] = useState<number>(1);
    const [ searchData, setSearchData ] = useState<Array<FindMessage>>([]);
    const { width } = useWindowSize();

    const dropDownRef = useRef<HTMLDivElement>(null);

    const debouncedSearchTerm = useDebounce<string>(value || '');
    const scrollPosition = useScrollPosition(dropDownRef);

    const [ search, { isLoading, data } ] = useSearchMutation();

    useEffect(() => {
        if(data !== undefined) {
            setSearchData([
                ...searchData,
                ...data.pages,
                ...data.postByCategory,
                ...data.posts
            ]);
        };
    }, [data]);

    useEffect(() => {
        const isArriveBottom = scrollIsArriveBottom(scrollPosition, dropDownRef.current!);
        if(isArriveBottom && !isLoading && !data?.empty) setPage(page + 1);
    }, [scrollPosition]);

    useEffect(() => mutateCall(true), [debouncedSearchTerm]);
    useEffect(() => mutateCall(), [page]);

    // Memo
    const findedLinks = useMemo<Array<JSX.Element>>(() => (
        searchData.map(({ slug, title }, index) => (
            <Link href={'/' + slug} key={index} dangerouslySetInnerHTML={{ __html: title.replaceAll(value!, `<span>${value}</span>`) }} />
        ))
    ), [searchData]);

    const isMobile = useMemo(() => Number(width) <= 768, [width]);

    // functions
    const toogleIsOpen = () => !isMobile && setIsOpen(!isOpen);
    const handleChange = ({ value }) => setValue(value);

    function mutateCall (intoIntitial: Boolean = false): void {
        if(intoIntitial) {
            setSearchData([]);
            setPage(1);
        };
        if(value !== null) {
            search({ page, text: debouncedSearchTerm });
        };
    };
    
    // JSX
    return (
        <div className={classes.wrapperSearch}>
            <div className={classNames(classes.input, {
                [classes.open]: isOpen,
                [classes.close]: !isOpen && !isMobile
            })}>
                <InputUI
                    classN='focusTransparent'
                    name={'search' + Math.random()}
                    placeholder='Search'
                    handleChange={handleChange}
                    defaultValue={value || ''}
                    height={Number(width) > 768 ? '38px' : '39px'}
                />
                <div
                    ref={dropDownRef}
                    className={classNames(classes.dropDown, {
                        [classes.dropDownEmpty]: !Boolean(findedLinks.length),
                        [classes.dropDownClose]: value === null || debouncedSearchTerm === ''
                    })}
                >
                    {Boolean(findedLinks.length) ? findedLinks : <p>Not result</p>}
                </div>
            </div>
            <div className={classes.seaech} onClick={toogleIsOpen}>
                { isLoading ? <LoadingUI type='roundSmall' /> : (
                    isOpen ? <CloseIcon height={32} width={32} /> : <SearchIcon />
                )}
            </div>
        </div>
    );
};

export { Search };