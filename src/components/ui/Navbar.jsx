import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ carrito, aumentarCantidad, disminuirCantidad, eliminarProducto, favoritos, eliminarFavorito, productos, agregarAlCarrito, agregarAFavoritos }) => {
  const [isCarritoModalOpen, setIsCarritoModalOpen] = useState(false);
  const [isFavoritosModalOpen, setIsFavoritosModalOpen] = useState(false);
  const carritoModalRef = useRef(null);
  const favoritosModalRef = useRef(null);
  const carritoIconRef = useRef(null);
  const favoritosIconRef = useRef(null);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const resultadosRef = useRef(null);
  const [isPagoModalOpen, setIsPagoModalOpen] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const toggleCarritoModal = () => {
    setIsCarritoModalOpen(!isCarritoModalOpen);
  };

  const toggleFavoritosModal = () => {
    setIsFavoritosModalOpen(!isFavoritosModalOpen);
  };

  const closeCarritoModal = () => {
    setIsCarritoModalOpen(false);
  };

  const closeFavoritosModal = () => {
    setIsFavoritosModalOpen(false);
  };

  const calcularTotal = () => {
    return Object.values(carrito).reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const manejarCambioBusqueda = (evento) => {
    const texto = evento.target.value;
    setTextoBusqueda(texto);

    const resultadosFiltrados = productos.filter((producto) =>
      producto.titulo.toLowerCase().includes(texto.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  const handleProductoClick = (producto) => {
    setProductoSeleccionado(producto);
    setIsProductoModalOpen(true);
    setTextoBusqueda('');
    setResultados([]);
  };

  const closeProductoModal = () => {
    setIsProductoModalOpen(false);
  };

  const togglePagoModal = () => {
    setIsPagoModalOpen(!isPagoModalOpen);
  };

  const realizarPago = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setPagoExitoso(true);
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        carritoModalRef.current &&
        !carritoModalRef.current.contains(event.target) &&
        carritoIconRef.current &&
        !carritoIconRef.current.contains(event.target)
      ) {
        closeCarritoModal();
      }
      if (
        favoritosModalRef.current &&
        !favoritosModalRef.current.contains(event.target) &&
        favoritosIconRef.current &&
        !favoritosIconRef.current.contains(event.target)
      ) {
        closeFavoritosModal();
      }
      if (resultadosRef.current && !resultadosRef.current.contains(event.target)) {
        setResultados([]);
      }
    };

    if (isCarritoModalOpen || isFavoritosModalOpen || resultados.length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCarritoModalOpen, isFavoritosModalOpen, resultados]);

  return (
    <nav className="bg-gray-200 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col ml-2 mb-4 md:mb-0">
          <a href="/">
            <span className="font-bold text-2xl text-black" style={{ fontFamily: 'Orbitron' }}>Patitas</span> <br />
            <span className="font-bold text-2xl text-black" style={{ fontFamily: 'Orbitron' }}>Felices</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 mb-4 md:mb-0">
          <div className="relative flex rounded-full overflow-hidden border border-gray-300 shadow-sm w-full md:w-auto">
            <input
              type="text"
              placeholder="Busca tus productos..."
              className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3 pr-10"
              value={textoBusqueda}
              onChange={manejarCambioBusqueda}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full flex items-center justify-center bg-[#222222] px-5 text-sm text-white hover:bg-gray-800 transition-colors duration-300"
              style={{ fontFamily: 'Orbitron' }}
            ></button>
          </div>
          {resultados.length > 0 && (
            <ul ref={resultadosRef} className="absolute mt-12 md:mt-48 p-2 bg-white border rounded-md shadow-md w-full md:w-96 z-50 max-h-62 overflow-y-auto">
              {resultados.map((producto) => (
                <li key={producto.id} className="p-2 hover:bg-gray-100 cursor-pointer text-black text-sm" style={{ fontFamily: 'Orbitron' }} onClick={() => handleProductoClick(producto)}>
                  {producto.titulo}
                </li>
              ))}
            </ul>
          )}

          <div className="flex space-x-2 mt-4 md:mt-0">
            <button className="bg-white text-black py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 font-bold" style={{ fontFamily: 'Orbitron' }}>Service</button>
            <button className="bg-white text-black py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 font-bold" style={{ fontFamily: 'Orbitron' }}>App</button>
          </div>
        </div>

        <div className="flex space-x-4 ">
          <div
            ref={favoritosIconRef}
            className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-100 transition duration-300 relative"
            onClick={toggleFavoritosModal}
          >
            ❤️
            {isFavoritosModalOpen && (
              <div
                ref={favoritosModalRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-14  bg-white text-black rounded-md shadow-lg p-4 w-64 z-50 md:right-0"
              >
                <h3 className="font-bold mb-2">Favoritos</h3>
                {favoritos && favoritos.length > 0 ? (
                  <div>
                    <ul>
                      {favoritos.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-2">
                          <span>{item.titulo}</span>
                          <img src={item.imagen} alt={item.titulo} className="w-16 h-16 object-cover rounded" />
                          <button className="bg-red-500 border rounded-lg p-1 space-x-2 text-white" onClick={() => eliminarFavorito(item.id)}>Eliminar</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No hay favoritos.</p>
                )}
              </div>
            )}
          </div>

          <div
            ref={carritoIconRef}
            className="bg-white text-black rounded-full h-12 w-12  flex items-center justify-center hover:bg-gray-100 transition duration-300 relative"
            onClick={toggleCarritoModal}
          >
            🛒
            {isCarritoModalOpen && (
              <div ref={carritoModalRef} onClick={(e) => e.stopPropagation()} className="absolute top-14  bg-white text-black rounded-md shadow-lg p-4 w-90 mr-15 z-50 md:right-0">
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>Carrito</h3>
                {carrito && Object.values(carrito).length > 0 ? (
                  <div>
                    <ul>
                      {Object.values(carrito).map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-2">
                          <div>
                            <span>{item.titulo}</span>
                            <div className="flex items-center border w-14 gap-2 bg-gray-200 rounded-lg">
                              <button className="ml-2" onClick={(e) => { e.stopPropagation(); disminuirCantidad(item.id); }}>-</button>
                              <span>{item.cantidad}</span>
                              <button className="" onClick={(e) => { e.stopPropagation(); aumentarCantidad(item.id); }}>+</button>
                            </div>
                          </div>
                          <span className="mr-2">${(item.precio * item.cantidad).toFixed(2)}</span>
                          <img src={item.imagen} alt={item.titulo} className="w-14 h-14 object-cover rounded" />
                          <button className="bg-red-500 border rounded-lg p-1 space-x-2 text-white" onClick={(e) => { e.stopPropagation(); eliminarProducto(item.id); }}>Eliminar</button>
                        </li>
                      ))}
                    </ul>
                    <div className="font-bold mt-2">Total: ${calcularTotal().toFixed(2)}</div>
                    <button onClick={togglePagoModal} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Pagar</button>
                  </div>
                ) : (
                  <p>El carrito está vacío.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isProductoModalOpen && productoSeleccionado && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-radial-[at_20%_20%] from-white to-gray-300 to-90% inset-shadow-sm inset-shadow-gray-500/50 text-black border-2 border-gray-300 border-double p-6 rounded-md w-96">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron' }}>{productoSeleccionado.titulo}</h2>
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.titulo} className="w-64 h-64 object-cover rounded mb-4 ml-6" />
            <p className="text-gray-700 mb-2" style={{ fontFamily: 'Orbitron' }}>{productoSeleccionado.descripcion}</p>
            <p className="text-xl font-bold mb-4">${productoSeleccionado.precio}</p>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => {
                  agregarAFavoritos(productoSeleccionado);
                  closeProductoModal();
                }}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ fontFamily: 'Orbitron' }}
              >
                Agregar a Favoritos
              </button>
              <button
                onClick={() => {
                  agregarAlCarrito(productoSeleccionado);
                  closeProductoModal();
                }}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ fontFamily: 'Orbitron' }}
              >
                Agregar al Carrito
              </button>
            </div>
            <button onClick={closeProductoModal} className="mt-4 bg-gray-300 text-black py-2 px-4 rounded">Cerrar</button>
          </div>
        </div>
      )}

      {isPagoModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 shadow-md">
          <div className="bg-white text-center text-black rounded-md shadow-lg p-4 w-full md:w-4xl">
            {pagoExitoso ? (
              <div>
                <h3 className="font-bold mb-2">Pago Realizado con Éxito</h3>
                <p>¡Gracias por tu compra!</p>
                <button onClick={() => setIsPagoModalOpen(false)} className="mt-4 bg-red-300 text-black py-2 px-4 rounded">Cerrar</button>
              </div>
            ) : (
              <div className="flex flex-col p-6 rounded-lg bg-white text-gray-800 w-full md:w-3xl md:ml-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Detalles del Pago</h3>
                    <ul className="space-y-2">
                      {Object.values(carrito).map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm">{item.titulo} x{item.cantidad}</span>
                          <span className="text-sm font-medium">${(item.precio * item.cantidad).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 font-semibold text-gray-900">Total: ${calcularTotal().toFixed(2)}</div>
                  </div>
                  <div className="flex-1">
                    <form className="space-y-4" onSubmit={realizarPago}>
                      <div>
                        <input type="text" placeholder="Nombre" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 text-sm" required />
                      </div>
                      <div>
                        <input type="text" placeholder="Dirección" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 text-sm" required />
                      </div>
                      <div>
                        <input type="text" placeholder="Número de Tarjeta" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 text-sm" required />
                      </div>
                      <div>
                        <input type="text" placeholder="CVV" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 text-sm" required />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors text-sm">Realizar Pago</button>
                    </form>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <button onClick={() => setIsPagoModalOpen(false)} className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm">Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;