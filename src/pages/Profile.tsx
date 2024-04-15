import React from 'react'
import {useState} from 'react'
import '../App.css'
import utilisateurs from "../mocks/user.json"

export default function Profile() {
    const [user, setUser] = useState(utilisateurs)
    fetch('utilisateurs.json')
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })

    console.log(user)

    return (
        <>
            <div className='container'>
                <h1 className='titre'> Bienvenue {user.prenom} {user.nom} </h1>
            </div>
            <div className='infos'>
                <ul>

                    <li className='block'>{user.age} ans</li>
                    <li className='block'> {user.profilSommeil}</li>
                    <li className='block'>{user.profession}</li>
                </ul>
            </div>

            <div className='blocInfos'>
                <h2 className='pageInfosParagraphe'>Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                    not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum</h2>
            </div>
        </>
    )
}
