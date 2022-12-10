import Seo from '@/components/Seo';
import MainLayout from '@/components/layouts/MainLayout';
import Services from '@/components/Online Services/Services';
import { Element } from 'react-scroll';
import Overview from '@/components/Overview/Overview';
import bg from '~/cover.jpg';
import logo from '~/images/caramutan-logo.png';
import {
  ParallaxBanner,
  ParallaxBannerLayer,
  useParallax,
} from 'react-scroll-parallax';
import { useRef } from 'react';

import Image from 'next/image';
import { useMedia } from 'react-use';
import CharterPublic from '@/components/charter/CharterPublic';

export default function Home() {
  const isXSmall = useMedia('(max-width: 400px)');
  const isSmall = useMedia('(max-width: 580px)');
  const isMedium = useMedia('(max-width: 920px)');

  const parallax = useParallax({
    speed: 100,
    translateY: [-20, 20],
  });
  const targetParallax = useRef(null);
  return (
    <MainLayout>
      <Seo templateTitle='Home' />
      <main className='bg-white flex flex-col justify-center'>
        <Element name='home'>
          <section className=' text-white sm:w-screen sm:h-screen md:h-full md:w-full lg:h-full lg:w-full'>
            <div className='blur-[2.5px] '>
              <Image src={bg} layout='responsive' />
            </div>

            <div
              ref={parallax.ref}
              className='absolute top-[25%] right-[30%] sm:top-[30%] sm:right-[30%] md:top-[35%] md:right-[35%] lg:right-[40%] lg:top-[60%]'
            >
              <Image
                src={logo}
                width={`${
                  isXSmall
                    ? '130px'
                    : isSmall
                    ? '180px'
                    : isMedium
                    ? '250px '
                    : '400px'
                }`}
                height={`${
                  isXSmall
                    ? '130px'
                    : isSmall
                    ? '180px'
                    : isMedium
                    ? '250px '
                    : '400px'
                }`}
              />
            </div>
          </section>
        </Element>

        <Element name='services'>
          <section className='flex flex-col justify-center items-center py-4  px-3 text-white h-full bg-slightG-500 '>
            <Services />
          </section>
        </Element>

        <section className='flex flex-col justify-center items-center py-4  px-3 text-black h-full w-full'>
          <Overview />
        </section>
        <section className='flex flex-col justify-center items-center text-black h-full w-full '>
          <CharterPublic />
        </section>
      </main>
    </MainLayout>
  );
}
