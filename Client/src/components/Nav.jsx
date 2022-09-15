import Link from 'next/link';


const links = [
  { href: '/services', label: 'Online Services' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/login', label: 'Login' },
];

export default function Nav() {

 


  return (
    <nav className='bg-gray-700'>
      <ul className='flex items-center justify-between px-8 py-4'>
        <li>
          <Link href='/'>
            <a className='font-bold text-green-400'><img src='/images/Logo Caramutan.png' className='w-[40%]' alt="" /></a>
          </Link>
        </li>
        <ul className='flex items-center justify-between space-x-4'>
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link href={href}>
                <a className='text-white hover:text-green-400'>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
