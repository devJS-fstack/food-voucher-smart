import { Empty, Pagination, Spin } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ADD_CART_BTN } from "../../utils/variable";
import { useRouter } from "next/router";
import NoData from "../NoData";
import { categories } from "../../mock/category";
import { products } from "../../mock/product";
import { Tabs, Tab } from "@mui/material";

const platforms = [
    {
        id: 1,
        title: "",
        logo: "shopee-food.png",
    },
    {
        id: 2,
        title: "",
        logo: "grab-food.png",
    },
    {
        id: 3,
        title: "",
        logo: "be-food-2.png",
    },
];

const CategoryProduct = () => {
    const router = useRouter();
    const [categoryCurr, setCategoryCurr] = useState<null | number>(1);
    const [pageNumber, setPageNumber] = useState(1);
    const isLoadingCategory = false;
    const total = products.length;

    const handleOnClickCategory = (id: number) => {
        setCategoryCurr(id);
    };
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="container-lg container-fluid">
            <div className="tch-box__body">
                <ul className="tch-category-card-list tch-category-card-list--spacing flex justify-content-md-center flex-xl-wrap flex-lg-wrap border-0">
                    {!isLoadingCategory ? (
                        (platforms ?? []).map((platform) => (
                            <li
                                className="ml-2"
                                key={platform.id}
                                onClick={(e) => {
                                    handleOnClickCategory(platform.id);
                                }}
                            >
                                <a
                                    className={`nav-link nav-link-category m-0 border-0`}
                                >
                                    <div className="tch-category-card flex flex-col">
                                        <div className="flex justify-center items-center tch-category-card__image tch-category-card--circle">
                                            <img src={platform.logo} />
                                        </div>
                                        <div className="tch-category-card__content">
                                            <h5 className="tch-category-card__title text-center mb-0">
                                                {platform.title}
                                            </h5>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    ) : (
                        <Spin />
                    )}
                </ul>
                <div className="menu-restaurant-container">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        className="menu-restaurant-category"
                    >
                        {categories.map((category) => (
                            <Tab
                                className="max-w-none menu-restaurant-category-item"
                                key={category.id}
                                label={
                                    <span
                                        title={category.nameCategory.toUpperCase()}
                                    >
                                        {category.nameCategory}
                                    </span>
                                }
                            />
                        ))}
                    </Tabs>

                    <div className="tab-content">
                        <div>
                            <div
                                className="row mb-4 mb-lg-5"
                                style={{
                                    justifyContent: products?.length
                                        ? ""
                                        : "center",
                                }}
                            >
                                {products?.length ? (
                                    (products || []).map((product) => (
                                        <div
                                            className="col-12 col-md-6 col-lg-3 col-xl-4 mt-2 mt-lg-3"
                                            key={product.id}
                                        >
                                            <div>
                                                <div className="tch-product__card flex flex-lg-column ml-0">
                                                    <div className="tch-product__image tch-product--lg__image tch-product-img-border">
                                                        <img
                                                            className="cursor-pointer"
                                                            style={{
                                                                maxHeight: 163,
                                                            }}
                                                            src={
                                                                product.favIcon
                                                            }
                                                        />
                                                    </div>
                                                    <div className="tch-product__content tch-product__content--mobile-padding flex flex-col">
                                                        <div className="tch-product__content__top mb-1 mb-lg-3 cursor-pointer">
                                                            <h4 className="tch-product-content__title mb-0">
                                                                {
                                                                    product.nameProduct
                                                                }
                                                            </h4>
                                                        </div>
                                                        <div className="tch-product__content__footer flex justify-between items-center mt-auto">
                                                            <p className="mb-0">
                                                                <span className="block">
                                                                    {
                                                                        product.price
                                                                    }{" "}
                                                                    $
                                                                </span>
                                                            </p>
                                                            <div className="btn btn--orange-1 add-to-cart p-0">
                                                                <img
                                                                    src={
                                                                        ADD_CART_BTN
                                                                    }
                                                                    style={{
                                                                        maxWidth:
                                                                            "none",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <NoData title="No product are available" />
                                )}
                            </div>
                        </div>
                        {total ? (
                            <Pagination
                                // onChange={(page) => {
                                //     handleOnChangePage(page);
                                // }}
                                current={pageNumber}
                                style={{ textAlign: "center" }}
                                total={total}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
