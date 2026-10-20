import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Conocenos } from "@/components/landing/Conocenos";
import { Programa } from "@/components/landing/Programa";
import { Metodo } from "@/components/landing/Metodo";
import { Testimonios } from "@/components/landing/Testimonios";
import { Galeria } from "@/components/landing/Galeria";
import { Equipo } from "@/components/landing/Equipo";
import { Contacto } from "@/components/landing/Contacto";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Conocenos />
        <Programa />
        <Metodo />
        <Testimonios />
        <Galeria />
        <Equipo />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
