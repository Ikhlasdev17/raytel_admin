import { Button, message, Modal, Spin, Table } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { baseURL } from '../../assets/api/api'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setloading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [selectedItem, setSelectedItem] = useState({
        name: ''
    });
    const [uploading,setUploading ] = useState(false)

    useEffect(() => {
        setloading(true)
        axios.get(`https://raytel.uz/api/categories`)
        .then(res => {
            setCategories(res.data)
        })
        .finally(() => setloading(false))
    }, [refresh])
    
    useEffect(() => {
        if (modalType === 'add') {
            setCategoryName('')
        } else {
            setCategoryName(selectedItem?.name)
        }
    }, [modalIsOpen])


    // send category
    const saveCategory = () => {
        setUploading(true)
        if (modalType === 'add') {
            axios.post(`${baseURL}/api/categories`, {
                parent_id: 0,
                name: categoryName
            }, {
                headers: {
                    "Authorization": 'Bearer '+ localStorage.getItem('token')
                }
            })
            .then(res => {
                setRefresh(!refresh)
                message.success('Muvaffaqiyatli qoshildi')
            })
            .catch(err => message.error('Malumot kiritishda xatolik!'))
            .finally(() => {
                setModalIsOpen(false)
                setCategoryName('')
                setUploading(false)
            })
        } else {
            axios.patch(`${baseURL}/api/categories/${selectedItem.id}`, {
                parent_id: 0,
                name: categoryName
            }, {
                headers: {
                    "Authorization": 'Bearer '+ localStorage.getItem('token')
                }
            })
            .then(res => {
                setRefresh(!refresh)
                message.success('Muvaffaqiyatli yangilandi')
            })
            .catch(err => message.error('Malumot kiritishda xatolik!'))
            .finally(() => {
                setModalIsOpen(false)
                setCategoryName('')
                setUploading(false)
            })
        }
    }

    // delete 
    const deleteItem = (id) => {
        axios.delete(`${baseURL}/api/categories/${id}`, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setRefresh(!refresh)
            message.success(`Muvaffaqiyatli o'chirildi`)
        })
        .catch(err => message.error('Xatolik yuz berdi'))
    }


    const dataSource = []
    categories?.map((item) => {
        dataSource?.push({
            key: item?.id,
            name: item?.name,
            action: (
                <Button.Group>
                <Button
                    size='small'
                    type='primary'
                    onClick={e => {
                        setSelectedItem(item)
                        setModalIsOpen(true)
                        setModalIsOpen('update')
                    }}
                >
                    <i className='bx bx-edit'></i>
                </Button>
                <Button
                    onClick={e =>{
                         deleteItem(item?.id)
                    }}
                    size='small'
                    type='primary'
                >
                    <i className='bx bx-trash'></i>
                </Button>
                </Button.Group>
            )
        })
    })


    const columns = [
        {
            title: 'Kategoriya nomi',
            dataIndex: 'name',
            key: 'name',
            width: '80%'
          }, {
            title: 'Harakat',
            dataIndex: 'action',
            key: 'key',
          },
    ]

  return (
    <div >
        <Modal
            visible={modalIsOpen}
            onCancel={() => setModalIsOpen(false)}
            footer={null}
            title={modalType === 'add' ? 'Kategoriya qoshish' : 'Kategoriyani tahrirlash'}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                saveCategory()}}>
                <label className="form-label" required>
                    <span className='form-label__text'>Kategoriya nomini kiriting</span>
                    <input onChange={e => setCategoryName(e.target.value)} value={categoryName} required className='form-control' placeholder='Kategoriya nomini kiriting' />
                </label>
                <Button 
                    type='primary'
                    className='w-full'
                    htmlType="submit"
                    loading={uploading}
                >
                    Saqlash
                </Button>
            </form>
        </Modal>
        <h1 className='heading'>Kategoriyalar</h1>
        <div className="px-4 py-9 bg-white rounded-10 mt-6 overflow-y-auto w-full">
            <div className="content-top flex justify-between">
                <div></div>
                <Button
                    type="primary"
                    onClick={() => {
                        setModalIsOpen(true)
                        setModalType('add')
                    }}
                >
                    Kategoriya qoshish
                </Button>
            </div>

            {/* MAIN TABLE */}
            <Spin spinning={loading}>
            <Table dataSource={dataSource} columns={columns} />
            </Spin>
        </div>
    </div>
  )
}

export default Categories