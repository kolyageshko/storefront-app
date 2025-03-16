import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Shipping Policy - CITADEL CULT`,
    description: `Shipping Policy - CITADEL CULT`,
  }
}

export default async function ContactPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-12">
      <div className="hidden md:block"></div>
      <div className="max-w-[550px]">
        <div>
          <h1 className="uppercase mb-14 font-bold">Shipping policy</h1>
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td><strong>SHIPPING TIME BY COUNTRY</strong></td>
                  <td><strong>DAYS</strong></td>
                </tr>
                <tr>
                  <td>Ukraine</td>
                  <td>1-2</td>
                </tr>
                <tr>
                  <td>Germany, <span>Poland</span></td>
                  <td>2-5</td>
                </tr>
                <tr>
                  <td>Netherlands, Belgium, Luxembourg, Austria, Denmark</td>
                  <td>2-4</td>
                </tr>
                <tr>
                  <td>France, Czech Republic, Finland, Sweden, UK</td>
                  <td>3-7</td>
                </tr>
                <tr>
                  <td>Spain, Italy, Ireland, Greece, Portugal</td>
                  <td>3-5</td>
                </tr>
                <tr>
                  <td>Switzerland, Norway, Slovakia, Slovenia, Estonia, Lithuania, Hungary, Bulgaria, Romania</td>
                  <td>3-5</td>
                </tr>
                <tr>
                  <td>North America</td>
                  <td>3-7</td>
                </tr>
                <tr>
                  <td>Middle East</td>
                  <td>3-9</td>
                </tr>
                <tr>
                  <td>Asia</td>
                  <td>3-6</td>
                </tr>
                <tr>
                  <td>Australia, New Zealand, Rest of the world</td>
                  <td>4-10</td>
                </tr>
              </tbody>
            </table>
            <br></br>
            <br></br>
            <p className="underline">Orders placed on our website are usually processed and shipped within 1-3 days. However, delays may occur during holidays. We are pleased to inform you that we also ship packages on weekends.</p>
            <br></br>
            <p>Upon placing your order, you will receive an order confirmation email. Once your order is packed you will receive a second email with tracking information.</p>
            <p>All orders are shipped from our Ukraine warehouse. We use a range of courier providers and aim to provide the fastest and most convenient shipping possible to each location. Our main carriers include FedEx, UPS, DHL and Nova Post.</p>
            <br />
            <p className="font-bold">INTERNATIONAL TAXES AND DUTIES</p>
            <br />
            <p>CITADEL CULT does not cover international duties, taxes or border charges from local authorities. These are not calculated at checkout. All countries have different rules regarding import duties and taxes so we strongly encourage you to check with your local authorities as to what you may be charged.</p>
            <p>Not all orders will face duties and taxes but it is important to check in order to avoid any surprises or delays on your order. After placing your order, if you decide not to pay your local duties and taxes and reject your parcel, we will only refund once the package is received back to our warehouse. Any return fees and handling charges will be deducted from your refunded amount.</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
