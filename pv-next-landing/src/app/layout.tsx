import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pastoral Vocacional · Arquidiócesis de Quito",
  description:
    "La Pastoral Vocacional Arquidiocesana acompaña a niños, adolescentes y jóvenes de Quito en el discernimiento de la voluntad de Dios para sus vidas.",
  icons: { icon: "/brand/logotipo-negativo-cuadro.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${poppins.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
