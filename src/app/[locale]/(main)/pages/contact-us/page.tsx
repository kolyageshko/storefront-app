import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Contact us - CITADEL CULT`,
        description: `Contact us - CITADEL CULT`,
    }
}

export default async function ContactPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-12">
            <div className="hidden md:block"></div>
            <div className="max-w-[550px]">
                <h1 className="uppercase mb-14 font-bold">Contact us</h1>
                <p>If you have any questions, please do not hesitate to contact CITADEL CULT Customer Service. All
                    enquiries will be answered within 1-3 working days.</p>
                <h2 className="uppercase mt-10 mb-4 font-bold">For Customer Support, Information about the Products, and
                    Other please contact us via the e-mail</h2>
                <p>support@citadelcult.com</p>
                <h2 className="uppercase mt-10 mb-4 font-bold">For Career, Press, and Collaboration inquiries please
                    contact via the e-mail</h2>
                <p>work@citadelcult.com</p>
            </div>
        </div>
    )
}
