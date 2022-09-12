import Seo from '@/components/Seo';


export default function Home() {
  return (
    <>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-white layout'>
            <h1>
              HI
            </h1>
          </div>
        </section>
      </main>
    </>
  );
}
