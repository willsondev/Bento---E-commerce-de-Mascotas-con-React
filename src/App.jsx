import React, { useState, useCallback } from 'react';
import Navbar from './components/ui/Navbar';
import Categorias from './components/ui/Categorias';
import Bento from './components/ui/Bento';

function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [carrito, setCarrito] = useState({});
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    console.log('Categoría seleccionada en App:', categoria);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoId = producto.id;
      if (prevCarrito[productoId]) {
        const nuevaCantidad = prevCarrito[productoId].cantidad + 1;
        return {
          ...prevCarrito,
          [productoId]: { ...producto, cantidad: nuevaCantidad },
        };
      } else {
        return {
          ...prevCarrito,
          [productoId]: { ...producto, cantidad: 1 },
        };
      }
    });
  };

  const aumentarCantidad = (productoId) => {
    setCarrito((prevCarrito) => {
      if (prevCarrito[productoId]) {
        const nuevaCantidad = prevCarrito[productoId].cantidad + 1;
        return {
          ...prevCarrito,
          [productoId]: { ...prevCarrito[productoId], cantidad: nuevaCantidad },
        };
      }
      return prevCarrito;
    });
  };

  const disminuirCantidad = (productoId) => {
    setCarrito((prevCarrito) => {
      if (prevCarrito[productoId] && prevCarrito[productoId].cantidad > 1) {
        const nuevaCantidad = prevCarrito[productoId].cantidad - 1;
        return {
          ...prevCarrito,
          [productoId]: { ...prevCarrito[productoId], cantidad: nuevaCantidad },
        };
      }
      return prevCarrito;
    });
  };

  const eliminarProducto = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = { ...prevCarrito };
      delete nuevoCarrito[productoId];
      return nuevoCarrito;
    });
  };

  const agregarAFavoritos = (producto) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.some((fav) => fav.id === producto.id)) {
        return prevFavoritos.filter((fav) => fav.id !== producto.id);
      } else {
        return [...prevFavoritos, producto];
      }
    });
  };

  const eliminarFavorito = (productoId) => {
    setFavoritos((prevFavoritos) => {
      return prevFavoritos.filter((fav) => fav.id !== productoId);
    });
  };

  const obtenerProductos = useCallback((productos) => {
    setProductos(productos);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar
        carrito={carrito}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        eliminarProducto={eliminarProducto}
        favoritos={favoritos}
        eliminarFavorito={eliminarFavorito}
        productos={productos}
        agregarAlCarrito={agregarAlCarrito}
        agregarAFavoritos={agregarAFavoritos}
      />
      <Categorias onCategoriaClick={handleCategoriaClick} />
      <div className="">
        <Bento
          categoria={categoriaSeleccionada}
          agregarAlCarrito={agregarAlCarrito}
          favoritos={favoritos}
          agregarAFavoritos={agregarAFavoritos}
          obtenerProductos={obtenerProductos}
        />
      </div>
    </div>
  );
}

export default App;