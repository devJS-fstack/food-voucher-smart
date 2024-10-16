import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { classNames } from "../../utils/helper";

type Nav = {
    id: number;
    name: string;
    href: string;
    current: boolean;
};

const navigation: Nav[] = [
    { id: 1, name: "Food", href: "/", current: true },
    { id: 2, name: "Tripping", href: "/tripping", current: false },
    { id: 3, name: "Delivery", href: "/delivery", current: false },
    { id: 5, name: "Buy Me Coffee 🥰", href: "/signup", current: false },
];

function checkActiveNavbar(isActive: boolean, theme: any) {
    if (isActive && theme === "dark") {
        return "bg-slate-800 text-zinc-900 rounded-2xl";
    } else if (isActive && theme === "") {
        return "bg-white text-zinc-900 rounded-2xl";
    }
    return "text-zinc-900 hover:text-gray-400";
}

function checkActiveNavMobile(isActive: boolean, theme: any) {
    if (isActive && theme === "dark") {
        return "bg-slate-800 text-zinc-900";
    } else if (isActive && theme === "") {
        return "bg-white text-zinc-900";
    }
    return "text-zinc-900 hover:text-gray-400";
}

export default function Header(props: React.HTMLProps<HTMLDivElement>) {
    const [nav, setNav] = useState(navigation);

    const handleSwitchPage = (index: number) => {
        const stateNew: any = navigation.map((item, i) => {
            if (index === i) {
                item.current = true;
            } else item.current = false;
            return item;
        });
        setNav(stateNew);
    };
    const router = useRouter();
    const isAdmin = router.pathname.includes("administration");
    useEffect(() => {
        const navNew: any = navigation.map((item) => {
            if (router.route === item.href) item.current = true;
            else item.current = false;
            return item;
        });
        setNav(navNew);
    }, [router.route]);

    return (
        <div className={isAdmin ? "hidden" : ""}>
            <Head>
                <title>Food Voucher Smart</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" />
                <link rel="icon" href="man-working.svg" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700;1,1000&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Disclosure as="nav" className="bg-header">
                {({ open }: any) => (
                    <>
                        <div
                            className={`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`}
                        >
                            <div className="relative flex items-center justify-evenly h-20">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "var(--black-1)",
                                        }}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    >
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-custom flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                                    <Link
                                        href="/"
                                        className="flex-shrink-0 flex items-center"
                                    >
                                        <img
                                            className="lg:block h-8 w-64"
                                            src="smart_voucher_rs.png"
                                            alt="The Smart Voucher"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:block sm:ml-6 bg-nav">
                                    <div className="flex space-x-4 h-10 p-1">
                                        {nav.map((item, index) => (
                                            <Link
                                                href={item.href}
                                                key={item.id}
                                            >
                                                <a
                                                    key={item.id}
                                                    href={item.href}
                                                    onClick={() =>
                                                        handleSwitchPage(index)
                                                    }
                                                    className={classNames(
                                                        checkActiveNavbar(
                                                            item.current,
                                                            "",
                                                        ),
                                                        "px-3 pt-1 text-sm font-medium",
                                                        item.current || "false",
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item, index) => (
                                    <Link href={item.href} key={item.id}>
                                        <Disclosure.Button
                                            onClick={() => {
                                                handleSwitchPage(index);
                                            }}
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                checkActiveNavMobile(
                                                    item.current,
                                                    "",
                                                ),
                                                "block px-3 py-2 rounded-md text-base font-medium",
                                            )}
                                            aria-current={
                                                item.current
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
