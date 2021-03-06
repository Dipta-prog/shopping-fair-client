import React from 'react';
import './Admin.css'
import window from '../../all_Images/icons/grid 1.png';
import pen from '../../all_Images/icons/edit 1.png';
import plus from '../../all_Images/icons/plus 1.png';
import { useState } from 'react';
import axios from 'axios';
import ManageProduct from '../ManageProduct/ManageProduct';

const Admin = () => {
    const [manageProduct, setManageProduct] = useState(false);
    const [addProduct, setAddProduct] = useState(true);
    const [editProduct, setEditProduct] = useState(false);
    const [fileSelected, setFileSelected] = useState(true);
    const [addProductAllData, setAddProductAllData] = useState({
        name: '',
        weight: '',
        price: '',
        photo: '',
        quantity: '1'
    });

    const handleClickForManageProduct = () => {
        setManageProduct(true);
        setAddProduct(false);
        setEditProduct(false);
    }
    const handleClickForAddProduct = () => {
        setManageProduct(false);
        setAddProduct(true);
        setEditProduct(false);
    }
    const handleClickForEditProduct = () => {
        setManageProduct(false);
        setAddProduct(false);
        setEditProduct(true);
    }

    const handleImgUpload = (event) => {
        const imgData = new FormData();
        imgData.set('key', '07e3f5810f445d3150142c8ea40f5780');
        imgData.append('image', event.target.files[0])
        setFileSelected(false);


        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(function (response) {
                console.log(response.data.status);
                const tempInfo = { ...addProductAllData };
                tempInfo.photo = (response.data.data.display_url);
                setAddProductAllData(tempInfo);
                if (response.data.status === 200) {
                    setFileSelected(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleBlur = (event) => {
        if (event.target.name === 'productName') {
            const tempInfo = { ...addProductAllData };
            tempInfo.name = (event.target.value);
            setAddProductAllData(tempInfo);
        }
        if (event.target.name === 'productPrice') {
            const tempInfo = { ...addProductAllData };
            tempInfo.price = (event.target.value);
            setAddProductAllData(tempInfo);
        }
        if (event.target.name === 'productWight') {
            const tempInfo = { ...addProductAllData };
            tempInfo.weight = (event.target.value);
            setAddProductAllData(tempInfo);
        }
    }

    const handleAddProduct = (event) => {
        event.preventDefault();
        if (fileSelected) {
            const url = 'https://lychee-cupcake-61240.herokuapp.com/addProduct';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addProductAllData)
            })
                .then(res => {
                    console.log('server side response', res.status);
                    if (res.status === 200) {
                        event.target[0].value = '';
                        event.target[1].value = '';
                        event.target[2].value = '';
                        event.target[3].value = '';
                        setAddProductAllData({
                            name: '',
                            weight: '',
                            price: '',
                            photo: '',
                            quantity: '1'
                        });
                    }
                });
        }

    }


    return (
        <div className="container">
            {/* side menu */}
            <div className="row">
                <div className="col-md-3 menu-div" style={{ backgroundColor: "black" }}>
                    <div className="d-flex justify-content-center">
                        <div className=" menu-container">
                            <p id="manageProducts" onClick={handleClickForManageProduct} className="row menu"> <img className="iconStyle" src={window} alt="" /> Manage Products</p>
                            <p id="addProducts" onClick={handleClickForAddProduct} className="row menu"> <img className="iconStyle" src={plus} alt="" /> Add Products</p>
                            <p id="editProducts" onClick={handleClickForEditProduct} className="row menu"> <img className="iconStyle" src={pen} alt="" /> Edit Products</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-9 main-div">
                    {/* add product */}
                    {addProduct && <div>
                        <form onSubmit={handleAddProduct}>
                            <h3>Add Products</h3>
                            <div className="card shadow card-width">
                                <form onSubmit={handleAddProduct}></form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="pl-3 pr-3 pt-2">
                                            <h5>Product Name</h5>
                                            <input required onBlur={handleBlur} className="form-control" type="text" name="productName" placeholder="Enter Name" />
                                        </div>
                                        <div className="mt-3 pl-3 pr-3 pb-3">
                                            <h5>Add price</h5>
                                            <input required onBlur={handleBlur} className="form-control" type="text" name="productPrice" placeholder="Enter Price" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="pl-3 pr-3 pt-2">
                                            <h5>Wight</h5>
                                            <input onBlur={handleBlur} className="form-control" type="text" name="productWight" placeholder="Enter Wight" />
                                        </div>
                                        <div className="mt-3 pl-3 pr-3 pb-3">
                                            <h5>Add Photo</h5>
                                            <input onChange={handleImgUpload} type="file" name="productImg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success mt-3 d-flex float-right">Save</button>
                        </form>
                    </div>}

                    {/* manage product */}
                    {manageProduct && <div>
                        <ManageProduct></ManageProduct>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Admin;