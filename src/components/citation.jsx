import React, {useEffect, useState} from 'react';

const Citation = () => {
    const strings = [
        <div key={0}>
            <p>&quot;Le sommeil est la meilleure des méditations.&quot;</p>
            <p>Dalai Lama</p>
        </div>,
        <div key={1}>
            <p>&quot;Le sommeil est la clé qui ouvre la porte à un esprit rafraîchi et à un corps régénéré.&quot;</p>
            <p>Inconnu</p>
        </div>,
        <div key={2}>
            <p>&quot;Le sommeil est la nourriture du cerveau. Comme tout autre organe, il a besoin de repos et de
                récupération.&quot;</p>
            <p>John Wooden</p>
        </div>,
        <div key={3}>
            <p>&quot;Un sommeil suffisant, une alimentation saine, de l'exercice physique et une paix intérieure sont
                les fondations d'une bonne santé.&quot;</p>
            <p>Deepak Chopra</p>
        </div>,
        <div key={4}>
            <p>&quot;Le sommeil est la colonne vertébrale de la santé.&quot;</p>
            <p>Mehmet Oz</p>
        </div>,
        <div key={5}>
            <p>&quot;Le sommeil est la meilleure des thérapies.&quot;</p>
            <p>Baltasar Gracián</p>
        </div>,
        <div key={6}>
            <p>&quot;Le sommeil est le pont qui relie aujourd'hui à demain.&quot;</p>
            <p>John Steinbeck</p>
        </div>,
        <div key={7}>
            <p>&quot;Le sommeil est l'investissement le plus important que vous pouvez faire pour votre santé et votre
                bien-être.&quot;</p>
            <p>Arianna Huffington</p>
        </div>,
        <div key={8}>
            <p>&quot;Le sommeil est la pierre angulaire de la productivité.&quot;</p>
            <p>Jason Fried</p>
        </div>,
        <div key={9}>
            <p>&quot;Le sommeil est la clé du succès. Si vous ne dormez pas bien, vous ne pouvez pas être votre meilleur
                vous-même.&quot;</p>
            <p>Arianna Huffington</p>
        </div>
    ];
    const [citation, setCitation] = useState('');
    const valeur = Math.floor(Math.random() * strings.length);

    useEffect(() => {
        setCitation(strings[valeur]);
    }, []);


    return (
        <div>
            <h1 className='italic text-center'>{citation}</h1>
        </div>
    );
};

export default Citation;
