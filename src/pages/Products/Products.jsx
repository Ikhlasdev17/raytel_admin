import { Button, message, Modal, Popconfirm, Select, Spin, Table } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { baseURL } from '../../assets/api/api'

const Products = () => {
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [refresh, setRefresh] = useState(false) 
    const [uploading,setUploading ] = useState(false)
    const [categories, setCategories] = useState([])
    const [imageUploading, setImageUploading] = useState(false)
    const [newproduct, setNewProduct] = useState({
        category_id: 2,
        name: "",
        images: [],
        first_price: null,
        second_price: null,
        discount: null,
        description: "",
        size: [],
        color: []
    })
    const [sizes, setSizes] = useState('')
    const [colors, setColors] = useState('')
    const [selectedItem, setSelecteditem] = useState({
        category_id: 2,
        name: "",
        images: [],
        first_price: null,
        second_price: null,
        discount: null,
        description: "",
        size: [],
        color: []
    })

    useEffect(() => {
        setloading(true)
        axios.get(`https://raytel.uz/api/products/guest`)
        .then(res => {
            setproducts(res.data.data)
        })
        .finally(() => setloading(false))
    }, [refresh])

    useEffect(() => {
        axios.get(`https://raytel.uz/api/categories`)
        .then(res => {
            setCategories(res.data)
        })
    }, [])

    useEffect(() => {
        if (modalType === 'add') {
            setNewProduct({
                category_id: categories[0]?.id,
                name: "",
                images: [],
                first_price: null,
                second_price: null,
                discount: null,
                description: "",
                size: [],
                color: []
            })
        } else {
            setNewProduct({
                category_id: selectedItem?.category?.id,
                name: selectedItem?.name,
                images: selectedItem?.images || [],
                first_price: selectedItem?.first_price,
                second_price: selectedItem?.second_price,
                discount: selectedItem?.discount,
                description: selectedItem?.description,
                size: selectedItem?.size || [],
                color: selectedItem?.color || []
            })
            setSizes(selectedItem?.size.join(','))
            setColors(selectedItem?.color.join(','))
        }
    },[modalIsOpen, modalType])
    
    const deleteProduct = (id) => {
        axios.delete(`${baseURL}/api/products/${id}`, {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => {
            message.success(`Mahsulot muvaffaqiyatli o'chirildi!`)
            setRefresh(!refresh)
        })
        .catch(err => message.error(`Malumotni o'chirishda xatolik!`))

    }
    
    const imageUpload = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', "smart-shop")


        axios.post("https://api.cloudinary.com/v1_1/http-electro-life-texnopos-site/image/upload", formData).then(res => {
            setNewProduct(prev => ({...newproduct, images: [...prev.images, res.data.secure_url]}))
        })
    }

   const saveProduct = () => {
        if (modalType === 'add') {
            axios.post(`${baseURL}/api/products`, {
                ...newproduct,
                color: colors.split(','),
                size: sizes.split(',')
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            .then(res => {
                message.success('Mahsulot muvaffaqiyatli yaratildi!')
                setRefresh(!refresh)
            })
            .catch(err => message.error('Malumot kiritishda xatolik'))
            .finally(() => setModalIsOpen(false))
        } else {
            axios.patch(`${baseURL}/api/products/${selectedItem?.id}`,{
                ...newproduct,
                color: colors.split(','),
                size: sizes.split(',')
            },{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            .then(res => {
                message.success('Mahsulot muvaffaqiyatli yangilandi!')
                setRefresh(!refresh)
            })
            .catch(err => message.error('Malumot yangilashda xatolik'))
            .finally(() => setModalIsOpen(false))
        }
   }

    const dataSource = []
    products?.map((item) => {
        dataSource?.push({
            key: item?.id,
            name: item?.name,
            action: (
                <Button.Group>
                <Button
                    size='small'
                    type='primary'
                    onClick={e => { 
                        setModalIsOpen(true)
                        setModalType('update')
                        setSelecteditem(item)
                    }}
                >
                    <i className='bx bx-edit'></i>
                </Button>
                <Popconfirm
                    title="Mahsulotni o'chirmoqchimisiz?"
                    onConfirm={() => deleteProduct(item?.id)}
                    okText="Xa"
                    cancelText="Yo'q"
                >
                    <Button
                    size='small'
                    type='primary'
                >
                    <i className='bx bx-trash'></i>
                </Button>
                </Popconfirm>
                
                </Button.Group>
            )
        })
    })


    const columns = [
        {
            title: 'Mahsulot nomi',
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
    <div className='container'>
        <Modal
            visible={modalIsOpen}
            onCancel={() => setModalIsOpen(false)}
            footer={null}
            title={modalType === 'add' ? 'Mahsulot qoshish' : 'Mahsulotni tahrirlash'}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                saveProduct()
                }} className="modal-product">
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot nomini kiriting</span>
                    <input  onChange={e => setNewProduct({...newproduct, name: e.target.value})} value={newproduct?.name} required className='form-control' placeholder='Mahsulot nomini kiriting' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Kategoriyani tanlang</span>
                    <Select onChange={e => setNewProduct({...newproduct, category_id: e})} value={newproduct?.category_id}>
                        {
                            categories?.map((item) => (
                                <Select.Option value={item?.id} key={item?.id}>{item?.name}</Select.Option>
                            ))
                        }
                    </Select>
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot rasmini kiriting</span>
                    <input type={'file'} onChange={imageUpload} required={modalType === 'add'} className='form-control' placeholder='Mahsulot nomini kiriting' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot Rasmini kiriting</span>
                    <input type={'file'} onChange={imageUpload}  className='form-control' placeholder='Mahsulot nomini kiriting' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot Rasmini kiriting</span>
                    <input type={'file'} onChange={imageUpload}  className='form-control' placeholder='Mahsulot nomini kiriting' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot Rasmini kiriting</span>
                    <input type={'file'} onChange={imageUpload}  className='form-control' placeholder='Mahsulot nomini kiriting' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Eski narxni kiring</span>
                    <input type={'number'} onChange={e => setNewProduct({...newproduct, first_price: e.target.value})} value={newproduct?.first_price}  className='form-control' placeholder='Eski narxni kiring' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Yangi narxni kiring</span>
                    <input type={'number'} onChange={e => setNewProduct({...newproduct, second_price: e.target.value})} value={newproduct?.second_price} required className='form-control' placeholder='Yangi narxni kiring' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Chegirma foizini kiring kiring</span>
                    <input type={'number'} onChange={e => setNewProduct({...newproduct, discount: e.target.value})} value={newproduct?.discount}  className='form-control' placeholder='Chegirma foizini kiring kiring' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Tafsif (Comment) Kiriting</span>
                    <textarea onChange={e => setNewProduct({...newproduct, description: e.target.value })} value={newproduct?.description}  className='form-control' placeholder='Tafsif (Comment) Kiriting' ></textarea>
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot o'lchamlarini vergul orqali yozing (44,55,66)</span>
                    <input  onChange={e => setSizes(e.target.value)} value={sizes}  className='form-control' placeholder='44,55,66' />
                </label>
                <label className="form-label" required>
                    <span className='form-label__text'>Mahsulot ranglarini vergul orqali yozing (oq,qora,qizil)</span>
                    <input  onChange={e => setColors(e.target.value)} value={colors}  className='form-control' placeholder='oq,qora,qizil' />
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
        <h1 className='heading'>Mahsulotlar</h1>
        <div className="px-4 py-9 bg-white rounded-10 mt-6 overflow-y-auto">
            <div className="content-top flex justify-between">
                <div></div>
                <Button
                    type="primary"
                    onClick={() => {
                        setModalIsOpen(true)
                        setModalType('add')
                    }}
                >
                    Mahsulot qoshish
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

export default Products