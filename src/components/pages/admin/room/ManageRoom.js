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
import { Link } from "react-router-dom";
import RoomService from "../../../../services/RoomService";

import axios from "axios";
import TheaterService from "../../../../services/TheaterService";

export default function ManageRoom() {
    const [deleteId, setDeleteId] = useState();
    const [roomId, setRoomId] = useState("");

    //khai bao nut edit va delete
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Link
                    style={{ width: "100px" }}
                    to={`/editRoom/${roomId}`}
                    // href={`/editTheater/${theaterId}`}
                >
                    <EditOutlined /> Chỉnh sửa
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <a style={{ width: "100px" }} onClick={() => deleteConfirm()}>
                    {" "}
                    <DeleteOutlined /> Xóa
                </a>
            ),
        },
    ];

    //khai bao ten column
    const columns = [
        {
            title: "#ID",
            width: 30,
            dataIndex: "roomId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Tên",
            width: 30,
            dataIndex: "roomName",
            key: 2,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        type="text"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            );
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
                return record.roomName
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: "Số lượng ghế",
            width: 50,
            dataIndex: "seatTotal",
            key: 3,
            fixed: "left",
        },
        {
            title: "Số hàng dọc",
            width: 50,
            dataIndex: "seatRowNumber",
            key: 4,
            fixed: "left",
        },
        {
            title: "Số hàng ngang",
            width: 50,
            dataIndex: "seatColumnNumber",
            key: 4,
            fixed: "left",
        },
        {
            title: "Rạp",
            width: 50,
            render: (record) => record.theater.theaterName,
            key: 4,
            fixed: "left",
        },
        {
            title: "Action",
            width: 50,
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

    //get gia tri id truoc khi delete/update
    const handleClick = (value) => {
        setRoomId(value.roomId);
    };

    //Confirm delete
    const deleteConfirm = () => {
        const id = roomId;
        Modal.confirm({
            title: "Are you sure to delete?",
            okText: "Delete",
            okType: "danger",
            onOk: () => {
                setDeleteId(id);
                console.log(id);
                RoomService.deleteRoom(id);
                getAllRoomAPI();
            },
            cancelText: "Cancel",
        });
    };
    const [room, setRoom] = useState([]);

    //lay danh sach phong
    const getAllRoomAPI = async () => {
        RoomService.getAllRoom()
            .then((data) => {
                setRoom(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllRoomAPI();
    }, [deleteId, room]);

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="fw-bold py-3 mb-4">
                        <span className="text-muted fw-light">
                            Phòng phim /
                        </span>
                        Danh sách phòng phim
                    </h4>
                    <Link
                        to="/createRoom"
                        className="btn btn btn-primary mb-3"
                        style={{ color: "white" }}
                    >
                        Thêm phòng
                    </Link>
                    <div className="card">
                        <h5 className="card-header">Danh sách phòng phim</h5>
                        <div className="table-responsive text-nowrap">
                            <Table
                                columns={columns}
                                dataSource={room}
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
