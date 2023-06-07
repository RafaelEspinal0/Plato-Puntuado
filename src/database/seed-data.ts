import { IRestaurant, IUser } from "@/interfaces";

interface SeedData {
    restaurants: IRestaurant[],
    users: IUser[]
}


export const initialData: SeedData = {

    restaurants: [
        {
            name: 'Maraca',
            images: ['maraca.jpeg', 'maraca-2.jpeg'],
            description: 'Un restaurante con comida caribeña.',
            categories:['Caribbean']
        },
        {
            name: 'Bar Blu Pool',
            images: ['bar-blu-pool-bar.jpg'],
            description: 'Un bar en el agua.',
            categories:['Drinks','Fish and seafood ']
        },
        {
            name: 'Casa Vera',
            images: ['casa-vera.jpeg'],
            description: 'Un restaurante marino.',
            categories:['Fish and seafood ' ,'Caribbean']
        },
        {
            name: 'Don Pepe',
            images: ['don-pepe.jpeg'],
            description: 'Un restaurante de carne',
            categories:['Chicken', 'Steaks']
        },
        {
            name: 'Factory Steak and Lobster',
            images: ['factory-steak-and-lobster.jpg'],
            description: 'Un restaurante con carne',
            categories:['Steaks', 'Caribbean']
        },
        {
            name: 'Filigrana',
            images: ['filigrana.jpeg'],
            description: 'Un restaurante caribeño y elegante para compartir.',
            categories:['Steaks', 'Fish and seafood ', 'Caribbean']
        },
        {
            name: 'La Cassina',
            images: ['la-cassina.jpeg'],
            description: 'Un restaurante caribeño y de italiana comida.',
            categories:['Italian', 'Caribbean']
        },
        {
            name: 'Nau Lounge',
            images: ['nau-lounge.jpg'],
            description: 'Un restaurante con tematica japones y con diseño elegante para compartir.',
            categories:['Sushi', 'Fish and seafood ', 'Caribbean']
        },
        {
            name: 'prueba',
            images:[],
            description: 'Sin foto',
            categories:['American']
        }
    ],
    users:[
        {
            name: 'Rafael Espinal',
            username: 'respinal',
            password: '12345678',
            role: 'Admin'
        },
        {
            name: 'Cliente 1',
            username: 'cliente1',
            password: '12345678',
            role: 'Client'
        },
        {
            name: 'Cliente 2',
            username: 'cliente2',
            password: '12345678',
            role: 'Client'
        },
    ]
    
    
}