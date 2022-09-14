import Seo from '@/components/Seo';
import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import Nav from '@/components/Nav';

export default function Home() {
  return (
    <>
      <Seo templateTitle='Home' />

      <main>
        <Nav/>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-white layout'>
            <h1>
              <CustomLink href='https://github.com/zyndly'>
                Zyndly Kent's Github
              </CustomLink>
            </h1>
            <footer className='absolute text-gray-500 bottom-2'>
              © {new Date().getFullYear()} By{' '}
              <UnstyledLink href='https://github.com/zyndly'>
                Zyndly
              </UnstyledLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
