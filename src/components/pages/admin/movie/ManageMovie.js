import { useEffect, useState } from "react"
import { SearchOutlined, MoreOutlined } from '@ant-design/icons'
import { EditOutlined, DeleteOutlined, HomeTwoTone, ClockCircleOutlined, LoginOutlined, HomeOutlined, WalletOutlined, LogoutOutlined, CheckCircleOutlined, RadiusUprightOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Table, Input, Modal, Form, Row, Col, Card, Timeline, Tooltip, Select, notification, Button } from 'antd';
import { MenuProps, Dropdown, Space } from "antd";
import MovieService from "../../../../services/MovieService";
import { Link } from 'react-router-dom';

export default function ManageMovie() {

 
    const [movieId, setmMovieId] = useState("");

    //khai bao edit va delete button
    const items: MenuProps['items'] = [
        // {
        //     key: '1',
        //    label: (
        //         <Link style={{ width: "100px" }} to={`/editMovie/${movieId}`} 
        //         // href={`/editTheater/${theaterId}`}
        // >
        //           <EditOutlined /> Edit
        //         </Link>
        //    ),
        // },
        {
            key: '2',
            label: (
                <a style={{ width: '100px' }} onClick={() => deleteConfirm()}> <DeleteOutlined /> Delete</a>
            ),
        },
    ];


    //khai bao column
    const columns = [
        {
            title: '#ID',
            width: 50,
            dataIndex: 'movieId',
            key: 1,
            fixed: 'left',
        },
        {
            title: 'Ảnh',
            width: 50,
            dataIndex: 'imageUrl',
            key: 2,
            fixed: 'left',
            render: (avatar) => <img src={avatar} alt="Pic" width={70} height={120}/>
        },
        {
            title: 'Tên phim',
            width: 80,
            dataIndex: 'movieName',
            key: 3,
            fixed: 'left',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return <Input
                    autoFocus
                    type="text"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => { confirm() }}
                    onBlur={() => { confirm() }} ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.location.toLowerCase().includes(value.toLowerCase())
            },
        },
        {
            title: 'Thời Lượng',
            width: 30,
            dataIndex: 'duration',
            key: 4,
            fixed: 'left',
        },
        {
            title: 'Ngày Chiếu',
            width: 40,
            dataIndex: 'startDate',
            key: 5,
            fixed: 'left',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return <Input
                    autoFocus
                    type="date"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => { confirm() }}
                    onBlur={() => { confirm() }} ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.startDate.toLowerCase().includes(value.toLowerCase())
            },
        },
        {
            title: 'Ngày Kết',
            width: 40,
            dataIndex: 'endDate',
            key: 6,
            fixed: 'left',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return <Input
                    autoFocus
                    type="date"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => { confirm() }}
                    onBlur={() => { confirm() }} ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.endDate.toLowerCase().includes(value.toLowerCase())
            },
        },
        {
            title: 'Action',
            width: 40,
            key: 7,
            fixed: 'left',
            render: (record) => {
                return (
                    <>
                        {/*  */}
                        <Dropdown menu={{ items }} trigger={['click']} onClick = {() => handleClick(record)}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <MoreOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </>
                )
            }
        },
    ]

    useEffect(() => {
        getAllMovieAPI();
      })

    const [movies, setMovies] = useState([])
    //get all movie
    const getAllMovieAPI = async () => {
        MovieService.getAllMovie()
          .then((data) => {
            console.log(data)
            setMovies(data);
          })
          .catch((error) => {
            console.log(error);
          });

      };

     
    //get id
    const handleClick = (value) => {
        setmMovieId(value.movieId);
    }

    // const [editData, setEditData] = useState({
    //     editMovieID: '',
    //     editMovieImg: '',
    //     editMovieName: '',
    //     editDuration: '',
    //     editStartDate: '',
    //     editEndDate: '',
    // })


    // const setRecord = (record) => {
    //     setEditData({
    //         editMovieID: record.movieID,
    //         editMovieImg: record.image,
    //         editMovieName: record.movieName,
    //         editDuration: record.duration,
    //         editStartDate: record.startDate,
    //         editEndDate: record.editEndDate,
    //     })
    // }

    //Confirm delete
    const deleteConfirm = () => {
        const id = movieId;
        Modal.confirm({
            title: "Are you sure to delete?",
            okText: 'Delete',
            okType: "danger",
            onOk: () => {
                MovieService.deleteMovie(id);
                getAllMovieAPI();
 
            },
            cancelText: "Cancel",
        })
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="fw-bold py-3 mb-4">
                        <span className="text-muted fw-light">
                            Phim /
                        </span>
                        Danh sách phim
                    </h4>
                    <a
                        href="/createMovie"
                        className="btn btn btn-primary mb-3"
                        style={{ color: 'white' }}
                    >
                        Thêm Phim
                    </a>
                    <div className="card">
                        <h5 className="card-header">
                            Danh sách phim
                        </h5>
                        <div className="table-responsive text-nowrap">
                            <Table
                                columns={columns}
                                dataSource={movies}
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
    )
}