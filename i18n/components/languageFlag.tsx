import React from 'react'

// Componente bem simples que recebe uma imagem 
// e se está selecionada ou não (apenas para efeitos visuais)

const Flag = ({ image, isSelected, ...props } : {image: StaticImageData, isSelected: boolean, onClick: any}) => (
  <img alt="flag" src={image.src} className={`mx-1 max-h-7 hover:max-h-8 ${!isSelected && 'opacity-50'}`} {...props} />
)

export default Flag