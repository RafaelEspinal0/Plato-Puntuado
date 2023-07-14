
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormaDistanceNow = (date: Date) =>{
    const toNumber = new Date(date).getTime()
    const fromNow = formatDistanceToNow(toNumber, {locale: es})

    return fromNow;
}