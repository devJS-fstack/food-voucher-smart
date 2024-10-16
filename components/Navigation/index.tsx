import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Dispatch, SetStateAction } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
    FcBusinessman,
    FcCopyright,
    FcLinux,
    FcMindMap,
    FcMoneyTransfer,
    FcServices,
} from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { store } from "../../app/store";
import { delay } from "../../utils/helper";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: MenuClickEventHandler,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        label,
        onClick,
        children,
    } as MenuItem;
}

const NavigationAdmin = ({
    collapsed,
    setCollapsed,
    setPage,
    setIsLoading,
    refetchCountPlacedOrder,
    countPlacedOrder,
}: {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    setPage: Dispatch<SetStateAction<string>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    refetchCountPlacedOrder: any;
    countPlacedOrder?: number;
}) => {
    const router = useRouter();
    const handleChangePage = (key: string) => {
        setPage(key);
        refetchCountPlacedOrder();
    };
    const handleSignOut = () => {
        setIsLoading(true);
        delay(1000).then(() => {
            router.push("/");
        });
    };

    const items: MenuItem[] = [
        getItem("User", "1", <FcBusinessman />, () => {
            handleChangePage("user");
        }),
        getItem(
            "Service",
            "2",
            <FcServices />,
            (v) => {
                handleChangePage(v.key);
            },
            [
                getItem("Category", "category", <FcCopyright />),
                getItem("Product", "product", <FcLinux />),
                getItem("Topping", "topping", <FcMindMap />),
            ],
        ),
        getItem(
            <span className="flex justify-between items-center">
                Order
                <Badge count={countPlacedOrder} style={{ fontSize: 12 }} />
            </span>,
            "6",
            <FaShoppingCart />,
            () => {
                handleChangePage("order");
            },
        ),
        getItem("Voucher", "7", <FcMoneyTransfer />, () => {
            handleChangePage("voucher");
        }),
        getItem("Log Out", "8", <GrLogout />, () => handleSignOut()),
    ];
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            style={{ width: collapsed ? "79px" : "256px" }}
            className="relative"
        >
            <Menu
                className="h-screen relative"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
            <Button
                className="absolute"
                onClick={toggleCollapsed}
                style={{
                    bottom: 0,
                    left: 0,
                    backgroundColor: "var(--orange-1)",
                    width: "100%",
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
        </div>
    );
};

export default NavigationAdmin;
