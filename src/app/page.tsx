import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { QueEs } from "@/components/landing/QueEs";
import { ParaQue } from "@/components/landing/ParaQue";
import { Testimonios } from "@/components/landing/Testimonios";
import { Instagram } from "@/components/landing/Instagram";
import { AreasPastorales } from "@/components/landing/AreasPastorales";
import { Equipo } from "@/components/landing/Equipo";
import { Contacto } from "@/components/landing/Contacto";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QueEs />
        <ParaQue />
        <Testimonios />
        <Instagram />
        <AreasPastorales />
        <Equipo />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
