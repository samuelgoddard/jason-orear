import Link from 'next/link'

export default function Header() {
  return (
    <header className="">
      <Link href="/">
        <a className="fixed top-0 left-0 m-[20px] block w-[48px] md:w-[64px] hover:-rotate-45 transition ease-in-out duration-300 z-40">
          <svg className="block w-full" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32zm5.441-31.321v11.953H26.105V31.818L32 18.526h5.895L32.453 32.68h4.988z" fill="currentColor"/><path d="M60.633 0a3.368 3.368 0 110 6.737 3.368 3.368 0 010-6.737zm0 .674a2.695 2.695 0 100 5.39 2.695 2.695 0 000-5.39zm.168 1.01a1.179 1.179 0 01.613 2.186l.859 1.183h-.833l-.734-1.01h-.747v1.01h-.673V1.684H60.8zm0 .674h-.842v1.01h.842a.505.505 0 00.503-.456l.003-.049a.506.506 0 00-.506-.505z" fill="currentColor"/></svg>
        </a>
      </Link>

      <Link href="/wayfinder">
        <a className="fixed top-0 right-0 m-[20px] ml-auto hover:outline-none focus:outline-none block w-[48px] md:w-[64px] group py-3 z-40">
          <span className="origin-top-left transition ease-in-out duration-300 block w-full h-1 bg-black mb-3 group-hover:scale-x-75"></span>

          <span className="origin-top-left transition ease-in-out duration-300 block w-8/12 h-1 bg-black group-hover:scale-x-50"></span>
        </a>
      </Link>
    </header>
  )
}