

'use client';
export default function Sec({title, sectionClass}: {title: string, sectionClass: string}) {
    return (
        <section className={`home-sec h-screen flex items-center ${sectionClass}`}>
            <div className="container">
                <h2 className="hd-lg text-center">{title}</h2>
            </div>
        </section>
    )
}