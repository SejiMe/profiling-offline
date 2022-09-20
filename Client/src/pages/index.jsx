import Seo from '@/components/Seo';

import MainLayout from '@/components/layouts/MainLayout';


export default function Home() {
  
  
  return (
    <MainLayout>
      <Seo templateTitle='Home' />
      <main className='bg-dark'>
        <section className='flex flex-col justify-center items-center text-white min-h-screen layout'>
          <h1 className=" text-white hover:text-slate-400">Barangay Caramutan</h1>
          <p className="text-base ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus eaque incidunt pariatur ducimus iusto autem asperiores, dolores rem? Impedit porro dolorum molestias dolorem odit? Nobis aliquid repudiandae odit iste qui.</p>
        </section>
        <section className='flex flex-col justify-center items-center text-white min-h-screen layout'>
          <h1 className="text-white hover:text-slate-400">Organizational Chart</h1>
          <span>There will be a chart of images here</span>
          <p className="text-base  ">Irure amet labore aute ipsum anim quis incididunt nulla eiusmod amet magna. Deserunt adipisicing non cillum velit consectetur occaecat cillum ut tempor. Ipsum duis tempor duis ipsum sint labore ut ullamco nulla officia cillum. Fugiat nisi enim cupidatat quis irure esse ut Lorem proident dolor culpa nisi do ad.</p>
        </section>
      </main>
    </MainLayout>
  );
}
