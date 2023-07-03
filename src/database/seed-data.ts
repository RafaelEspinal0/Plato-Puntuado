import { IRestaurant, IUser } from "@/interfaces";
import bcrypt from 'bcryptjs'

interface SeedData {
    restaurants: IRestaurant[],
    users: IUser[]
}


export const initialData: SeedData = {

    restaurants: 
    [
        {
            _id: null,
            name: 'Maraca',
            images: ['maraca.jpeg', 'maraca-2.jpeg'],
            description: 'Un restaurante con comida caribeña.',
            categories:['Caribbean']
        },
        {
            _id: null,
            name: 'Bar Blu Pool',
            images: ['bar-blu-pool-bar.jpg'],
            description: 'Un bar en el agua.',
            categories:['Drinks','Fish and seafood ']
        },
        {
            _id: null,
            name: 'Casa Vera',
            images: ['casa-vera.jpeg'],
            description: 'Un restaurante marino.',
            categories:['Fish and seafood ' ,'Caribbean']
        },
        {
            _id: null,
            name: 'Don Pepe',
            images: ['don-pepe.jpeg'],
            description: 'Un restaurante de carne',
            categories:['Chicken', 'Steaks']
        },
        {
            _id: null,
            name: 'Factory Steak and Lobster',
            images: ['factory-steak-and-lobster.jpg'],
            description: 'Un restaurante con carne',
            categories:['Steaks', 'Caribbean']
        },
        {
            _id: null,
            name: 'Filigrana',
            images: ['filigrana.jpeg'],
            description: 'Un restaurante caribeño y elegante para compartir.',
            categories:['Steaks', 'Fish and seafood ', 'Caribbean']
        },
        {
            _id: null,
            name: 'La Cassina',
            images: ['la-cassina.jpeg'],
            description: 'Un restaurante caribeño y de italiana comida.',
            categories:['Italian', 'Caribbean']
        },
        {
            _id: null,
            name: 'Nau Lounge',
            images: ['nau-lounge.jpg'],
            description: 'Un restaurante con tematica japones y con diseño elegante para compartir.',
            categories:['Sushi', 'Fish and seafood ', 'Caribbean']
        },
        {
            _id: null,
            name: 'prueba',
            images:[],
            description: 'Sin foto',
            categories:['American']
        }
    ],

    users:
    [
        {
            _id: null,
            name: 'Rafael Espinal',
            username: 'respinal',
            password: bcrypt.hashSync('12345678'),
            role: 'Admin'
        },
        {
            _id: null,
            name: 'Rahnya Negron',
            username: 'rnegron',
            password: bcrypt.hashSync('12345678'),
            role: 'Client'
        },
        {
            _id: null,
            name: 'Eduardo Diaz',
            username: 'ediaz',
            password: bcrypt.hashSync('12345678'),
            role: 'Client'
        },
    ]
    
    
}