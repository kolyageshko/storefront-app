import {Metadata} from "next"
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Stockist - CITADEL CULT`,
        description: `Stockist - CITADEL CULT`,
    }
}

export default async function ContactPage() {
    const stockists = [
        {
            id: 1,
            name: "К.О.С.Р.",
            address: "Kanatna 6, Odesa, Ukraine",
            website: "https://www.instagram.com/storage_of_things",
        },
        {
            id: 2,
            name: "Kharkiv store",
            address: "Плеханівська 126а, Харків, Ukraine",
            website: "https://www.instagram.com/kharkovstore",
        }
    ]

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="uppercase mb-6">Stockist ({stockists.length})</h1>
            <div className="grid grid-cols-1 gap-6">
                {stockists.map((stockist, index) => (
                    <div key={stockist.id} className="flex items-start gap-4">
                        <div className="text-muted-foreground">{index + 1}.</div>
                        <div className="overflow-hidden">
                            <div className="px-4">
                                <h3 className="uppercase font-semibold mb-2">{stockist.name}</h3>
                                <p className="text-muted-foreground mb-2">{stockist.address}</p>
                                <Link href={stockist.website} className="underline" prefetch={false}>
                                    {stockist.website}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
