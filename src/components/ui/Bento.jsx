import React, { useState, useEffect, useRef } from 'react';

const Bento = ({ categoria, agregarAlCarrito, favoritos, agregarAFavoritos, obtenerProductos }) => {
  const productosData = [
    { id: 'producto1', titulo: 'Casa para Perro ', precio: 350, imagen: '/assest/perros/casaperro.png', rating: 5, categoria: 'perros' },
    { id: 'producto2', titulo: 'Alimento Pedigree Adulto', precio: 450, descripcion: 'Comida para perro de alta calidad', imagen: '/assest/perros/comida3.png', categoria: 'perros' },
    { id: 'producto3', titulo: 'Arena Sanitaria para Gatos', precio: 250, descripcion: 'Arena sanitaria para gatos', imagen: '/assest/gatos/gato1.png', categoria: 'gatos' },
    { id: 'producto4', titulo: 'Rueda de Ejercicio para Hámster', precio: 15, categoria: '' },
    { id: 'producto5', titulo: '', precio: 600, categoria: '' },
    { id: 'producto6', titulo: 'pack canino sobres', precio: 120, descripcion: 'sobre caninos  calcio, vitaminas sabor', imagen: '/assest/perros/comida5.png', rating: 4.8, categoria: 'perros' },
    { id: 'producto7', titulo: 'Comida para Gato', precio: 200, imagen: '/assest/gatos/gato2.png', rating: 4.8, categoria: 'gatos' },
    { id: 'producto8', titulo: 'Comida para Gato', precio: 300, descripcion: 'Rascador para gatos de diferentes tamaños', imagen: '/assest/gatos/gato3.png', categoria: 'gatos' },
    { id: 'producto9', titulo: 'Alimento en Escamas para Peces', precio: 800, descripcion: 'Alimento para peces de diferentes tipos', imagen: '/assest/peces/peces1.png', categoria: 'peces' },
    { id: 'producto11', titulo: 'Pelota de Goma para Perro', precio: 100, descripcion: 'Juguete para perro', imagen: '/assest/perros/comida6.png', categoria: 'perros' },
    { id: 'producto12', titulo: 'Alimento Premium para Gato', precio: 500, descripcion: 'Comida para gato', imagen: '/assest/gatos/gato4.png', categoria: 'gatos' },
    { id: 'producto13', titulo: 'Pecera Pequeña con Accesorios', precio: 750, descripcion: 'Pecera pequeña', imagen: '/assest/peces/peces2.png', categoria: 'peces' },
    { id: 'producto14', titulo: 'Comida para Hámster Completa', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/pequeños1.png', categoria: 'pequenas-mascotas' },
    { id: 'producto22', titulo: 'Comida para Hámster Completa', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/pequeños2.png', categoria: 'pequenas-mascotas' },
    { id: 'producto23', titulo: 'jaula para Hámster Completa', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/pequeños3.png', categoria: 'pequenas-mascotas' },
    { id: 'producto24', titulo: 'rueda para Hámster Completa', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/pequeños3.png', categoria: 'pequenas-mascotas' },
    { id: 'producto25', titulo: 'Comida para Hámster Completa', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/peuqeños5.png', categoria: 'pequenas-mascotas' },
    { id: 'producto26', titulo: 'Transporte para Hámster', precio: 550, descripcion: 'Comida para hámster', imagen: '/assest/pequeños/pequeños6.png', categoria: 'pequenas-mascotas' },
    { id: 'producto15', titulo: 'Comida para Gato', precio: 350, descripcion: 'Cama para gato', imagen: '/assest/gatos/gato6.png', categoria: 'gatos' },
    { id: 'producto16', titulo: 'Cama Ortopédica para Perro', precio: 800, imagen: '/assest/perros/comida7.png', rating: 5, categoria: 'perros' },
    { id: 'producto17', titulo: 'Comida para Gato', precio: 400, descripcion: 'Cama para gato', imagen: '/assest/gatos/gato4.png', categoria: 'gatos' },
    { id: 'producto18', titulo: 'Alimento Goldfish Color Flakes Tropica', precio: 400, descripcion: 'Comida para Peces Goldfish Color Flakes', imagen: '/assest/peces/peces3.png', categoria: 'peces' },
    { id: 'producto19', titulo: 'Alimento Para Peces Guppy Tropical', precio: 400, descripcion: 'Comida para Peces Guppy Tropical', imagen: '/assest/peces/peces4.png', categoria: 'peces' },
    { id: 'producto20', titulo: 'Alimento japones pellet', precio: 400, descripcion: 'Comida para Peces Guppy Tropical', imagen: '/assest/peces/peces5.png', categoria: 'peces' },
    { id: 'producto21', titulo: 'Alimento Para Peces Guppy Tropical', precio: 400, descripcion: 'Comida para Peces Guppy Tropical', imagen: '/assest/peces/peces6.png', categoria: 'peces' },
  ];

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [isFavoritosModalOpen, setIsFavoritosModalOpen] = useState(false);
  const favoritosModalRef = useRef(null);
  const favoritosIconRef = useRef(null);

  useEffect(() => {
    if (categoria) {
      const filtrados = productosData.filter((producto) => producto.categoria === categoria);
      setProductosFiltrados(filtrados);
      console.log('Productos filtrados:', filtrados);
    } else {
      setProductosFiltrados(productosData.slice(0, 7));
      console.log('Productos filtrados (todos):', productosData.slice(0, 7));
    }
    obtenerProductos(productosData);
  }, [categoria, obtenerProductos]);

  const toggleFavoritosModal = () => {
    setIsFavoritosModalOpen(!isFavoritosModalOpen);
  };

  const closeFavoritosModal = () => {
    setIsFavoritosModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (favoritosModalRef.current && !favoritosModalRef.current.contains(event.target) && favoritosIconRef.current && !favoritosIconRef.current.contains(event.target)) {
        closeFavoritosModal();
      }
    };

    if (isFavoritosModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFavoritosModalOpen]);

  const ProductoCard = ({ producto }) => {
    const isFavorito = favoritos && favoritos.some((fav) => fav.id === producto.id);
    return (
      <div className="rounded-lg col-span-12 md:col-span-3 row-span-3 flex flex-col items-center border border-gray-300 shadow-md bg-[url(/assest/perros/casaperro.png)] bg-cover bg-center">
        <h1 className="mt-5 text-3xl font-extrabold text-black mb-4" style={{ fontFamily: 'Orbitron' }}>Nuevos Productos</h1>
        <div className="mt-2 mb-4 rounded-md shadow-md bg-white/30 backdrop-blur-md dark:text-gray-800 ">
          <div className="flex flex-col p-5 ">
            <div className="space-y-2 flex">
              <h2 className="text-3xl font-semibold tracking-wide" style={{ fontFamily: 'Orbitron' }}>${producto.precio} <br /> <span>{producto.titulo}</span></h2>
            </div>
            <img src={producto.imagen} alt="" className="rounded-t-md ml-10" style={{ maxWidth: '220px' }} />
            <div className="flex w-14 mt-2 justify-between items-center space-x-5">
              <button type="button" className={`flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-full bg-white border dark:text-gray-50 ${isFavorito ? 'text-red-500' : ''}`} onClick={() => agregarAFavoritos(producto)}>❤️</button>
              <button type="button" className="flex items-center justify-center p-2 font-semibold tracking-wide rounded-full bg-white dark:text-gray-50" onClick={() => agregarAlCarrito(producto)}>🛒</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ValueDealsCard = ({ producto }) => {
    const isFavorito = favoritos && favoritos.some((fav) => fav.id === producto.id);
    return (
      <div className="rounded-3xl col-span-12 md:col-span-4 row-span-1 bg-radial-[at_20%_20%] from-white to-gray-300 to-90% inset-shadow-sm inset-shadow-gray-500/50 flex flex-col md:flex-row justify-between items-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center ml-4 md:ml-4 md:text-left p-2">
          <h1 className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Orbitron' }}>{producto.titulo} <br /> $ { producto.precio}</h1>
          <div>
            <button className="bg-white hover:bg-gray-200 font-bold py-2 px-4 ml-2 rounded-full transition duration-300">75% Off</button>
          </div>
        </div>
        <div className="md:mt-0 p-2">
          <img src={producto.imagen} alt="Imagen de prueba" className="max-w-[200px]" />
        </div>
        <div className="flex mt-2 justify-between mr-2 space-x-2 p-2">
          <button type="button" className={`flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-full bg-white border dark:text-gray-50 ${isFavorito ? 'text-red-500' : ''}`} onClick={() => agregarAFavoritos(producto)}>❤️</button>
          <button type="button" className="flex items-center justify-center p-2 font-semibold tracking-wide rounded-full bg-white dark:text-gray-50" onClick={() => agregarAlCarrito(producto)}>🛒</button>
        </div>
      </div>
    );
  };

  const StartCard = ({ producto }) => {
    const isFavorito = favoritos && favoritos.some((fav) => fav.id === producto.id);
    return (
      <div className="bg-radial-[at_20%_20%] from-white to-gray-300 to-90% inset-shadow-sm inset-shadow-gray-500/50 rounded-lg col-span-12 md:col-span-3 row-span-1 mr-5 bg-red-200 px-3 py-1 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="text-left ">
            <h1 className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Orbitron' }}>{producto.titulo} <br /> $ { producto.precio}</h1>
            <div>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={producto.imagen} alt="Imagen de prueba" className="h-50" style={{ maxWidth: '85px' }} />
          </div>
          <div className="flex mt-2 justify-between items-center space-x-1">
            <button type="button" className={`flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-full bg-white border dark:text-gray-50 ${isFavorito ? 'text-red-500' : ''}`} onClick={() => agregarAFavoritos(producto)}>❤️</button>
            <button type="button" className="flex items-center justify-center p-2 font-semibold tracking-wide rounded-full bg-white dark:text-gray-50" onClick={() => agregarAlCarrito(producto)}>🛒</button>
          </div>
        </div>
      </div>
    );
  };

  const PopularProductsCard = ({ producto }) => {
    return (
      <div className="rounded-lg col-span-12 md:col-span-3 row-span-1 bg:blue-200 rouded-2xl flex justify-start font-bold text-3xl text-gray-500 items-center h-10" style={{ fontFamily: 'Orbitron' }}>
        Productos Populares
      </div>
    );
  };

  const ViewAllCard = ({ producto }) => {
    return (
      <div className="rounded-lg col-span-12 md:col-span-2 row-span-1 bg:indigo-200 rouded-3xl flex h-10 w-full md:w-64">
        <div className="rounded-full w-full md:w-64 items-center text-center text-2xl font-bold text-gray-500 bg-white " style={{ fontFamily: 'Orbitron' }}>
          ver mas
        </div>
      </div>
    );
  };

  const ImageRatingCard = ({ producto }) => {
    const isFavorito = favoritos && favoritos.some((fav) => fav.id === producto.id);
    return (
      <div className="bg-radial-[at_20%_20%] from-blue-100 to-gray-300 to-90% inset-shadow-sm inset-shadow-gray-500/50 rounded-lg w-full col-span-12 md:col-span-3 row-span-1 bg-[#A88378] rouded-3xl flex items-center justify-around p-3">
        <div className="flex items-center">
          <div className="">
            <img src={producto.imagen} alt="Imagen de prueba" className="" style={{ maxWidth: '150px' }} />
          </div>
          <div className="flex gap-2 mt-2">
            <div className="">
              <button className="bg-white rounded-full px-2 py-2 font-bold" onClick={() => agregarAlCarrito(producto)}>🛒 </button>
            </div>
            <div className="">
              <button className={`bg-white rounded-full px-2 py-2 ${isFavorito ? 'text-red-500' : ''}`} onClick={() => agregarAFavoritos(producto)}>❤️</button>
            </div>
            <span className="text-gray-600 rounded-full mb-2 font-bold" style={{ fontFamily: 'Orbitron' }}>{producto.titulo} <br /> $ { producto.precio}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 ml-2 md:ml-17 justify-center bg-gray-200 p-2">
      <div className="grid grid-cols-12 md:grid-cols-10 gap-5 mr-3">
        {productosFiltrados.map((producto) => {
          switch (producto.id) {
            case 'producto1': return <ProductoCard key={producto.id} producto={producto} />;
            case 'producto2': return <ValueDealsCard key={producto.id} producto={producto} />;
            case 'producto3': return <StartCard key={producto.id} producto={producto} />;
            case 'producto4': return <PopularProductsCard key={producto.id} producto={producto} />;
            case 'producto5': return <ViewAllCard key={producto.id} producto={producto} />;
            default: return <ImageRatingCard key={producto.id} producto={producto} />;
          }
        })}
      </div>
    </div>
  );
};

export default Bento;