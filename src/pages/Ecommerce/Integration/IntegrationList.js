import { Container, Row, Col } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import TableCommonContainer from "../../../Components/Common/TableCommonContainer";
import React, { useMemo } from "react";

const IntegrationList = () => {
  const categoryColumns = useMemo(() => {
    let arr = [];
    arr.push({
      Header: "Name",
      Cell: (product) => {
        return product.row.original[0] || "";
      },
    });
    arr.push({
      Header: "URL",
      Cell: (product) => {
        return product.row.original[1] || "";
      },
    });
    arr.push({
      Header: "Client ID",
      Cell: (product) => {
        return product.row.original[2] || "";
      },
    });
    arr.push({
      Header: "Client Secret",
      Cell: (product) => {
        return product.row.original[3] || "";
      },
    });
    arr.push({
      Header: "Username",
      Cell: (product) => {
        return product.row.original[4] || "";
      },
    });
    arr.push({
      Header: "Password",
      Cell: (product) => {
        return product.row.original[5] || "";
      },
    });
    return arr;
  }, []);

  const PaymentArray = [
    [
      "dk",
      "http://localhost:3000",
      "hfihfiofhoif",
      "37ghgfhj",
      "dk12",
      "bsjbsjh@jkd",
    ],
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />
        <Container fluid>
          <BreadCrumb title="Integrations" pageTitle="" />
          <Row>
            <Col>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h4>Integrations List</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {PaymentArray && PaymentArray.length > 0 ? (
                      <TableCommonContainer
                        columns={categoryColumns}
                        data={PaymentArray || []}
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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default IntegrationList;
