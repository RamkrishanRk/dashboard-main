import React from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  Form,
} from "reactstrap";

// Redux
import { useSelector } from "react-redux";

import { useNavigate, Navigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = () => {
  document.title = "View Product | Abe's Website";

  const history = useNavigate();

  const { selectedItem, brand } = useSelector((state) => {
    return {
      selectedItem: state.Ecommerce.selectedItem,
      brand: state.Ecommerce.brand,
    };
  });
  // console.log(selectedItem, "selectedItem");
  let values = {};
  if (selectedItem != null) values = selectedItem.values;
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      identifier: "",
      enabled: true,
      family: "",
      categories: [],
      groups: [],
      parent: null,
      ...selectedItem,
      values: {
        Brand: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Product_Type: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Manufacturers_Warranty: [
          {
            locale: null,
            scope: null,
            data: [],
          },
        ],
        Price: [
          {
            locale: null,
            scope: null,
            data: [
              {
                amount: "",
                currency: "USD",
              },
            ],
          },
        ],
        List_Price: [
          {
            locale: null,
            scope: null,
            data: [
              {
                amount: "",
                currency: "USD",
              },
            ],
          },
        ],
        Image_1: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Image_2: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Image_3: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Video_1: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Product_Name: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Features: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Speficications: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Product_Description: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        Free_Shipping: [
          {
            locale: null,
            scope: null,
            data: "",
          },
        ],
        ...values,
      },
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required("please Enter a Product SKU"),
    }),
    onSubmit: (values) => {
      console.log("submit function");
    },
  });
  console.log(values, "valuesvalues");
  if (selectedItem == null) return <Navigate to={{ pathname: "/" }} />;

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="View Product" pageTitle="" />
        <Row>
          <Col md={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                history("/products");
                return true;
              }}
            >
              <Card style={{ height: "505px" }}>
                <CardBody>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4}></Col>
                    <Col sm={12} md={8} lg={12} xl={8} className="mb-3 mt-4">
                      <h4>
                        {validation.values.values.Product_Name !== undefined
                          ? validation.values.values.Product_Name[0].data || ""
                          : ""}
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={validation.values.image}
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={8} lg={8} xl={8}>
                      <div className="mb-3">
                        <Label className="form-label">Product SKU</Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product SKU"
                          name="identifier"
                          value={validation.values.identifier || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.name && validation.touched.name
                              ? true
                              : false
                          }
                          autoComplete="none"
                          readOnly
                        />
                        {/* {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                    ) : null} */}
                      </div>

                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Brand
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product Brand"
                          name="values.Brand[0].data"
                          value={
                            brand[validation.values.values.Brand[0].data] || ""
                          }
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.name && validation.touched.name
                              ? true
                              : false
                          }
                          autoComplete="none"
                          readOnly
                        />
                        {/* {validation.touched.status &&
                      validation.errors.status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.status}
                      </FormFeedback>
                    ) : null} */}
                      </div>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Product Type
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter product title"
                          name="values.Product_Type[0].data"
                          value={
                            validation.values.values.Product_Type[0].data || ""
                          }
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.name && validation.touched.name
                              ? true
                              : false
                          }
                          readOnly
                        />
                        {/* {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                    ) : null} */}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <BreadCrumb title="Shipping Section" pageTitle="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor=" Shipping-Method"
                              className="form-label"
                            >
                              Shipping Method
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Shipping Method"
                              value={values?.Shipping_Method?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping Weight"
                              className="form-label"
                            >
                              Shipping Weight
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Shipping Weight"
                              value={values?.Shipping_Weight?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Width"
                              className="form-label"
                            >
                              Shipping Width
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={values?.Shipping_Width?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Depth"
                              className="form-label"
                            >
                              Shipping Depth
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Shipping-Depth"
                              value={values?.Shipping_Depth?.[0]?.data}
                              placeholder="Shipping Depth"
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Height"
                              className="form-label"
                            >
                              Shipping Height
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Shipping-Height"
                              value={values?.Shipping_Method?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Freight-Class"
                              className="form-label"
                            >
                              Freight Class
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Freight-Class"
                              placeholder="Freight Class "
                              value={values?.Freight_Class?.[0]?.data}
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="readonlyInput"
                              className="form-label"
                            >
                              Shipping Cost
                            </Label>
                            <div className="form-icon">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Shipping Cost"
                              />
                            </div>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="iconrightInput"
                              className="form-label"
                            >
                              Additional Fee Name
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Additional Fee Name"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="iconrightInput"
                              className="form-label"
                            >
                              Additional Fee
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Additional Fee"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {/* <Col md={6}>
            <Row>
              <Col>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <BreadCrumb
                            title="Competition Section"
                            pageTitle=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3"></div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col> */}
          <Col md={12}>
            <Row>
              <Col>
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <BreadCrumb title="Pricing Section" pageTitle="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Pricing-Category"
                              className="form-label"
                            >
                              Pricing Category
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Pricing-Category"
                              placeholder="Pricing Category"
                              value={values?.Pricing_Category?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="Price" className="form-label">
                              Price
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Price"
                              placeholder="Price"
                              value={values?.Price?.[0]?.data?.[0]?.amount}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Profit-Margin"
                              className="form-label"
                            >
                              Profit Margin
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="Profit-Margin"
                              placeholder="Profit Margin"
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor=" List-Price" className="form-label">
                              List Price
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="List Price"
                              value={values?.List_Price?.[0]?.data?.[0]?.amount}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Shipping-Cost"
                              className="form-label"
                            >
                              Net Cost
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={values?.Net_Cost?.[0]?.data?.[0]?.amount}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor=" Map-Price" className="form-label">
                              Map Price
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Map Price"
                              value={values?.MAP_Price?.[0]?.data[0]?.amount}
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor=" Map-Policy" className="form-label">
                              Map Policy
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={values?.MAP_Policy?.[0]?.data}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Quarterly-Rebate"
                              className="form-label"
                            >
                              Quarterly Rebate
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control "
                                readOnly
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="Annual Rebate"
                              className="form-label"
                            >
                              Annual Rebate
                            </Label>
                            <div className="form-icon right">
                              <Input
                                type="text"
                                className="form-control "
                                placeholder="Annual Rebate"
                                readOnly
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
