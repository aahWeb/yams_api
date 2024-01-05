import { Pastrie } from "../pastrie";

export const trimAll = (data: any) => {
    for (const key in data) {
        if (typeof data[key] === 'string')
        data[key] = data[key]?.trim() ?? '';
    }
    return data;
};

export const modifyQuantityPastries = (pastries : Pastrie[], quantity : number) : Pastrie[] => {

    pastries?.sort(_ => Math.random() - .5)

    const pastriesQ : Pastrie[] = pastries?.filter( p => p.quantity > 0 ) || []
    const pastriesWQ : Pastrie[] = pastries?.filter( p => p.quantity == 0 ) || []

    for(const pastrie of pastriesQ){
        if( quantity == 0 ) break;
        while( pastrie.quantity > 0 && quantity > 0){
            pastrie.quantity -= 1
            pastrie.quantityWon = 1 + ( pastrie?.quantityWon || 0 )
            quantity -= 1
        }
        pastrie.choice = true 
    }

    return [ ...pastriesQ, ...pastriesWQ ]
}   