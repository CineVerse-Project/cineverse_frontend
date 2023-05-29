import { useEffect, useState } from "react";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  HomeTwoTone,
  ClockCircleOutlined,
  LoginOutlined,
  HomeOutlined,
  WalletOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Table,
  Input,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Timeline,
  Tooltip,
  Select,
  notification,
  Button,
} from "antd";
import { MenuProps, Dropdown, Space } from "antd";
import TheaterService from "../../../../services/TheaterService";
import { object } from "yup";
import ProvinceService from "../../../../services/ProvinceService";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
//gia huy
import { Link } from 'react-router-dom';
export default function ManageTheater() {

  const [theaterId, setTheaterId] = useState("");
  
  //hien thi edit va delete khi click icon action
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link style={{ width: "100px" }} to={`/editTheater/${theaterId}`} 
        // href={`/editTheater/${theaterId}`}
>
          <EditOutlined /> Edit
        </Link>
      )
    },
    {
      key: "2",
      label: (
        <a style={{ width: "100px" }} onClick={() => deleteConfirm()}>
          {" "}
          <DeleteOutlined /> Delete
        </a>
      ),
    },
  ];

  //khai bao column cua table
  const columns = [
    {
      title: "#ID",
      width: 30,
      dataIndex: "theaterId",
      key: 1,
      fixed: "left",
    },
    {
      title: "Tên Rạp",
      width: 80,
      dataIndex: "theaterName",
      key: 2,
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            type="text"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        console.log(value);
        return record.theaterName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tỉnh",
      width: 50,
      render: (record) => record.province.provinceName,
      key: 3,
      fixed: "left",

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            type="text"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.location.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Địa chỉ",
      width: 150,
      dataIndex: "theaterAddress",
      key: 4,
      fixed: "left",
    },
    {
      title: "Action",
      width: 30,
      key: 5,
      fixed: "left",
      render: (record) => {
        return (
          <>
            {/*  */}
            <Dropdown
              menu={{ items }}
              trigger={["click"]}

              onClick={() => handleClick(record)}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];

  // get gia tri id truoc khi edit/delete
  const handleClick = (value) => {
    setTheaterId(value.theaterId);

  }

  
  const [editData, setEditData] = useState({
    editID: "",
    editName: "",
    editLocation: "",
    editAddress: "",
  });

  
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  //hiển thị thông tin rạp lên form edit
  const handleShowEdit = () => {
    setShowEdit(true);
  };


  //Confirm delete
  const deleteConfirm = () => {

    const id = theaterId;
    console.log(id)
    Modal.confirm({
      title: "Are you sure to delete?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        TheaterService.deleteTheater(id);
        console.log(id);
        setEditData(null);
      },
      onCancel: () => {
      }
    });
  };


  const [provinces, setProvince] = useState([]);
  const [theater, setTheater] = useState([]);

  // lay danh sach theater call api
  const getAllTheaterAPI = async () => {
    TheaterService.getAllTheater()
      .then((data) => {
        setTheater(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // goi useeEffect khi table theater thay doi
  useEffect(() => {
    getAllTheaterAPI();
  },[])

  // lay danh sach tinh thanh call api
  useEffect(() => {
    const getAllProvinceAPI = async () => {
      ProvinceService.getAllProvince()
        .then((data) => {
          setProvince(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllProvinceAPI();
  }, []);

  const [inputTinhThanh, setInputTinhThanh] = useState('');

  //nhan gia tri select option
  const handleChange = (value) => {
    setInputTinhThanh(value);
  }


  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Rạp chiếu /</span>
            Danh sách rạp phim
          </h4>
          <a
            href="/createTheater"
            className="btn btn btn-primary mb-3"
            style={{ color: "white" }}
          >
            Thêm rạp
          </a>
          <div className="card">
            <h5 className="card-header">Danh sách các rạp</h5>
            <div className="table-responsive text-nowrap">
              <Table
                columns={columns}
                dataSource={theater}
                scroll={{
                  x: 1000,
                  y: 600,
                }}
              />
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
}
