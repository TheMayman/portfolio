import Link from "next/link";
import InteractionYSplitter from "./InteractionYSplitter";
import FadeIn from "./FadeIn";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuFade from "./MenuFade";

const NavMenu = ({ setMenuOpen, menuOpen, buttonClicked, setButtonClicked }) => {
    const router = useRouter()
    const handleClose = () => {
        // setButtonClicked(true)
        setMenuOpen(false)
        document.body.classList.remove("no-scroll")
    }
    return (
        <MenuFade menuOpen={menuOpen} setMenuOpen={setMenuOpen} buttonClicked={buttonClicked}>
            <div className="_eleF nav-menu-container">
                <div className="img-container">
                    <Image
                        fill
                        src={'/images/burger-menu-mark.svg'}
                        alt="menu"
                    />
                </div>
                <FadeIn customClass={"header_side links"}>
                    <div className="__eleWrap">
                        <ul className="f a-c">
                            <li className="_eleX">
                                <Link
                                    href={"/"}
                                    className={`_y strong ${router.asPath == "/" && "active"
                                        }`}
                                    onClick={() => { handleClose() }}
                                >
                                    <InteractionYSplitter text={"Home"} />
                                </Link>
                            </li>
                            <li className="_eleX">
                                <Link
                                    href={"/pricing"}
                                    className={`_y strong ${router.asPath == "/pricing" && "active"
                                        }`}
                                    onClick={() => { handleClose() }}
                                >
                                    <InteractionYSplitter text={"Pricing"} />
                                </Link>
                            </li>
                            <li className="_eleX">
                                <Link
                                    href={"/faqs"}
                                    className={`_y strong ${router.asPath == "/faqs" && "active"
                                        }`}
                                    onClick={() => { handleClose() }}
                                >
                                    <InteractionYSplitter text={"FAQs"} />
                                </Link>
                            </li>
                            <li className="_eleX">
                                <Link
                                    href={"/blog"}
                                    className={`_y strong ${router.asPath.includes("/blog") && "active"
                                        }`}
                                    onClick={() => { handleClose() }}
                                >
                                    <InteractionYSplitter text={"Blog"} />
                                </Link>
                            </li>
                            <li className="_eleX">
                                <Link
                                    href={"/contact-us"}
                                    className={`_y strong ${router.asPath == "/contact-us" && "active"
                                        }`}
                                    onClick={() => { handleClose() }}
                                >
                                    <InteractionYSplitter text={"Contact us"} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </FadeIn>
                <FadeIn customClass={"header_side"}>
                    <div className={`icons-container __eleWrap`}>
                        <div className="icon _eleX">
                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_229_2172)">
                                    <path d="M12.8724 13.2505V13.25H12.8755V8.66563C12.8755 6.42292 12.3927 4.69531 9.77083 4.69531C8.51041 4.69531 7.66458 5.38698 7.31927 6.04271H7.28281V4.90469H4.79688V13.25H7.38541V9.11771C7.38541 8.02969 7.59166 6.97761 8.93906 6.97761C10.2667 6.97761 10.2865 8.21927 10.2865 9.1875V13.2505H12.8724Z" fill="#fff" />
                                    <path d="M0.582031 4.90625H3.1737V13.2516H0.582031V4.90625Z" fill="#fff" />
                                    <path d="M1.87604 0.75C1.0474 0.75 0.375 1.4224 0.375 2.25104C0.375 3.07969 1.0474 3.76615 1.87604 3.76615C2.70469 3.76615 3.37708 3.07969 3.37708 2.25104C3.37656 1.4224 2.70417 0.75 1.87604 0.75V0.75Z" fill="#fff" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_229_2172">
                                        <rect width="12.5" height="12.5" fill="white" transform="translate(0.375 0.75)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div className="icon _eleX">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_229_2190)">
                                    <path d="M15.023 2.83382C14.4922 3.06665 13.9267 3.22098 13.337 3.29591C13.9436 2.93373 14.4066 2.3646 14.6243 1.6786C14.0587 2.0158 13.4342 2.25398 12.7688 2.3869C12.2317 1.81509 11.4664 1.46094 10.6314 1.46094C9.01139 1.46094 7.7072 2.77584 7.7072 4.3878C7.7072 4.61973 7.72682 4.84275 7.77499 5.05506C5.34234 4.93641 3.18979 3.77049 1.74376 1.99439C1.4913 2.43239 1.34322 2.93373 1.34322 3.47343C1.34322 4.48681 1.86508 5.38512 2.64296 5.90519C2.17284 5.89627 1.71164 5.75979 1.32092 5.5448C1.32092 5.55372 1.32092 5.56532 1.32092 5.57692C1.32092 6.99886 2.3352 8.17995 3.66526 8.45203C3.42708 8.51715 3.16749 8.54838 2.89809 8.54838C2.71075 8.54838 2.52164 8.53767 2.34412 8.49842C2.72324 9.65721 3.79907 10.5091 5.07829 10.5368C4.08275 11.3156 2.81869 11.7848 1.45027 11.7848C1.2103 11.7848 0.980152 11.7741 0.75 11.7446C2.04617 12.5805 3.5823 13.0578 5.23886 13.0578C10.6234 13.0578 13.5672 8.59744 13.5672 4.73124C13.5672 4.60189 13.5627 4.477 13.5565 4.35301C14.1372 3.94087 14.6251 3.42615 15.023 2.83382Z" fill="#fff" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_229_2190">
                                        <rect width="14.273" height="14.273" fill="white" transform="translate(0.75 0.125)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div className="icon _eleX">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_229_2196)">
                                    <path d="M9.37266 2.9293H10.5709V0.842422C10.3641 0.813984 9.6532 0.75 8.82523 0.75C7.09766 0.75 5.91422 1.83664 5.91422 3.83383V5.67188H4.00781V8.00484H5.91422V13.875H8.25156V8.00539H10.0809L10.3712 5.67242H8.25102V4.06516C8.25156 3.39086 8.43312 2.9293 9.37266 2.9293Z" fill="#fff" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_229_2196">
                                        <rect width="13.125" height="13.125" fill="white" transform="translate(0.625 0.75)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </MenuFade>
    );
}

export default NavMenu
