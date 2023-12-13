const links = [
    { text: 'Github', href: 'https://github.com/s-huh/pheno' },
    {
        text: 'Instagram',
        href: 'https://www.instagram.com/sung.visuals/?hl=en-gb',
    },
    {
        text: 'LinkedIn',
        href: 'https://uk.linkedin.com/in/sungho-huh-82679475',
    },
];

export default function About() {
    return (
        <div className="w-[700px] h-full text-white">
            <h1 className="font-medium">About Pheno</h1>
            <br />
            <p className="text-start text-white">
                Hi there 👋 Welcome to Pheno (🚧 Under Construction 🚧)
                <br />
                <br />
                <strong>Pheno</strong> is a sandbox environment for me to dip my
                toes into creative coding. Thanks to some incredible open-source
                projects (e.g. p5.js, Three.js) there&apos;s a lot of cool 2D/3D
                visuals which are possible in the browser. I&apos;m excited to
                explore what I can do with these.
                <br />
                <br />
                A bit about me - I&apos;m Sung, I&apos;m a front-end software
                engineer but I also create digital artwork on the odd occasion
                under the moniker @sung.visuals. These are mostly 3D models
                digitally sculpted on my iPad then rendered using Blender by
                playing around with the material and lighting.
                <br />
                <br />
                This makes for great visual aesthetics (eye of the beholder) but
                ultimately these are static images for the most part and
                I&apos;ve recently been thinking of ways to pivot towards
                something that is more interactive and incorporates the element
                of time. So it only felt natural to explore creative coding and
                combine my two worlds.
                <br />
                <br />I hope you enjoy and check out the links below if you want
                to delve deeper and follow along as I build out this website
            </p>
            <div className="mt-8 flex flex-col space-y-2">
                {links.map(({ text, href }, i) => (
                    <p key={`social-link-${i}`}>
                        <a href={href} target="_blank">
                            {text}
                        </a>
                    </p>
                ))}
            </div>
        </div>
    );
}
