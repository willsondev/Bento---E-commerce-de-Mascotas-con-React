import React from 'react';

const Categorias = ({ onCategoriaClick }) => {
  const categoriasData = [
    { id: 'perros', nombre: 'Perros' },
    { id: 'gatos', nombre: 'Gatos' },
    { id: 'pequenas-mascotas', nombre: 'Pequeñas mascotas' },
    { id: 'peces', nombre: 'Peces' },
  ];

  const CategoriaButton = ({ nombre, onClick }) => {
    return (
      <button
        type="button"
        className="px-4 py-2 md:px-8 md:py-3 font-semibold rounded-full bg-white hover:bg-gray-300 items-center justify-center text-sm md:text-base"
        onClick={onClick}
      >
        {nombre}
      </button>
    );
  };

  return (
    <div className="flex mt-2 bg-gray-200 items-center space-x-2 md:space-x-4 overflow-x-auto p-2">
      <h1 className="font-bold text-black ml-2 md:ml-5 whitespace-nowrap" style={{ fontFamily: 'Orbitron' }}>
        <a href="/">CATEGORIAS</a>
      </h1>
      {categoriasData.map((categoria) => (
        <CategoriaButton
          key={categoria.id}
          nombre={categoria.nombre}
          onClick={() => onCategoriaClick(categoria.id)}
        />
      ))}
    </div>
  );
};

export default Categorias;