
export interface IRestaurant{

    name: string,
    images: string[],
    description: string,
    categories: ICategories[],
   
    //TODO: agregar createdAt y updatedAt
}


export type ICategories = 'American' | 'Hamburgers' | 'Italian' | 'Ice cream' | 'Chicken' | 'Mexican food' | 'Drinks' | 'Vegan Food' | 'Salads' | 'Fish and seafood ' | 'Sushi';