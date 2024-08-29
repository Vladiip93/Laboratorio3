import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getProducts, createProduct, deleteProduct, updateProduct, getCategories } from '../services/api';
import { Product, Category } from '../types';

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<{ nombre: string; precio: number; stock: number; categoryName: string }>({
    nombre: '',
    precio: 0,
    stock: 0,
    categoryName: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openNewProductDialog = () => {
    setNewProduct({ nombre: '', precio: 0, stock: 0, categoryName: '' });
    setProductToEdit(null);
    setProductDialog(true);
  };

  const openEditProductDialog = (product: Product) => {
    setProductToEdit(product);
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio,
      stock: product.stock,
      categoryName: product.categoryName || '' // Asegúrate de que categoryName siempre tenga un valor por defecto
    });
    setProductDialog(true);
  };

  const saveProduct = async () => {
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, newProduct);
      } else {
        await createProduct(newProduct);
      }
      fetchProducts();
      setProductDialog(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setNewProduct(prev => ({
      ...prev,
      [field]: value === '' ? (field === 'precio' ? 0 : '') : (field === 'precio' ? parseFloat(value) : value)
    }));
  };

  return (
    <div>
      <Button label="Añadir Producto" icon="pi pi-plus" onClick={openNewProductDialog} />
      <DataTable value={products} paginator rows={10}>
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />
        <Column field="stock" header="Stock" />
        <Column field="categoryName" header="Categoría" />
        <Column body={(rowData) => (
          <>
            <Button 
              icon="pi pi-pencil" 
              className="p-button-warning p-mr-2" 
              onClick={() => openEditProductDialog(rowData)} 
            />
            <Button 
              icon="pi pi-trash" 
              className="p-button-danger" 
              onClick={() => handleDeleteProduct(rowData.id)} 
            />
          </>
        )} />
      </DataTable>

      <Dialog
        visible={productDialog}
        style={{ width: '400px' }}
        header={productToEdit ? 'Editar Producto' : 'Añadir Producto'}
        modal
        onHide={() => setProductDialog(false)}
        footer={<Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />}
      >
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={newProduct.nombre}
            onChange={(e) => handleChange(e, 'nombre')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="precio">Precio</label>
          <InputText
            id="precio"
            value={newProduct.precio.toString()}
            onChange={(e) => handleChange(e, 'precio')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="stock">Stock</label>
          <InputText
            id="stock"
            value={newProduct.stock.toString()}
            onChange={(e) => handleChange(e, 'stock')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="categoryName">Categoría</label>
          <select
            id="categoryName"
            value={newProduct.categoryName}
            onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.nombre}>{category.nombre}</option>
            ))}
          </select>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductComponent;
