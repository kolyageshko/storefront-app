import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Returns - CITADEL CULT`,
        description: `Returns - CITADEL CULT`,
    }
}

export default async function ReturnsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-12">
            <div className="hidden md:block"></div>
            <div className="max-w-[550px]">
                <h1 className="uppercase mb-14 font-bold">Returns</h1>
                <div>
                    <p className="font-bold">RETURNS &amp; EXCHANGES POLICY:</p>
                    <br/>
                    <p>Please contact us via support@citadelcult.com if you have any questions prior to purchase. We strongly advise consulting our size charts and hovering over the model for their size and height before making your order to ensure sizing satisfaction. Please carefully read through this returns policy as you are agreeing to this when you make a purchase from our website. </p>
                    <br/>
                    <p className="font-bold">RETURNS &amp; EXCHANGES:</p>
                    <br/>
                    <p>We accept returns and exchanges for non-faulty items. Please contact &nbsp;support@citadelcult.com&nbsp;with your order number and details of the return/exchange. Size exchanges are subject to availability. Returns, refunds and exchanges will only be processed once the item is received back in our warehouse in original condition, with original packaging and tags.</p>
                    <p>If you have a change of mind in respect of a purchase, we will accept a return within 14 days of purchase and provide you with a credit note or refund.</p>
                    <p>We have the right to refuse any returned item that does not meet it’s original condition. Please note we do not allow exchanges or returns on discounted/ sale products.</p>
                    <br/>
                    <p className="font-bold">RETURNS &amp; EXCHANGES POSTAGE:</p>
                    <br/>
                    <p>All shipping costs related to exchanges and returns due to “change of mind”, will be borne by the customer. CITADEL CULT does not cover shipping costs for returns/ exchanges unless proven faulty. Shipping costs are not refundable for change of mind returns and exchanges and you are responsible for the costs of shipping the products back to us. </p>
                    <p>All returned orders will be issued with either a credit note or refund to the value of the item(s) returned, less any shipping costs. Please note, we are not responsible for lost, stolen or undelivered returned parcels.</p>
                    <br/>
                    <p className="font-bold">FAULTY ITEMS:</p>
                    <br/>
                    <p>If you believe your purchased item is faulty, incorrect or missing an item - please contact us via support@citadelcult.com with photos of the fault and your order number. All claims need to be lodged within 14 days of receiving an item. Refunds will only be processed if the item is proven faulty. We reserve the right to refuse a return if it does not meet our standards and is obvious of your own damage or neglect of the item. </p>
                    <p>For faulty items we will cover the postage costs for the return, however, you are liable for any delivery costs if we refuse the return if it does not meet our standards. Please exercise caution when trying on items as stained/ dirty items will not be accepted.</p>    </div>
            </div>
        </div>
    )
}
