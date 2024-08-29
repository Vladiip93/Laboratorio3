import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api';

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleSave = async () => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.nombre, { nombre: categoryName });
    } else {
      await createCategory({ nombre: categoryName });
    }
    setShowDialog(false);
    fetchCategories(); // Refresca las categorías
    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Category saved successfully' });
  };

  return (
    <div>
      <Toast ref={toast} />
      <Button label="Add Category" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
      <DataTable value={categories}>
        <Column field="nombre" header="Name" />
        <Column body={(rowData) => (
          <Button icon="pi pi-pencil" onClick={() => {
            setSelectedCategory(rowData);
            setCategoryName(rowData.nombre);
            setShowDialog(true);
          }} />
        )} />
        <Column body={(rowData) => (
          <Button icon="pi pi-trash" onClick={async () => {
            await deleteCategory(rowData.nombre);
            fetchCategories(); // Refresca las categorías
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
          }} />
        )} />
      </DataTable>

      <Dialog header="Category" visible={showDialog} onHide={() => setShowDialog(false)}>
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        </div>
        <Button label="Save" icon="pi pi-check" onClick={handleSave} />
      </Dialog>
    </div>
  );
};

export default CategoryComponent;
