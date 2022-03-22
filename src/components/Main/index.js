import React, { forwardRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { useStore, addProduct, updateProduct, deleteProduct } from './../../Store';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const localization = {
  body: {
    emptyDataSourceMessage: "No hay productos qué mostrar",
    addTooltip: 'Añadir',
    deleteTooltip: 'Eliminar',
    editTooltip: 'Editar',
    filterRow: {
      filterTooltip: 'Filtrar'
    },
    editRow: {
      deleteText: '¿Estás segur@ que quieres eliminar este producto?',
      cancelTooltip: 'Cancelar',
      saveTooltip: 'Finalizar'
    }
},
grouping: {
  groupedBy: 'Agrupar por:'
},
header: {
  actions: 'Acciones'
},
pagination: {
  labelDisplayedRows: '{from}-{to} de {count}',
  labelRowsSelect: 'filas',
  labelRowsPerPage: 'Filas por página:',
  firstAriaLabel: 'Primer página',
  firstTooltip: 'Primer página',
  previousAriaLabel: 'Página anterior',
  previousTooltip: 'Página anterior',
  nextAriaLabel: 'Página siguiente',
  nextTooltip: 'Página siguiente',
  lastAriaLabel: 'Última página',
  lastTooltip: 'Última página'
},
toolbar: {
  addRemoveColumns: 'Añadir o eliminar columnas',
  nRowsSelected: '{0} fila(s) seleccionada(s)',
  showColumnsTitle: 'Mostrar columnas',
  showColumnsAriaLabel: 'Mostrar columnas',
  exportTitle: 'Exportar',
  exportAriaLabel: 'Exportar',
  exportName: 'Exportar en CSV',
  searchTooltip: 'Buscar',
  searchPlaceholder: 'Buscar'
}
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    paddingTop: `${theme.spacing(1) * 5}px`,
  },
  formContainer: {
    paddingTop: `${theme.spacing(1) * 5}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
  },
}));

export default function Main() {
  const columns = [
      { title: 'Id', field: 'id', type: 'numeric', editable: 'never', align: 'left' },
      { title: 'Nombre', field: 'name', editable: 'always', searcheable: true },
      { title: 'Descripción', field: 'description', editable: 'always' },
      { title: 'Precio', field: 'price', type: 'currency', editable: 'always' },
    ];
  const { products, setProducts } = useStore();

  useEffect(() => {
    localStorage.setItem('Products', products);
  }, [products])

  const classes = useStyles();

  return (
    <main>
    <Container className={classes.tableContainer}>
      <MaterialTable
        title="Productos"
        columns={columns}
        data={products}
        icons={tableIcons}
        localization={localization}
        options={{
          paging: false,
          maxBodyHeight: '65vh',
          actionsColumnIndex: -1
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                addProduct(newData.name, newData.description, newData.price).then(products => 
                    products.forEach(product => 
                      setProducts(prev => 
                        [...prev, product]
                      )
                    )
                  );
                resolve();
              }, 600);
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  if (oldData) {
                    updateProduct(oldData.id, newData.name, newData.description, newData.price).then(products => 
                      products.forEach(product => 
                        setProducts(prev => {
                          prev[prev.indexOf(oldData)] = product;
                          return prev;
                        })
                      )
                    )
                  }
                  resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  deleteProduct(oldData.id).then(products => 
                    products.forEach(product => 
                      setProducts(prev => 
                        prev.filter(value => 
                          value.id !== product.id
                        )
                      )
                    )
                  );
                  resolve();
                }, 600);
              }),
        }}
      />
    </Container>
    </main>
  )
}