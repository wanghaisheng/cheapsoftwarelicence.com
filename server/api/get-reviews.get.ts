import { eq } from 'drizzle-orm';
import { reviews } from './../../drizzle/schema';
import db from "~/drizzle/db"

export default defineEventHandler(async(event) => {
    const {productid} = getQuery(event)

    const response = await getReview(productid as number)

    return response
})

const getReview = async (productid: number) => {
const response = await db.select().from(reviews).where(eq(reviews.productid, productid))

return response
}