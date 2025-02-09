import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../component/Pagination';
import ProductModal from '../component/ProductModal';
import DelProductModal from '../component/DelProductModal';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""]
};

function ProductPage() {

    //const [isAuth, setIsAuth] = useState(false);

    const [products, setProducts] = useState([]);

    const [pageInfo, setPageInfo] = useState({})

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

    //get product detail; 
    // (page = 1): Defines the function parameter page with a default value of 1. This means if no value is passed to page, it will default to 1.
    const getProducts = async (page = 1) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
            );
            setProducts(res.data.products);
            setPageInfo(res.data.pagination);
        } catch (error) {
            alert("get products fail", error.data.message);
            //console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);



    // const productModalRef = useRef(null);
    // const delProductModalRef = useRef(null);
    const [modalMode, setModalMode] = useState(null);


    //modal for creating/editing
    const handleOpenProductModal = (mode, product = defaultModalState) => {
        setModalMode(mode);

        setTempProduct(product);
        setIsProductModalOpen(true);
    }


    const [tempProduct, setTempProduct] = useState(defaultModalState);

    const handleOpenDelProductModal = (product) => {
        setTempProduct(product);
        setIsDelProductModalOpen(true);
    }

    const handlePageChange = (page) => {
        getProducts(page)
    }

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            <h2>產品列表</h2>
                            <button onClick={() => { handleOpenProductModal('create') }} type="button" className="btn btn-primary">建立新的產品</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">產品名稱</th>
                                    <th scope="col">原價</th>
                                    <th scope="col">售價</th>
                                    <th scope="col">是否啟用</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <th scope="row">{product.title}</th>
                                        <td>{product.origin_price}</td>
                                        <td>{product.price}</td>
                                        <td>{product.is_enabled ? (<span className='text-success'>啟用</span>) : (<span>未啟用</span>)}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick={() => { handleOpenProductModal('edit', product) }} type="button" className="btn btn-outline-primary btn-sm">編輯</button>

                                                <button onClick={() => { handleOpenDelProductModal(product) }} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
            </div >

            <ProductModal
                modalMode={modalMode}
                getProducts={getProducts}
                tempProduct={tempProduct}
                isOpen={isProductModalOpen}
                setIsOpen={setIsProductModalOpen}
            />
            <DelProductModal
                tempProduct={tempProduct}
                isOpen={isDelProductModalOpen}
                setIsOpen={setIsDelProductModalOpen}
                getProducts={getProducts}
            />
        </>)

}

export default ProductPage;