import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Terms and conditions - CITADEL CULT`,
    description: `Terms and conditions - CITADEL CULT`,
  }
}

export default async function TermsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-12">
      <div className="hidden md:block"></div>
      <div className="max-w-[550px]">
        <div>
          <h1 className="uppercase mb-14 font-bold">Terms and conditions</h1>
          <p>By placing an order you will receive an email confirmation. The email confirms that your order will be processed. The Contract of Sale between you and our company is concluded only in case your payment has been deducted from your credit or debit card.&nbsp;</p>
          <br />
          <p className="font-bold uppercase">Price and Availability</p>
          <br />
          <p>Despite the fact that we are trying to ensure the accuracy of all information, descriptions and prices, which are posted on this Site, some miscarriages might occur. The pointed prices include VAT in case if it charged. The price for shipping is not included. The additional costs, if there is a need to pay for them, are listed separately and are included in the &quot;total cost.&quot;</p>
          <br />
          <p>The Service may contain typographical or other errors, and may contain incomplete or outdated information. Therefore, we reserve the right to correct any errors, inaccuracies or omissions and to change or update information at any time without pre-notification. We reserve the right to refuse to fix any orders that you have made, in case if the information in the Services on which the order was based, contain errors or inaccuracies, in particular, errors, inaccuracies, or outdated information about the price, delivery, terms of payment or return policy.</p>
          <br />
          <p className="font-bold uppercase">Payment</p>
          <br />
          <p>After receipt of your order, we carry out a standard check of your payment card before the authorization, to make sure that there are sufficient funds for the transaction. The package will not be sent prior to the check. The funds from your credit card will be debited at the time of order confirmation.</p>
          <br />
          <p className="font-bold uppercase">Changes</p>
          <br />
          <p>CITADEL CULT reserves the right to modify or terminate the Services and/or any page of the Site at any time and without notification.</p>
          <br />
          <p className="font-bold uppercase">Claims</p>
          <br />
          <p>Our company has created Claims procedure, and with its help we will try to resolve appearing disputes. Please send us your comments and complaints.</p>
        </div>
      </div>
    </div>
  )
}
