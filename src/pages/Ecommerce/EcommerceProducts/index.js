import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import "nouislider/distribute/nouislider.css";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
//Import actions
import {
  getProducts as onGetProducts,
  getTableColumns as onGetTableColumns,
  updateTableColumns as onUpdateTableColumns,
  getItems as onGetSelectedItem,
  getBrand as onGetBrand,
  updateProduct as onUpdateProduct,
} from "../../../store/ecommerce/action";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SingleOptions = [
  { value: "Watches", label: "Watches" },
  { value: "Headset", label: "Headset" },
  { value: "Sweatshirt", label: "Sweatshirt" },
  { value: "Furniture", label: "Furniture" },
  { value: "4 star", label: "4 star" },
];
const TabOptions = [
  { value: "All", label: "All" },
  { value: "published", label: "Published" },
  { value: "drafts", label: "Drafts" },
];

const EcommerceProducts = (props) => {
  const dispatch = useDispatch();

  const { products, tableColumns, curPage, brand } = useSelector((state) => {
    //console.log("state", state)
    return {
      products: state.Ecommerce.products,
      tableColumns: state.Ecommerce.tableColumns,
      curPage: state.Ecommerce.curPage,
      brand: state.Ecommerce.brand,
    };
  });
  console.log(products, "products");

  const [productList, setProductList] = useState([]);
  const [tableColumnOject, setTableColumns] = useState({});
  const [selectedMulti, setselectedMulti] = useState([]);
  const [selectedTab, setselectedTab] = useState(null);
  const [product, setProduct] = useState(null);
  const [modal, setModal] = useState(false);
  const [sel_get_state, setSelState] = useState(false);
  const [sel_thumbnail, setSelThumbnail] = useState(true);
  const [sel_sku, setSelSKU] = useState(true);
  const [sel_product_name, selProductName] = useState(false);
  const [sel_brand, selBrand] = useState(false);
  const [sel_vendor, selVendor] = useState(false);
  const [sel_pricing_category, selPricingCategory] = useState(false);
  const [sel_price, setPrice] = useState(false);
  const [sel_free_shipping, setFreeShipping] = useState(false);
  const [sel_list_price, setListPrice] = useState(false);
  const [sel_net_cost, setNetCost] = useState(false);
  const [sel_map_policy, setMapPolicy] = useState(false);
  const [sel_map_price, setMapPrice] = useState(false);
  const [sel_quarterly_rebates, setQuarterlyPrice] = useState(false);
  const [sel_annual_rebates, setAnnualRebates] = useState(false);
  const [sel_profit_margin, setProfitMargin] = useState(false);
  const [sel_fee_name, setFeeName] = useState(false);
  const [sel_fee_amount, setFeeAmount] = useState(false);
  const [sel_shipping_method, setShippingMethod] = useState(false);
  const [sel_shipping_weight, setShippingWeight] = useState(false);
  const [sel_shipping_width, setShippingWidth] = useState(false);
  const [sel_shipping_depth, setShippingDepth] = useState(false);
  const [sel_shipping_height, setShippingHeight] = useState(false);
  const [sel_freight_class, setFreightClass] = useState(false);
  const [tablePageSize, setTablePageSize] = useState(10);
  const [tableCurPage, setTableCurPage] = useState(1);
  const [curTimeout, setCurTimeout] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [productState, setProductState] = useState(undefined);
  function handleMulti(selectedOptions) {
    setselectedMulti(selectedOptions);
    if (selectedOptions.length > 0) {
      setProductList(
        products.filter(
          (product) =>
            selectedOptions.filter((opt) => opt.value === product.category)
              .length > 0 &&
            (selectedTab == null ||
              product.status === selectedTab.value ||
              selectedTab.value === "All")
        )
      );
    } else {
      setProductList(products);
    }
  }
  function handleTab(selectedOptions) {
    setselectedTab(selectedOptions);
    if (selectedOptions && selectedMulti.length > 0) {
      setProductList(
        products.filter(
          (product) =>
            (product.status === selectedOptions.value ||
              selectedOptions.value === "All") &&
            selectedMulti.filter((opt) => opt.value === product.category)
              .length > 0
        )
      );
    } else {
      setProductList(
        products.filter(
          (product) =>
            product.status === selectedOptions.value ||
            selectedOptions.value === "All"
        )
      );
    }
  }
  function handleDialogSave() {
    setModal(!modal);
    const tableColumnsObject = {
      thumbnail: sel_thumbnail,
      sku: sel_sku,
      productname: sel_product_name,
      brand: sel_brand,
      vendor: sel_vendor,
      pricingcategory: sel_pricing_category,
      price: sel_price,
      freeshipping: sel_free_shipping,
      listprice: sel_list_price,
      netcost: sel_net_cost,
      mappolicy: sel_map_policy,
      mapprice: sel_map_price,
      quarterlyrebate: sel_quarterly_rebates,
      annualrebate: sel_annual_rebates,
      profitmargin: sel_profit_margin,
      feename: sel_fee_name,
      feeamount: sel_fee_amount,
      shippingmethod: sel_shipping_method,
      shippingweight: sel_shipping_weight,
      shippingwidth: sel_shipping_width,
      shippingdepth: sel_shipping_depth,
      shippingheight: sel_shipping_height,
      freightclass: sel_freight_class,
    };
    //console.log(tableColumnsObject);
    dispatch(onUpdateTableColumns(tableColumnsObject));
    //console.log("store", tableColumns)
  }
  function handleDialogClose() {
    setModal(!modal);
    if (!isEmpty(tableColumns)) {
      const {
        thumbnail,
        sku,
        productname,
        brand,
        vendor,
        pricingcategory,
        price,
        freeshipping,
        listprice,
        netcost,
        mappolicy,
        mapprice,
        quarterlyrebate,
        annualrebate,
        profitmargin,
        feename,
        feeamount,
        shippingmethod,
        shippingweight,
        shippingwidth,
        shippingdepth,
        shippingheight,
        freightclass,
      } = tableColumns;
      setSelThumbnail(thumbnail);
      setSelSKU(sku);
      selProductName(productname);
      selBrand(brand);
      selVendor(vendor);
      selPricingCategory(pricingcategory);
      setPrice(price);
      setFreeShipping(freeshipping);
      setListPrice(listprice);
      setNetCost(netcost);
      setMapPolicy(mappolicy);
      setMapPrice(mapprice);
      setQuarterlyPrice(quarterlyrebate);
      setAnnualRebates(annualrebate);
      setProfitMargin(profitmargin);
      setFeeName(feename);
      setFeeAmount(feeamount);
      setShippingMethod(shippingmethod);
      setShippingWeight(shippingweight);
      setShippingWidth(shippingwidth);
      setShippingDepth(shippingdepth);
      setShippingHeight(shippingheight);
      setFreightClass(freightclass);
    }
  }
  function handleSelectPageSize(nSize) {
    //console.log("PageSize", nSize);
    setTablePageSize(nSize);
    setTableCurPage(1);
    dispatch(
      onGetProducts({
        page: 1,
        limit: nSize,
        search: searchKey,
        enabled: productState,
      })
    );
  }
  function handleChangePage(nPage) {
    // console.log("nPage", nPage);
    setTableCurPage(nPage);
    dispatch(
      onGetProducts({
        page: nPage,
        limit: tablePageSize,
        search: searchKey,
        enabled: productState,
      })
    );
  }
  useEffect(() => {
    if (isEmpty(brand)) {
      dispatch(onGetBrand());
    }
  }, [dispatch, brand]);
  useEffect(() => {
    //console.log("products", products);
    if (products && !products.length) {
      setTableCurPage(1);
      dispatch(
        onGetProducts({
          page: 1,
          limit: tablePageSize,
          search: searchKey,
          enabled: productState,
        })
      );
    }
  }, [dispatch, products, tableCurPage, tablePageSize, searchKey]);

  useEffect(() => {
    if (isEmpty(tableColumns)) {
      //console.log("tableColumns", tableColumns);
      dispatch(onGetTableColumns());
    }
  }, [dispatch, tableColumns]);

  useEffect(() => {
    if (!sel_get_state && !isEmpty(tableColumns)) {
      setSelState(true);
      //console.log("get columns state", tableColumns);
      const {
        thumbnail,
        sku,
        productname,
        brand,
        vendor,
        pricingcategory,
        price,
        freeshipping,
        listprice,
        netcost,
        mappolicy,
        mapprice,
        quarterlyrebate,
        annualrebate,
        profitmargin,
        feename,
        feeamount,
        shippingmethod,
        shippingweight,
        shippingwidth,
        shippingdepth,
        shippingheight,
        freightclass,
      } = tableColumns;
      setSelThumbnail(thumbnail);
      setSelSKU(sku);
      selProductName(productname);
      selBrand(brand);
      selVendor(vendor);
      selPricingCategory(pricingcategory);
      setPrice(price);
      setFreeShipping(freeshipping);
      setListPrice(listprice);
      setNetCost(netcost);
      setMapPolicy(mappolicy);
      setMapPrice(mapprice);
      setQuarterlyPrice(quarterlyrebate);
      setAnnualRebates(annualrebate);
      setProfitMargin(profitmargin);
      setFeeName(feename);
      setFeeAmount(feeamount);
      setShippingMethod(shippingmethod);
      setShippingWeight(shippingweight);
      setShippingWidth(shippingwidth);
      setShippingDepth(shippingdepth);
      setShippingHeight(shippingheight);
      setFreightClass(freightclass);
    }
  }, [tableColumns, sel_get_state]);
  useEffect(() => {
    setProductList(products);
  }, [products]);
  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const onClickDelete = (product) => {
    setProduct(product);
    setDeleteModal(true);
  };

  // Displat Delete Button
  const [dele, setDele] = useState(0);
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
  };
  const columns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "#",
      Cell: (cell) => {
        return (
          <input type="checkbox" className="productCheckBox form-check-input" />
        );
      },
    });
    sel_thumbnail &&
      arr.push({
        Header: "Thumbnail",
        Cell: (product) => {
          //console.log("image", product);
          const { image, token } = product.row.original;
          let imgUrl = { img: "" };
          // axios.get(`http://localhost:3000${image}`, {
          //   responseType: "blob",
          //   headers: {
          //     Authorization: `Bearer ${token}`
          //   }
          // })
          //   .then(response => {
          //     const reader = new FileReader();
          //     reader.readAsDataURL(response.data);
          //     reader.onload = () => {
          //       imgUrl = { image }
          //       //console.log("image Loaded", imgUrl)
          //     };
          //   })
          //   .catch(error => {
          //     console.error("Error fetching image:", error);
          //   });
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm bg-transparent rounded p-1">
                    <img
                      src={`${image}`}
                      alt=""
                      className="img-fluid d-block"
                    />
                  </div>
                </div>
              </div>
            </>
          );
        },
      });
    sel_sku &&
      arr.push({
        Header: "SKU",
        accessor: "identifier",
        filterable: false,
      });
    sel_product_name &&
      arr.push({
        Header: "Product Name",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Product_Name } = values;
          if (Product_Name && Product_Name.length > 0) {
            const { data } = Product_Name[0];
            return data;
          } else return "";
        },
      });
    // arr.push({
    //   Header: "State",
    //   Cell: (product) => {
    //     if (product.row.original.enabled === true)
    //       return (
    //         <>
    //           <button className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(onUpdateProduct({ identifier: product.row.original.identifier, enabled: false })) }}>Enable</button>
    //         </>
    //       )
    //     else
    //       return (
    //         <>
    //           <button className="btn btn-danger btn-sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(onUpdateProduct({ identifier: product.row.original.identifier, enabled: true })) }}>Disable</button>
    //         </>
    //       )
    //   },
    // })
    sel_brand &&
      arr.push({
        Header: "Brand",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Brand } = values;
          if (Brand && Brand.length > 0) {
            const { data } = Brand[0];
            return brand[data];
          } else return "";
        },
      });
    sel_price &&
      arr.push({
        Header: "Price",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Price } = values;
          if (Price && Price.length > 0) {
            const { data } = Price[0];
            const { amount, currency } = data[0];
            const num = Number(amount);
            const formattedNum = num.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            if (currency === "USD") return "$" + formattedNum;
            return amount + currency;
          } else return "";
        },
      });
    sel_pricing_category &&
      arr.push({
        Header: "Pricing Category",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Pricing_Category } = values;
          if (Pricing_Category && Pricing_Category.length) {
            const { data } = Pricing_Category[0];
            return data;
          } else return "";
        },
      });
    sel_free_shipping &&
      arr.push({
        Header: "Free Shiping",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Free_Shipping } = values;
          if (Free_Shipping && Free_Shipping.length > 0) {
            const { data } = Free_Shipping[0];
            if (data) return "yes";
            else return "no";
          } else return "no";
        },
      });
    sel_list_price &&
      arr.push({
        Header: "List Price",
        Cell: (product) => {
          const { values } = product.row.original;
          const { List_Price } = values;
          if (List_Price && List_Price.length > 0) {
            const { data } = List_Price[0];
            const { amount, currency } = data[0];
            const num = Number(amount);
            const formattedNum = num.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            if (currency === "USD") return "$" + formattedNum;
            return amount + currency;
          } else return "";
        },
      });
    sel_net_cost &&
      arr.push({
        Header: "Net Cost",
        Cell: (product) => {
          const { values } = product.row.original;
          const { Net_Cost } = values;
          if (Net_Cost && Net_Cost.length > 0) {
            const { data } = Net_Cost[0];
            const { amount, currency } = data[0];
            const num = Number(amount);
            const formattedNum = num.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            if (currency === "USD") return "$" + formattedNum;
            return amount + currency;
          } else return "";
        },
      });
    sel_map_policy &&
      arr.push({
        Header: "Map Policy",
        accessor: "map-policy",
        filterable: false,
      });
    sel_map_price &&
      arr.push({
        Header: "Map Price",
        accessor: "map-price",
        filterable: false,
      });
    sel_shipping_method &&
      arr.push({
        Header: "Shipping Method",
        accessor: "shipping-method",
        filterable: false,
      });
    sel_shipping_weight &&
      arr.push({
        Header: "Shipping Weight",
        accessor: "shipping-weight",
        filterable: false,
      });
    sel_freight_class &&
      arr.push({
        Header: "Freight Class",
        accessor: "freight-class",
        filterable: false,
      });
    return arr;
  }, [
    sel_thumbnail,
    sel_sku,
    sel_product_name,
    sel_brand,
    sel_pricing_category,
    sel_free_shipping,
    sel_list_price,
    sel_net_cost,
    sel_map_policy,
    sel_map_price,
    sel_shipping_method,
    sel_shipping_weight,
    sel_freight_class,
    sel_price,
    brand,
    dispatch,
  ]);
  const togglemodal = () => {
    setModal(!modal);
  };
  document.title = "Products";

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Products" pageTitle="" />
          <Row>
            <div className="col-xl-12 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex mb-3">
                      <div className="flex-grow-1">
                        <div className="search-box me-2 mb-2 d-inline-block">
                          <input
                            onChange={(e) => {
                              // setValue(e.target.value);
                              // onChange(e.target.value);
                              clearTimeout(curTimeout);
                              const timeout = setTimeout(() => {
                                console.log(e.target.value);
                                setTableCurPage(1);
                                dispatch(
                                  onGetProducts({
                                    page: 1,
                                    limit: tablePageSize,
                                    search: e.target.value,
                                    enabled: productState,
                                  })
                                );
                                setSearchKey(e.target.value);
                              }, 1000);
                              setCurTimeout(timeout);
                            }}
                            id="search-bar-0"
                            type="text"
                            className="form-control search /"
                            placeholder="Search Product..."
                            //value={value || ""}
                          />
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
                        {/* <Link to="/add-product" className="text-decoration-underline">
                          Add New Product
                        </Link> */}
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(
                              onGetProducts({
                                page: tableCurPage,
                                limit: tablePageSize,
                                search: searchKey,
                                enabled: true,
                              })
                            );
                            setProductState(true);
                          }}
                        >
                          Import/Update
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={togglemodal}
                        >
                          Edit Columns
                        </button>
                      </div>
                    </div>
                    <div className="row align-items-center border-0 d-flex justify-content-between">
                      <div className="filter-choices-input col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <Select
                          value={selectedMulti}
                          isMulti={true}
                          onChange={handleMulti}
                          options={SingleOptions}
                        />
                      </div>

                      <div className="filter-choices-input col-xl-2 col-lg-3 col-md-3 col-sm-6">
                        <Select
                          value={selectedTab}
                          isMulti={false}
                          onChange={handleTab}
                          options={TabOptions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {productList && productList.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={products || []}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        isAddOptions={false}
                        isGlobalSearch={true}
                        customPageSize={10}
                        divClass="table-responsive mb-1"
                        tableClass="mb-0 align-middle table-borderless"
                        theadClass="table-light text-muted"
                        isProductsFilter={true}
                        SearchPlaceholder="Search Product..."
                        handleSelectPageSize={handleSelectPageSize}
                        handleChangePage={handleChangePage}
                        hover={true}
                      />
                    ) : (
                      <div className="py-4 text-center">
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#0ab39c"
                            style={{ width: "72px", height: "72px" }}
                          ></lord-icon>
                        </div>

                        <div className="mt-4">
                          <h5>Sorry! No Result Found</h5>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      {/* modal Add Address */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            handleDialogClose();
          }}
        ></ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_thumbnail"
                  checked={sel_thumbnail}
                  onClick={() => setSelThumbnail(!sel_thumbnail)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_thumbnail">
                  Thumbnail
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_sku"
                  checked={sel_sku}
                  onClick={() => setSelSKU(!sel_sku)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_sku">
                  SKU
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_product_name"
                  checked={sel_product_name}
                  onClick={() => selProductName(!sel_product_name)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_product_name">
                  Product Name
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_brand"
                  checked={sel_brand}
                  onClick={() => selBrand(!sel_brand)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_brand">
                  Brand
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_vendor"
                  checked={sel_vendor}
                  onClick={() => selVendor(!sel_vendor)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_vendor">
                  Vendor
                </Label>
              </div>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_price_category"
                  checked={sel_pricing_category}
                  onClick={() => selPricingCategory(!sel_pricing_category)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_price_category"
                >
                  Price Category
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_price"
                  checked={sel_price}
                  onClick={() => setPrice(!sel_price)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_price">
                  Price
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_free_shipping"
                  checked={sel_free_shipping}
                  onClick={() => setFreeShipping(!sel_free_shipping)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_free_shipping">
                  Free Shipping
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_list_price"
                  checked={sel_list_price}
                  onClick={() => setListPrice(!sel_list_price)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_list_price">
                  List Price
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_net_cost"
                  checked={sel_net_cost}
                  onClick={() => setNetCost(!sel_net_cost)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_net_cost">
                  Net Cost
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_map_policy"
                  checked={sel_map_policy}
                  onClick={() => setMapPolicy(!sel_map_policy)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_map_policy">
                  Map Policy
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_map_price"
                  checked={sel_map_price}
                  onClick={() => setMapPrice(!sel_map_price)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_map_price">
                  Map Price
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_quarterly_rebate"
                  checked={sel_quarterly_rebates}
                  onClick={() => setQuarterlyPrice(!sel_quarterly_rebates)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_quarterly_rebate"
                >
                  Quaterly Rebates
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_annual_rebates"
                  checked={sel_annual_rebates}
                  onClick={() => setAnnualRebates(!sel_annual_rebates)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_annual_rebates"
                >
                  Annual Rebates
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_profit_margin"
                  checked={sel_profit_margin}
                  onClick={() => setProfitMargin(!sel_profit_margin)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_profit_margin">
                  Profit Margin
                </Label>
              </div>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value={true}
                  id="sel_fee_name"
                  checked={sel_fee_name}
                  onClick={() => setFeeName(!sel_fee_name)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_fee_name">
                  Fee Name
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_fee_amount"
                  checked={sel_fee_amount}
                  onClick={() => setFeeAmount(!sel_fee_amount)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_fee_amount">
                  Fee Amount
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_shipping_method"
                  checked={sel_shipping_method}
                  onClick={() => setShippingMethod(!sel_shipping_method)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_shipping_method"
                >
                  Shipping Method
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_shipping_weight"
                  checked={sel_shipping_weight}
                  onClick={() => setShippingWeight(!sel_shipping_weight)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_shipping_weight"
                >
                  Shipping Weight
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_shipping_width"
                  checked={sel_shipping_width}
                  onClick={() => setShippingWidth(!sel_shipping_width)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_shipping_width"
                >
                  Shipping Width
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_shipping_depth"
                  checked={sel_shipping_depth}
                  onClick={() => setShippingDepth(!sel_shipping_depth)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_shipping_depth"
                >
                  Shipping Depth
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_shipping_height"
                  checked={sel_shipping_height}
                  onClick={() => setShippingHeight(!sel_shipping_height)}
                  onChange={() => {}}
                />
                <Label
                  className="form-check-label"
                  htmlFor="sel_shipping_height"
                >
                  Shipping Height
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="sel_freight_class"
                  checked={sel_freight_class}
                  onClick={() => setFreightClass(!sel_freight_class)}
                  onChange={() => {}}
                />
                <Label className="form-check-label" htmlFor="sel_freight_class">
                  Freight Class
                </Label>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              handleDialogClose();
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleDialogSave();
            }}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default EcommerceProducts;
