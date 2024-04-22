import React, { useState } from 'react';
const Citation = () => {
  const strings = [
    '"Le sommeil est la meilleure des méditations." - Dalai Lama',
    '"Le sommeil est la clé qui ouvre la porte à un esprit rafraîchi et à un corps régénéré." - Inconnu',
    '"Le sommeil est la nourriture du cerveau. Comme tout autre organe, il a besoin de repos et de récupération." - John Wooden',
    '"Un sommeil suffisant, une alimentation saine, de l\'exercice physique et une paix intérieure sont les fondations d\'une bonne santé." - Deepak Chopra',
    '"Le sommeil est la colonne vertébrale de la santé." - Mehmet Oz',
    '"Le sommeil est la meilleure des thérapies." - Baltasar Gracián',
    '"Le sommeil est le pont qui relie aujourd\'hui à demain." - John Steinbeck',
    '"Le sommeil est l\'investissement le plus important que vous pouvez faire pour votre santé et votre bien-être." - Arianna Huffington',
    '"Le sommeil est la pierre angulaire de la productivité." - Jason Fried',
    '"Le sommeil est la clé du succès. Si vous ne dormez pas bien, vous ne pouvez pas être votre meilleur vous-même." - Arianna Huffington'];
  const [citation, setCitation] = useState('');
  const valeur = Math.floor(Math.random() * 10);
  const res = strings[valeur];  



  return (
    <div>
      <h1 className='italic text-citation'>{res}</h1>
    </div>
  );
};

export default Citation;
